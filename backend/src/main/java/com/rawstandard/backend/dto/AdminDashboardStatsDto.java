package com.rawstandard.backend.dto;

public class AdminDashboardStatsDto {

    private long totalProducts;
    private long totalOrders;
    private long lowStockCount;
    private double totalRevenue;

    public AdminDashboardStatsDto() {
    }

    public AdminDashboardStatsDto(long totalProducts, long totalOrders, long lowStockCount, double totalRevenue) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.lowStockCount = lowStockCount;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getLowStockCount() {
        return lowStockCount;
    }

    public void setLowStockCount(long lowStockCount) {
        this.lowStockCount = lowStockCount;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}