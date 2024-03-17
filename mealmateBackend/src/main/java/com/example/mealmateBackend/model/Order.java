package com.example.mealmateBackend.model;

import lombok.Data;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "Orders")
public class Order {
    public enum OrderStatus {ORDER_SENT, PREPARING, COLLECTED, DELIVERED}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private String ordererId;

    @Column(nullable = true)
    private String delivererId;

    @Column(nullable = false)
    @ElementCollection
    private List<Long> orderItemsId;

    @Column(nullable = true)
    private String location;

    @Column(nullable = false)
    private float totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private OrderStatus status;

    public Order() {
    }

    public Order(String ordererId, String delivererId, List<Long> orderItemsId, String location, float totalPrice, OrderStatus status) {
        this.ordererId = ordererId;
        this.delivererId = delivererId;
        this.orderItemsId = orderItemsId;
        this.location = location;
        this.totalPrice = totalPrice;
        this.status = status;
    }

}


