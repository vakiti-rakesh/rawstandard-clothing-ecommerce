package com.rawstandard.backend.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "shirts")
public class Shirt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String embroideryDesign;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal price;

    @OneToMany(
            mappedBy = "shirt",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<ShirtSize> sizes = new ArrayList<>();

    public Shirt() {}

    // ---------- Helper methods ----------
    public void addSize(ShirtSize size) {
        sizes.add(size);
        size.setShirt(this);
    }

    public void removeSize(ShirtSize size) {
        sizes.remove(size);
        size.setShirt(null);
    }

    // ---------- Getters & Setters ----------

    public Long getId() {
        return id;
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

    public List<ShirtSize> getSizes() {
        return sizes;
    }

    public void setSizes(List<ShirtSize> sizes) {
        this.sizes = sizes;
    }
}