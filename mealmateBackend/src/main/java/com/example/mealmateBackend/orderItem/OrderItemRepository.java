package com.example.mealmateBackend.orderItem;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mealmateBackend.model.OrderItem;

import java.util.Optional;


public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

    Boolean existsByItemId(Long itemId);
    OrderItem findByItemId(Long itemId);
}
