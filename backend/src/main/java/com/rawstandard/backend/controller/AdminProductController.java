package com.rawstandard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.rawstandard.backend.dto.AdminCreateProductRequest;
import com.rawstandard.backend.dto.ApiResponse;
import com.rawstandard.backend.entity.Shirt;
import com.rawstandard.backend.service.AdminProductService;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    @PostMapping
    public ApiResponse createProduct(@RequestBody AdminCreateProductRequest request) {
        Shirt saved = adminProductService.createProduct(request);
        return new ApiResponse(true, "Product created successfully. ID: " + saved.getId());
    }

    @GetMapping
    public List<Shirt> getAllProducts() {
        return adminProductService.getAllProducts();
    }
}