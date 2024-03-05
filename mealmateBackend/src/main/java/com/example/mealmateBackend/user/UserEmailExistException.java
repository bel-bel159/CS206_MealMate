package com.example.mealmateBackend.user;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserEmailExistException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;
    public UserEmailExistException(String Email) {

        super("Email Already In Use! " + Email);
    }

}


