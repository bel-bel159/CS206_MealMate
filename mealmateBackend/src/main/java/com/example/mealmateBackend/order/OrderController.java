package com.example.mealmateBackend.order;

import com.example.mealmateBackend.dto.DelivererUpdateRequest;
import com.example.mealmateBackend.dto.StatusUpdateRequest;
import com.example.mealmateBackend.model.Order;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try{
            Order createdOrder = orderService.createOrder(order);
            return ResponseEntity.ok(createdOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/orderer/{ordererId}")
    public ResponseEntity<?> getOrdersByOrdererId(@PathVariable String ordererId){
        try{
            List<Order> orders = orderService.getOrdersByOrdererId(ordererId);
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/update/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody StatusUpdateRequest statusUpdate){
        try {
            orderService.updateOrderStatus(orderId, statusUpdate.getOrderStatus());
            return ResponseEntity.ok("Order status updated.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid order status.");
        }
    }

    @PatchMapping("/update/{orderId}/deliverer")
    public ResponseEntity<?> updateDelivererId(@PathVariable Long orderId, @RequestBody DelivererUpdateRequest delivererUpdateRequest){
        try {
            orderService.updateDelivererId(orderId, delivererUpdateRequest.getDelivererId());
            return ResponseEntity.ok("Deliverer updated.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid deliverer id.");
        }
    }

    @GetMapping("/pendingorders")
    public ResponseEntity<?> getPendingOrders(){
        try{
            List<Order> orders = orderService.findPendingOrders();
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
