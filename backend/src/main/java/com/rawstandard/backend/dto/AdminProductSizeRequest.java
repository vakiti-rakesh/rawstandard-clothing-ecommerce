package com.rawstandard.backend.dto;

public class AdminProductSizeRequest {

    private String size;
    private Integer stock;

    public AdminProductSizeRequest() {
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}