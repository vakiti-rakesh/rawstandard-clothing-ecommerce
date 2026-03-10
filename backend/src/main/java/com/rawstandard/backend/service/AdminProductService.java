package com.rawstandard.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rawstandard.backend.dto.AdminCreateProductRequest;
import com.rawstandard.backend.dto.AdminProductSizeRequest;
import com.rawstandard.backend.entity.Shirt;
import com.rawstandard.backend.entity.ShirtSize;
import com.rawstandard.backend.exception.BadRequestException;
import com.rawstandard.backend.repository.ShirtRepository;
import com.rawstandard.backend.repository.ShirtSizeRepository;

@Service
public class AdminProductService {

    private final ShirtRepository shirtRepository;
    private final ShirtSizeRepository shirtSizeRepository;

    public AdminProductService(ShirtRepository shirtRepository, ShirtSizeRepository shirtSizeRepository) {
        this.shirtRepository = shirtRepository;
        this.shirtSizeRepository = shirtSizeRepository;
    }

    @Transactional
    public Shirt createProduct(AdminCreateProductRequest request) {
        validateRequest(request);

        if (shirtRepository.findBySlug(request.getSlug()).isPresent()) {
            throw new BadRequestException("Slug already exists");
        }

        Shirt shirt = new Shirt();
        shirt.setTitle(request.getTitle().trim());
        shirt.setSlug(request.getSlug().trim());
        shirt.setDescription(request.getDescription());
        shirt.setEmbroideryDesign(request.getEmbroideryDesign());
        shirt.setImageUrl(request.getImageUrl());
        shirt.setPrice(request.getPrice());

        Shirt savedShirt = shirtRepository.save(shirt);

        for (AdminProductSizeRequest sizeReq : request.getSizes()) {
            ShirtSize shirtSize = new ShirtSize();
            shirtSize.setShirt(savedShirt);
            shirtSize.setSize(sizeReq.getSize().trim().toUpperCase());
            shirtSize.setStock(sizeReq.getStock());
            shirtSizeRepository.save(shirtSize);
        }

        return savedShirt;
    }

    public List<Shirt> getAllProducts() {
        return shirtRepository.findAll();
    }

    private void validateRequest(AdminCreateProductRequest request) {
        if (request == null) {
            throw new BadRequestException("Request body is required");
        }

        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new BadRequestException("Title is required");
        }

        if (request.getSlug() == null || request.getSlug().isBlank()) {
            throw new BadRequestException("Slug is required");
        }

        if (request.getPrice() == null || request.getPrice().doubleValue() <= 0) {
            throw new BadRequestException("Valid price is required");
        }

        if (request.getSizes() == null || request.getSizes().isEmpty()) {
            throw new BadRequestException("At least one size is required");
        }

        for (AdminProductSizeRequest sizeReq : request.getSizes()) {
            if (sizeReq.getSize() == null || sizeReq.getSize().isBlank()) {
                throw new BadRequestException("Size is required");
            }

            if (sizeReq.getStock() == null || sizeReq.getStock() < 0) {
                throw new BadRequestException("Stock must be 0 or more");
            }
        }
    }
}