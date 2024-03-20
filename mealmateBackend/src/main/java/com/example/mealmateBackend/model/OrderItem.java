package com.example.mealmateBackend.model;

import java.util.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@Table(name = "OrderItems")
public class OrderItem {
    @Id
    private Long itemId; // Removed @GeneratedValue annotation

    @NotBlank(message = "Item name is required")
    private String itemName;

    @NotBlank(message = "Item description is required")
    private String itemDescription;

    @NotNull(message = "Item price is required")
    @Min(value = 0, message = "Item price must be a positive number")
    private Float itemPrice;

    @NotNull(message = "Item quantity is required")
    @Min(value = 1, message = "Item quantity must be at least 1")
    private Integer itemQuantity;

    public OrderItem() {
    }

    public OrderItem(Long itemId, String itemName, String itemDescription, float itemPrice, int itemQuantity) {
        this.itemId = itemId; // Ensure itemId is passed in the constructor
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemQuantity = itemQuantity;
    }

//    @OneToMany(mappedBy = "Order", cascade = CascadeType.ALL)
//    private Set<OrderItem> orderItems;
}
