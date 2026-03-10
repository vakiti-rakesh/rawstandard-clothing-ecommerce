package com.rawstandard.backend.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rawstandard.backend.dto.CheckoutItemRequest;
import com.rawstandard.backend.dto.CheckoutRequest;
import com.rawstandard.backend.entity.Order;
import com.rawstandard.backend.entity.OrderItem;
import com.rawstandard.backend.entity.Shirt;
import com.rawstandard.backend.entity.ShirtSize;
import com.rawstandard.backend.exception.BadRequestException;
import com.rawstandard.backend.exception.ConflictException;
import com.rawstandard.backend.exception.NotFoundException;
import com.rawstandard.backend.repository.OrderRepository;
import com.rawstandard.backend.repository.ShirtRepository;
import com.rawstandard.backend.repository.ShirtSizeRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ShirtRepository shirtRepository;
    private final ShirtSizeRepository shirtSizeRepository;

    public OrderService(OrderRepository orderRepository,
                        ShirtRepository shirtRepository,
                        ShirtSizeRepository shirtSizeRepository) {
        this.orderRepository = orderRepository;
        this.shirtRepository = shirtRepository;
        this.shirtSizeRepository = shirtSizeRepository;
    }

    @Transactional
    public Order checkout(CheckoutRequest request) {

        if (request == null || request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        Order order = new Order();
        BigDecimal total = BigDecimal.ZERO;

        for (CheckoutItemRequest itemReq : request.getItems()) {

            if (itemReq.getQuantity() <= 0) {
                throw new BadRequestException("Invalid quantity");
            }

            if (itemReq.getShirtId() == null) {
                throw new BadRequestException("Missing shirtId");
            }

            if (itemReq.getSize() == null || itemReq.getSize().isBlank()) {
                throw new BadRequestException("Missing size");
            }

            Shirt shirt = shirtRepository.findById(itemReq.getShirtId())
                    .orElseThrow(() -> new NotFoundException("Shirt not found: " + itemReq.getShirtId()));

            ShirtSize sizeRow = shirtSizeRepository.findByShirtIdAndSize(shirt.getId(), itemReq.getSize())
                    .orElseThrow(() -> new NotFoundException("Size not found: " + itemReq.getSize()));

            if (sizeRow.getStock() < itemReq.getQuantity()) {
                throw new ConflictException("Not enough stock for " + shirt.getTitle() +
                        " (" + itemReq.getSize() + "). Available: " + sizeRow.getStock());
            }

            sizeRow.setStock(sizeRow.getStock() - itemReq.getQuantity());
            shirtSizeRepository.save(sizeRow);

            BigDecimal unitPrice = shirt.getPrice();
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total = total.add(lineTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setShirtId(shirt.getId());
            orderItem.setShirtTitle(shirt.getTitle());
            orderItem.setSize(itemReq.getSize());
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setUnitPrice(unitPrice);
            orderItem.setLineTotal(lineTotal);

            order.addItem(orderItem);
        }

        order.setTotalAmount(total);

        return orderRepository.save(order);
    }
}