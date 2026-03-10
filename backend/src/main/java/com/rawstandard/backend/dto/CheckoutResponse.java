package com.rawstandard.backend.dto;

public class CheckoutResponse {
    private boolean success;
    private String message;
    private Long orderId;

    public CheckoutResponse() {}

    public CheckoutResponse(boolean success, String message, Long orderId) {
        this.success = success;
        this.message = message;
        this.orderId = orderId;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public Long getOrderId() { return orderId; }
}