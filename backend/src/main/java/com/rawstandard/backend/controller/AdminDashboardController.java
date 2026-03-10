package com.rawstandard.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rawstandard.backend.dto.AdminDashboardStatsDto;
import com.rawstandard.backend.repository.OrderRepository;
import com.rawstandard.backend.repository.ShirtRepository;
import com.rawstandard.backend.repository.ShirtSizeRepository;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final ShirtRepository shirtRepository;
    private final OrderRepository orderRepository;
    private final ShirtSizeRepository shirtSizeRepository;

    public AdminDashboardController(
            ShirtRepository shirtRepository,
            OrderRepository orderRepository,
            ShirtSizeRepository shirtSizeRepository) {
        this.shirtRepository = shirtRepository;
        this.orderRepository = orderRepository;
        this.shirtSizeRepository = shirtSizeRepository;
    }

    @GetMapping("/stats")
    public AdminDashboardStatsDto getStats() {
        long totalProducts = shirtRepository.count();
        long totalOrders = orderRepository.count();
        long lowStockCount = shirtSizeRepository.countLowStockSizes();
        Double revenue = orderRepository.getTotalRevenue();

        return new AdminDashboardStatsDto(
                totalProducts,
                totalOrders,
                lowStockCount,
                revenue != null ? revenue : 0.0
        );
    }
}