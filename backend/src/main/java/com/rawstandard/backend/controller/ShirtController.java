package com.rawstandard.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.rawstandard.backend.dto.ShirtDetailDto;
import com.rawstandard.backend.dto.ShirtSizeDto;
import com.rawstandard.backend.dto.ShirtSummaryDto;
import com.rawstandard.backend.service.ShirtService;

@RestController
@RequestMapping("/api/shirts")
@CrossOrigin(origins = "http://localhost:5173")
public class ShirtController {

    private final ShirtService shirtService;

    public ShirtController(ShirtService shirtService) {
        this.shirtService = shirtService;
    }

    @GetMapping
    public List<ShirtSummaryDto> list() {
        return shirtService.getAllShirts();
    }

    @GetMapping("/{id}")
    public ShirtDetailDto get(@PathVariable Long id) {
        return shirtService.getShirtById(id);
    }

    @GetMapping("/{id}/sizes")
    public List<ShirtSizeDto> sizes(@PathVariable Long id) {
        return shirtService.getSizesByShirtId(id);
    }
}