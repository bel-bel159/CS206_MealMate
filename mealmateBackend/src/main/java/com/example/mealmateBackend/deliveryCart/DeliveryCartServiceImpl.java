package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;
import com.example.mealmateBackend.model.OrderItem;
import com.example.mealmateBackend.orderItem.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class DeliveryCartServiceImpl implements DeliveryCartService {

    private final DeliveryCartRepository deliveryCartRepository;
    private final OrderItemService orderItemService;

    @Autowired
    public DeliveryCartServiceImpl(DeliveryCartRepository deliveryCartRepository, OrderItemService orderItemService) {
        this.deliveryCartRepository = deliveryCartRepository;
        this.orderItemService = orderItemService;
    }

    @Override
    public DeliveryCart createDeliveryCart(DeliveryCart deliveryCart) {
        return deliveryCartRepository.save(deliveryCart);
    }

    @Override
    @Transactional
    public DeliveryCart updateDeliveryCartByOrdererId(String ordererId, List<Long> orderIdList) throws DeliveryCartNotFoundException {
        DeliveryCart deliveryCart = findDeliveryCartByOrdererId(ordererId);
        if(orderIdList == null || orderIdList.isEmpty()) {
            List<Long> itemList = new ArrayList<>();
            deliveryCart.setOrderItemsId(itemList);
            deliveryCart.setTotalPrice(0);
        }else {
            Long orderId = orderIdList.get(0);
            OrderItem orderItem = orderItemService.findItemById(orderId);

            List<Long> itemList = deliveryCart.getOrderItemsId();
            itemList.add(orderId);

            float totalPrice = deliveryCart.getTotalPrice() + orderItem.getItemPrice();
//        float totalPrice = deliveryCart.getTotalPrice() + 1;
            deliveryCart.setTotalPrice(totalPrice);
        }
        return deliveryCart;
    }

    @Override
    public DeliveryCart findDeliveryCartById(Long deliveryCartId) throws DeliveryCartNotFoundException {
        return deliveryCartRepository.findById(deliveryCartId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with id " + deliveryCartId + " not found."));
    }

    @Override
    public DeliveryCart findDeliveryCartByOrdererId(String ordererId) throws DeliveryCartNotFoundException {
        return deliveryCartRepository.findByOrdererId(ordererId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with orderer id " + ordererId + " not found."));
    }

    @Override
    public HashMap<Long, Integer> findCollatedItemListByOrdererId(String ordererId) throws DeliveryCartNotFoundException {
        DeliveryCart cart = findDeliveryCartByOrdererId(ordererId);
        List<Long> itemList = cart.getOrderItemsId();
        HashMap<Long, Integer> collatedItemList = new HashMap<>();
        for (Long itemId : itemList) {
            if (collatedItemList.containsKey(itemId)) {
                collatedItemList.put(itemId, collatedItemList.get(itemId) + 1);
            } else {
                collatedItemList.put(itemId, 1);
            }
        }
        return collatedItemList;
    }

    @Override
    public void deleteDeliveryCartById(Long deliveryCartId) {
        DeliveryCart deliveryCart = deliveryCartRepository.findById(deliveryCartId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with id " + deliveryCartId + " not found."));
        deliveryCartRepository.delete(deliveryCart);
    }

    @Override
    public List<DeliveryCart> findAllDeliveryCarts() {
        return deliveryCartRepository.findAll();
    }

}