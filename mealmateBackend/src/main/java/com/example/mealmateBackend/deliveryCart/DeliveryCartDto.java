package com.example.mealmateBackend.deliveryCart;

import java.util.List;
public class DeliveryCartDto {
    private Long ordererId;
    private List<Long> orderItemsId;
    private Float totalPrice; // Use the Float object to allow null values

    // Constructors
    public DeliveryCartDto(){}

    public DeliveryCartDto(Long ordererId, List<Long> orderItemsId, Float totalPrice) {
        this.ordererId = ordererId;
        this.orderItemsId = orderItemsId;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public Long getOrdererId() {
        return ordererId;
    }

    public void setOrdererId(Long ordererId) {
        this.ordererId = ordererId;
    }

    public List<Long> getOrderItemsId() {
        return orderItemsId;
    }

    public void setOrderItemsId(List<Long> orderItemsId) {
        this.orderItemsId = orderItemsId;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }
}