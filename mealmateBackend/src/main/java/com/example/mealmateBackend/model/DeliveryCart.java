package com.example.mealmateBackend.model;

import lombok.Data;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Data
@Table(name = "DeliveryCart")
public class DeliveryCart {
    @Id
    private Long deliveryCartId;

    @Column(nullable = false)
    private Long ordererId;

    @ElementCollection
    private List<Long> orderItemsId;

    @Column(nullable = true)
    private float totalPrice;

    public DeliveryCart() {
    }

    public DeliveryCart(Long deliveryCartId, Long ordererId, List<Long> orderItemsId, float totalPrice) {
        this.deliveryCartId = deliveryCartId;
        this.ordererId = ordererId;
        this.orderItemsId = orderItemsId;
        this.totalPrice = totalPrice;
    }



}
