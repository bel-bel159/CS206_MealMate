package com.example.mealmateBackend.order;
import com.example.mealmateBackend.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }
    @Override
    public Order createOrder(Order order){
        if(order.getOrderItemsId() == null || order.getOrderItemsId().isEmpty()){
            throw new IllegalArgumentException("Order must have at least one item");
        }
        if (order.getStatus() == null){
            order.setStatus(Order.OrderStatus.ORDER_SENT);
        }
        return orderRepository.save(order);

    }
    @Override
    public List<Order> getOrdersByOrdererId(String ordererId) {
        List<Order> orders = orderRepository.findByOrdererId(ordererId);
        if(orders.isEmpty()){
            throw new IllegalArgumentException("No order found for ordererId: " + ordererId);
        }
        return orders;
    }
    @Override
    public void updateOrderStatus(Long orderId, Order.OrderStatus status){
        Order order = orderRepository.findByOrderId(orderId);
        if(order == null){
            throw new IllegalArgumentException("No order found for orderId: " + orderId);
        }
        order.setStatus(status);
        orderRepository.save(order);
    }
    @Override
    public Order getOrderById(Long orderId){
        try{
            return orderRepository.findByOrderId(orderId);
        } catch (Exception e){
            throw new IllegalArgumentException("No order found for orderId: " + orderId);
        }
    }
    @Override
    public void updateDelivererId(Long orderId, String delivererId){
        Order order = orderRepository.findByOrderId(orderId);
        order.setDelivererId(delivererId);
        orderRepository.save(order);
    }

    @Override
    public List<Order> findPendingOrders() {
        List<Order> orders = orderRepository.findAll();
        List<Order> pendingOrders = new ArrayList<>();
        for(Order order: orders){
            if(order.getStatus() == Order.OrderStatus.ORDER_SENT){
                pendingOrders.add(order);
            }
        }
        return pendingOrders;
    }


}
