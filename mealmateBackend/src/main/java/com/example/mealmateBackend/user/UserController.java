package com.example.mealmateBackend.user;
import com.example.mealmateBackend.model.User;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/users") // Base path for all endpoints in this controller
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {
            // Before saving, you might want to manually encode the password or handle other pre-save logic.
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (UserEmailExistException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.findUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody User userUpdates) {
        try {
            User updatedUser = userService.updateUser(email, userUpdates);
            return ResponseEntity.ok(updatedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUserByEmail(@PathVariable String email) {
        try {
            userService.deleteUserByEmail(email);
            return ResponseEntity.ok().body("User with email " + email + " deleted successfully.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + loginDto.getEmail()));

        boolean isPasswordMatch = passwordEncoder.matches(loginDto.getPassword(), user.getPassword());
        if (!isPasswordMatch) {
            throw new BadCredentialsException("Invalid email/password supplied");
        }
        
        // Here you would handle login success, like creating a JWT token or a session
        // For simplicity, let's just return the user info (without password)
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
    //     String email = credentials.get("email");
    //     String password = credentials.get("password");

    //     // You may want to add null checks and respond with bad request if email or password are missing
    //     if (email == null || password == null) {
    //         return ResponseEntity.badRequest().body("Email and password must be provided.");
    //     }

    //     User user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));

    //     boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());
    //     if (!isPasswordMatch) {
    //         throw new BadCredentialsException("Invalid email/password supplied");
    //     }
        
    //     // Here you would handle login success, like creating a JWT token or a session
    //     // For simplicity, let's just return the user info (without password)
    //     user.setPassword(null);
    //     return ResponseEntity.ok(user);
    // }


}