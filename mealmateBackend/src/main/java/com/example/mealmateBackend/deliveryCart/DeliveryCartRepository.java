package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryCartRepository extends JpaRepository<DeliveryCart, Long> {
    // Custom query methods defined here
    Optional<DeliveryCart> findByDeliveryCartId(Long deliveryCartId);
    Optional<DeliveryCart> findByOrdererId(String ordererId);
}