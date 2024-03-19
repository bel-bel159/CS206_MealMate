package com.example.mealmateBackend.order;

import com.example.mealmateBackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>{

    //List<Order> findByOrdererIdOrderByOrderIdDesc(String ordererId);

    List<Order> findByOrdererId(String ordererId);

    Order findByOrderId(Long orderId);


}
