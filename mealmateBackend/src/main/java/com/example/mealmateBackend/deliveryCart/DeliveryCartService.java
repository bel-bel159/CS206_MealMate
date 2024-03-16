package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public interface DeliveryCartService {
    DeliveryCart createDeliverCart(DeliveryCart deliveryCart);
    DeliveryCart updateDeliveryCart(Long cartId, Long orderId);
    DeliveryCart findDeliveryCartById(Long deliveryCartId);
    void deleteDeliveryCartById(Long deliveryCartId);
    List<DeliveryCart> findAllDeliveryCarts();
}