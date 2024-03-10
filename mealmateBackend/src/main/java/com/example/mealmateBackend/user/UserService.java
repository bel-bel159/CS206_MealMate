package com.example.mealmateBackend.user;

import com.example.mealmateBackend.model.User;

import java.util.List;
import org.springframework.stereotype.Service;

@Service

public interface UserService {

    User createUser(User user);
    User updateUser(String email, User userUpdates) throws UserNotFoundException;
    User findUserByEmail(String email) throws UserNotFoundException;
    void deleteUserByEmail(String email);
    List<User> findAllUsers();

}