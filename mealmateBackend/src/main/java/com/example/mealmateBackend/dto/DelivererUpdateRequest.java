package com.example.mealmateBackend.dto;

import com.example.mealmateBackend.model.Order;

public class DelivererUpdateRequest {
    private String delivererId;

    // Constructors
    public DelivererUpdateRequest() {}

    // Getters and Setters
    public String getDelivererId() {
        return delivererId;
    }

    public void setDelivererId(String  delivererId) {
        this.delivererId = delivererId;
    }
}
