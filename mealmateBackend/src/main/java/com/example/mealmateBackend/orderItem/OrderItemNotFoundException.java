package com.example.mealmateBackend.orderItem;

import java.io.Serial;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OrderItemNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public OrderItemNotFoundException(Long itemId) {
        super("Could not find Order Item with ID: " + itemId);
    }
    
}
