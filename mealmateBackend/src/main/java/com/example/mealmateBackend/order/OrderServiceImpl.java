package com.example.mealmateBackend.order;
import com.example.mealmateBackend.model.Order;
import com.example.mealmateBackend.model.OrderItem;
import com.example.mealmateBackend.orderItem.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;



    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderItemService orderItemService){
        this.orderRepository = orderRepository;
        this.orderItemService = orderItemService;
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

    @Override
    public String getLocation(Long orderId){
        Order order = orderRepository.findByOrderId(orderId);
        return order.getLocation();
    }

    @Override
    public List<Map<String, Object>> getItemNamesWithQuantities(List<Long> itemIds){
        List<Map<String, Object>> itemDetailsList = new ArrayList<>();
        Map<Long, Integer> itemCountMap = new HashMap<>();

        // Count the occurrences of each itemId
        for (Long itemId : itemIds) {
            itemCountMap.put(itemId, itemCountMap.getOrDefault(itemId, 0) + 1);
        }

        // Retrieve item names and create objects containing name and quantity
        for (Long itemId : itemCountMap.keySet()) {
            String itemName = orderItemService.getItemName(itemId);
            int quantity = itemCountMap.get(itemId);
            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("itemName", itemName);
            itemDetails.put("quantity", quantity);
            itemDetailsList.add(itemDetails);
        }

        return itemDetailsList;
    }


}
