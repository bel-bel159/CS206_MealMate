package com.example.mealmateBackend.orderItem;

import com.example.mealmateBackend.model.OrderItem;

public class OrderItemMapper {
    
    public static OrderItemDto toDto(OrderItem orderItem) {
        if (orderItem == null) {
            return null;
        }

        return new OrderItemDto(
            orderItem.getItemId(),
            orderItem.getItemName(),
            orderItem.getItemDescription(),
            orderItem.getItemPrice(),
            orderItem.getItemQuantity()
        );
    }

    public static OrderItem toEntity(OrderItemDto orderItemDto) {
        if (orderItemDto == null) {
            return null;
        }

        OrderItem orderItem = new OrderItem();
        orderItem.setItemId(orderItemDto.getItemId());
        orderItem.setItemName(orderItemDto.getItemName());
        orderItem.setItemDescription(orderItemDto.getItemDescription());
        orderItem.setItemPrice(orderItemDto.getItemPrice());
        orderItem.setItemQuantity(orderItemDto.getItemQuantity());
        return orderItem;
        
    }
}
