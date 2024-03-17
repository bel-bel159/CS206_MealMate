package com.example.mealmateBackend.dto;

import com.example.mealmateBackend.model.Order;

public class StatusUpdateRequest {
    private Order.OrderStatus orderStatus;

    public Order.OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Order.OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
}
