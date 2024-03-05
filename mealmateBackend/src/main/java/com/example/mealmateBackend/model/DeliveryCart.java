package com.example.mealmateBackend.model;

import lombok.Data;

import javax.persistence.*;

import java.util.List;

@Entity
@Data
@Table(name = "DeliveryCart")
public class DeliveryCart {
    @Id
    private Long deliveryCartId;

    @Column(nullable = false)
    private Long ordererId;

    @Column(nullable = true)
    private List<Long> orderItemsId;

    @Column(nullable = true)
    private float totalPrice;

    @Column(nullable = true)
    private String location;

    public DeliveryCart() {
    }

    public DeliveryCart(Long deliveryCartId, Long ordererId, List<Long> orderItemsId, float totalPrice, String location) {
        this.deliveryCartId = deliveryCartId;
        this.ordererId = ordererId;
        this.orderItemsId = orderItemsId;
        this.totalPrice = totalPrice;
        this.location = location;
    }



}
