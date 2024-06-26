package com.example.mealmateBackend.model;

import lombok.Data;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Data
@Table(name = "DeliveryCart")
public class DeliveryCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryCartId;

    @Column(nullable = false)
    private String ordererId;

    @ElementCollection
    private List<Long> orderItemsId;

    @Column(nullable = true)
    private float totalPrice;

    public DeliveryCart() {
    }

    public DeliveryCart(Long deliveryCartId, String ordererId, List<Long> orderItemsId, float totalPrice) {
        this.deliveryCartId = deliveryCartId;
        this.ordererId = ordererId;
        this.orderItemsId = orderItemsId;
        this.totalPrice = totalPrice;
    }



}
