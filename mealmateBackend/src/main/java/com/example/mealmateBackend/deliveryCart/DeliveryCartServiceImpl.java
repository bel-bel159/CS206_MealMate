package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;
import com.example.mealmateBackend.model.OrderItem;
import com.example.mealmateBackend.orderItem.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public DeliveryCart updateDeliveryCart(Long deliveryCartId, Long orderId) throws DeliveryCartNotFoundException {
        DeliveryCart deliveryCart = findDeliveryCartById(deliveryCartId);
        OrderItem orderItem = orderItemService.findItemById(orderId);

        List<Long> itemList = deliveryCart.getOrderItemsId();
        itemList.add(orderId);

        float totalPrice = deliveryCart.getTotalPrice() + orderItem.getItemPrice();
//        float totalPrice = deliveryCart.getTotalPrice() + 1;
        deliveryCart.setTotalPrice(totalPrice);


        return deliveryCart;
    }

    @Override
    public DeliveryCart findDeliveryCartById(Long deliveryCartId) throws DeliveryCartNotFoundException {
        return deliveryCartRepository.findById(deliveryCartId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with id " + deliveryCartId + " not found."));
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