package com.example.mealmateBackend.deliveryCart;

import com.example.mealmateBackend.model.DeliveryCart;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/deliveryCarts") // Base path for all endpoints in this controller
public class DeliveryCartController {
{

    private final DeliveryCartService deliveryCartService;

    @Autowired
    public DeliveryCartController(DeliveryCartService deliveryCartService) {
        this.deliveryCartService = deliveryCartService;
    }

    @PostMapping
    public ResponseEntity<?> createDeliveryCart(@Valid @RequestBody DeliveryCart deliveryCart) {
        DeliveryCart createdDeliveryCart = deliveryCartService.createDeliverCart(deliveryCart);
        return ResponseEntity.ok(createdDeliveryCart);
    }

    @GetMapping("/{deliveryCartId}")
    public ResponseEntity<?> getDeliveryCartById(@PathVariable Long deliveryCartId) {
        try {
            DeliveryCart deliveryCart = deliveryCartService.findDeliveryCartById(deliveryCartId);
            return ResponseEntity.ok(deliveryCart);
        } catch (DeliveryCartNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{deliveryCartId}")
    public ResponseEntity<?> updateDeliveryCart(@PathVariable Long deliveryCartId, @RequestBody Long orderId) {
        try {
            DeliveryCart updatedDeliveryCart = deliveryCartService.updateDeliveryCart(deliveryCartId, orderId);
            return ResponseEntity.ok(updatedDeliveryCart);
        } catch (DeliveryCartNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (OrderItemNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{deliveryCartId}")
    public ResponseEntity<?> deleteDeliveryCartById(@PathVariable Long deliveryCartId) {
        try {
            deliveryCartService.deleteDeliveryCartById(deliveryCartId);
            return ResponseEntity.ok().build();
        } catch (DeliveryCartNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDeliveryCarts() {
        List<DeliveryCart> deliveryCarts = deliveryCartService.findAllDeliveryCarts();
        return ResponseEntity.ok(deliveryCarts);
    }
}