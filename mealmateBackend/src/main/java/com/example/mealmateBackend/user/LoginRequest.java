package com.example.mealmateBackend.user;

public class LoginRequest {

    private String email;
    private String password;

    // Default constructor
    public LoginRequest() {
        // No-args constructor needed by frameworks like Hibernate
    }

    // Parameterized constructor
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for password
    public String getPassword() {
        return password;
    }

    // Setter for password
    public void setPassword(String password) {
        this.password = password;
    }
}
