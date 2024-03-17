package com.example.mealmateBackend.deliveryCart;

import java.io.Serial;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DeliveryCartNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public DeliveryCartNotFoundException(String deliveryCartId) {
        super("Could not find Delivery Cart with ID: " + deliveryCartId);
    }

}