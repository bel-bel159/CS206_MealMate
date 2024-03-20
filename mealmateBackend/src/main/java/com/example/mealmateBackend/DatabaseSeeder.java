package com.example.mealmateBackend;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.mealmateBackend.model.OrderItem;
import com.example.mealmateBackend.orderItem.OrderItemRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public DatabaseSeeder(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        OrderItem[] soupBases = new OrderItem[]{
            new OrderItem(1L, "Tomato Soup Base", "A rich and tangy tomato base.", 5.99f, 10),
            new OrderItem(2L, "Mala Soup Base", "Spicy and numbing Sichuanese soup base.", 6.99f, 10),
            new OrderItem(3L, "Mushroom Soup Base", "Creamy mushroom soup base.", 4.99f, 10),
            new OrderItem(4L, "TomYum Soup Base", "Hot and sour Thai soup base.", 7.99f, 10)
        };

        // Clear any existing data
        orderItemRepository.deleteAll();

        // Save the new set of soup bases
        orderItemRepository.saveAll(Arrays.asList(soupBases));
    }
}


