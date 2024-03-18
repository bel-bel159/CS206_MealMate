package com.example.mealmateBackend.order;

import com.example.mealmateBackend.model.Order;

import java.util.*;

public interface OrderService {
    // create order
    Order createOrder(Order order);
    // get order by orderer id
    List<Order> getOrdersByOrdererId(String ordererId);
    // update order status
    void updateOrderStatus(Long orderId, Order.OrderStatus status);
    void updateDelivererId(Long orderId, String delivererId);

    Order getOrderById(Long orderId);


}