package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliverCart;
import com.example.mealmateBackend.model.OrderItem;
import com.example.mealmateBackend.orderItem.OrderItemService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@Transactional
public class DeliveryCartServiceImpl implements DeliveryCartService {

    private final DeliveryCartRepository deliveryCartRepository;
    private final OrderItemService orderItemService;

    @Autowired
    public DeliveryCartServiceImpl(DeliveryCartRepository deliveryCartRepository) {
        this.deliveryCartRepository = deliveryCartRepository;
        this.orderItemService = orderItemService;
    }

    @Override
    public DeliverCart createDeliveryCart(DeliverCart deliveryCart) {
        return deliveryCartRepository.save(deliveryCart);
    }

    @Override
    @Transactional
    public DeliverCart updateDeliveryCart(Long deliveryCartId, Long orderId) throws DeliveryCartNotFoundException {
        DeliverCart deliveryCart = findDeliveryCartById(deliveryCartId);
        OrderItem orderItem = orderItemService.findItemById(orderId);

        List<Long> itemList = deliveryCart.getOrderItemsId();
        itemList.add(orderId);

        double totalPrice = deliveryCart.getTotalPrice() + orderItem.getItemPrice();
        deliveryCart.setTotalPrice(totalPrice);

        return deliveryCart;
    }

    @Override
    public DeliverCart findDeliveryCartById(Long deliveryCartId) throws DeliveryCartNotFoundException {
        return deliveryCartRepository.findById(deliveryCartId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with id " + deliveryCartId + " not found."));
    }

    @Override
    public void deleteDeliveryCartById(Long deliveryCartId) {
        DeliverCart deliveryCart = deliveryCartRepository.findById(deliveryCartId)
                .orElseThrow(() -> new DeliveryCartNotFoundException("DeliveryCart with id " + deliveryCartId + " not found."));
        deliveryCartRepository.delete(deliveryCart);
    }

    @Override
    public List<DeliverCart> findAllDeliveryCarts() {
        return deliveryCartRepository.findAll();
    }

}