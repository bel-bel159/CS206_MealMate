package com.example.mealmateBackend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Example method to add a new user
    public User addUser(User user) {
        return userRepository.save(user);
    }
    
    // Additional service methods as needed
}