package com.example.mealmateBackend.user;

import com.example.mealmateBackend.model.User;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User user) {
        // Check if user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserEmailExistException("User with email " + user.getEmail() + " already exists.");
        }
        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    @Transactional
    //only can update name and password
    public User updateUser(String email, User userUpdates) throws UserNotFoundException {
        User user = findUserByEmail(email);
        user.setName(userUpdates.getName());
        user.setPassword(userUpdates.getPassword());
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws UserNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found."));
    }
    
    @Override
    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found."));
        userRepository.delete(user);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
