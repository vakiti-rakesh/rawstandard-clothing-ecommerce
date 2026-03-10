package com.rawstandard.backend.dto;

import java.math.BigDecimal;

public class ShirtDetailDto {
    private Long id;
    private String title;
    private String slug;
    private String description;
    private String embroideryDesign;
    private String imageUrl;
    private BigDecimal price;

    public ShirtDetailDto(Long id, String title, String slug, String description,
                          String embroideryDesign, String imageUrl, BigDecimal price) {
        this.id = id; this.title = title; this.slug = slug; this.description = description;
        this.embroideryDesign = embroideryDesign; this.imageUrl = imageUrl; this.price = price;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSlug() { return slug; }
    public String getDescription() { return description; }
    public String getEmbroideryDesign() { return embroideryDesign; }
    public String getImageUrl() { return imageUrl; }
    public BigDecimal getPrice() { return price; }
}