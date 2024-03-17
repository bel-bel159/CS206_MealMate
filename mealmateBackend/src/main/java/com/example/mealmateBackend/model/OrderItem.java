package com.example.mealmateBackend.model;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "OrderItems")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private String itemDescription;

    @Column(nullable = false)
    private float itemPrice;

    @Column(nullable = false)
    private int itemQuantity;

    public OrderItem() {
    }

    public OrderItem(String itemName, String itemDescription, float itemPrice, int itemQuantity) {
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
    }

//    @OneToMany(mappedBy = "Order", cascade = CascadeType.ALL)
//    private Set<OrderItem> orderItems;
}
