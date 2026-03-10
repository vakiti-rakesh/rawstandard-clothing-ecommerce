package com.rawstandard.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class AdminCreateProductRequest {

    private String title;
    private String slug;
    private String description;
    private String embroideryDesign;
    private String imageUrl;
    private BigDecimal price;
    private List<AdminProductSizeRequest> sizes;

    public AdminCreateProductRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmbroideryDesign() {
        return embroideryDesign;
    }

    public void setEmbroideryDesign(String embroideryDesign) {
        this.embroideryDesign = embroideryDesign;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<AdminProductSizeRequest> getSizes() {
        return sizes;
    }

    public void setSizes(List<AdminProductSizeRequest> sizes) {
        this.sizes = sizes;
    }
}