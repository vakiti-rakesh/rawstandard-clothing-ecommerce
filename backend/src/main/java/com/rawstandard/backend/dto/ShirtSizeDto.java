package com.rawstandard.backend.dto;

public class ShirtSizeDto {
    private String size;
    private int stock;

    public ShirtSizeDto(String size, int stock) {
        this.size = size; this.stock = stock;
    }

    public String getSize() { return size; }
    public int getStock() { return stock; }
}