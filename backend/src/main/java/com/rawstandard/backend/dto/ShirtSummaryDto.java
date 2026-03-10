package com.rawstandard.backend.dto;

import java.math.BigDecimal;

public class ShirtSummaryDto {
    private Long id;
    private String title;
    private String slug;
    private String imageUrl;
    private BigDecimal price;

    public ShirtSummaryDto(Long id, String title, String slug, String imageUrl, BigDecimal price) {
        this.id = id; this.title = title; this.slug = slug; this.imageUrl = imageUrl; this.price = price;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSlug() { return slug; }
    public String getImageUrl() { return imageUrl; }
    public BigDecimal getPrice() { return price; }
}