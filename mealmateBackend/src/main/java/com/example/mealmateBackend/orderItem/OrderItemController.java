package com.example.mealmateBackend.orderItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mealmateBackend.model.OrderItem;

import jakarta.annotation.security.PermitAll;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;


@RestController
@RequestMapping("/orderItem")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public ResponseEntity<OrderItem> createItem(@RequestBody OrderItem item) {
        OrderItem createdItem = orderItemService.createItem(item);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<OrderItem> updateItem(@PathVariable Long itemId, @RequestBody OrderItem item) {
        OrderItem updatedItem = orderItemService.updateItem(itemId, item.getItemName(), item.getItemDescription(), item.getItemPrice(), item.getItemQuantity());
        return ResponseEntity.ok(updatedItem);
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<OrderItem> findItemById(@PathVariable Long itemId) {
        OrderItem item = orderItemService.findItemById(itemId);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItemById(@PathVariable Long itemId) {
        orderItemService.deleteItemById(itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<OrderItem>> findAllItems() {
        List<OrderItem> items = orderItemService.findAllItems();
        return ResponseEntity.ok(items);
    }
    

}
