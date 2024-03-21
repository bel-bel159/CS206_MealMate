package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public interface DeliveryCartService {
    DeliveryCart createDeliveryCart(DeliveryCart deliveryCart);
    DeliveryCart updateDeliveryCartByOrdererId(String ordererId, List<Long> orderId);
    DeliveryCart emptyDeliveryCartByOrdererId(String ordererId);
    DeliveryCart findDeliveryCartById(Long deliveryCartId);
    DeliveryCart findDeliveryCartByOrdererId(String ordererId);
    HashMap<Long, Integer> findCollatedItemListByOrdererId(String ordererId);
    void deleteDeliveryCartById(Long deliveryCartId);
    List<DeliveryCart> findAllDeliveryCarts();
}