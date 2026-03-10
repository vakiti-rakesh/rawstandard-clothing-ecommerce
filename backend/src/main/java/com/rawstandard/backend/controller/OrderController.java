package com.rawstandard.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rawstandard.backend.dto.CheckoutRequest;
import com.rawstandard.backend.dto.CheckoutResponse;
import com.rawstandard.backend.entity.Order;
import com.rawstandard.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public CheckoutResponse checkout(@RequestBody CheckoutRequest request) {
        Order order = orderService.checkout(request);
        return new CheckoutResponse(true, "Checkout success", order.getId());
    }
}