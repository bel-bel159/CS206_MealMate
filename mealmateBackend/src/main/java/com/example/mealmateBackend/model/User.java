package com.example.mealmateBackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    private String email;
    private String name;
    private String password;
    private int age;

    // Constructors, getters, and setters

}
