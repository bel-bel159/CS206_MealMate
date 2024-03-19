package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public interface DeliveryCartService {
    DeliveryCart createDeliveryCart(DeliveryCart deliveryCart);
    DeliveryCart updateDeliveryCart(Long cartId, Long orderId);
    DeliveryCart findDeliveryCartById(Long deliveryCartId);
    DeliveryCart findDeliveryCartByOrdererId(Long ordererId);
    HashMap<Long, Integer> findCollatedItemListByOrdererId(Long ordererId);
    void deleteDeliveryCartById(Long deliveryCartId);
    List<DeliveryCart> findAllDeliveryCarts();
}