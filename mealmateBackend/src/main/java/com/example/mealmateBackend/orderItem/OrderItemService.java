package com.example.mealmateBackend.orderItem;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.mealmateBackend.model.OrderItem;

@Service
public interface OrderItemService {
    
    OrderItem createItem(OrderItem item);
    OrderItem updateItem(Long itemId, String itemName, String itemDescription, float itemPrice, int itemQuantity);
    OrderItem findItemById(Long itemId);
    void deleteItemById(Long itemId);
    List<OrderItem> findAllItems();
}
