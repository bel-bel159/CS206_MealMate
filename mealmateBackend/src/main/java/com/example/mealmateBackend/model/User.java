package com.example.mealmateBackend.model;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    private String email;
    private String name;
    private String password;
    private int age;

    // Constructors, getters, and setters

}
