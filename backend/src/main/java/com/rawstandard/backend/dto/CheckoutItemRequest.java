package com.rawstandard.backend.dto;

public class CheckoutItemRequest {
    private Long shirtId;
    private String size;
    private int quantity;

    public CheckoutItemRequest() {}

    public Long getShirtId() { return shirtId; }
    public void setShirtId(Long shirtId) { this.shirtId = shirtId; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}