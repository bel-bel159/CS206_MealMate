package com.example.mealmateBackend.orderItem;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mealmateBackend.model.OrderItem;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem createItem(OrderItem item) {
        return orderItemRepository.save(item);
    }

    @Override
    public OrderItem updateItem(Long itemId, String itemName, String itemDescription, float itemPrice, int itemQuantity) {
        OrderItem item = orderItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id: " + itemId));
        item.setItemName(itemName);
        item.setItemDescription(itemDescription);
        item.setItemPrice(itemPrice);
        item.setItemQuantity(itemQuantity);
        return orderItemRepository.save(item);
    }

    @Override
    public OrderItem findItemById(Long itemId) {
        return orderItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found with id: " + itemId));
    }

    @Override
    public void deleteItemById(Long itemId) {
        if (!orderItemRepository.existsById(itemId)) {
            throw new RuntimeException("OrderItem not found with id: " + itemId);
        }
        orderItemRepository.deleteById(itemId);
    }

    @Override
    public List<OrderItem> findAllItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public String getItemName(Long itemId){
        try{
            OrderItem item = orderItemRepository.findByItemId(itemId);
            return item.getItemName();

        } catch(Exception e){
            throw new IllegalArgumentException("No item found for itemId: " + itemId);
        }


    }
}
