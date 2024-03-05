package com.example.mealmateBackend.user;

import com.example.mealmateBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {
    // Custom query methods defined here
    Optional<User> findByEmail(String email);


}