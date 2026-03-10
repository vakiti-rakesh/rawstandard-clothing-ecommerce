package com.rawstandard.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rawstandard.backend.dto.ShirtDetailDto;
import com.rawstandard.backend.dto.ShirtSizeDto;
import com.rawstandard.backend.dto.ShirtSummaryDto;
import com.rawstandard.backend.entity.Shirt;
import com.rawstandard.backend.entity.ShirtSize;
import com.rawstandard.backend.exception.NotFoundException;
import com.rawstandard.backend.repository.ShirtRepository;
import com.rawstandard.backend.repository.ShirtSizeRepository;

@Service
public class ShirtService {

    private final ShirtRepository shirtRepository;
    private final ShirtSizeRepository shirtSizeRepository;

    public ShirtService(ShirtRepository shirtRepository, ShirtSizeRepository shirtSizeRepository) {
        this.shirtRepository = shirtRepository;
        this.shirtSizeRepository = shirtSizeRepository;
    }

    public List<ShirtSummaryDto> getAllShirts() {
        return shirtRepository.findAll()
                .stream()
                .map(s -> new ShirtSummaryDto(
                        s.getId(),
                        s.getTitle(),
                        s.getSlug(),
                        s.getImageUrl(),
                        s.getPrice()
                ))
                .toList();
    }

    public ShirtDetailDto getShirtById(Long id) {
        Shirt s = shirtRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Shirt not found: " + id));

        return new ShirtDetailDto(
                s.getId(),
                s.getTitle(),
                s.getSlug(),
                s.getDescription(),
                s.getEmbroideryDesign(),
                s.getImageUrl(),
                s.getPrice()
        );
    }

    public List<ShirtSizeDto> getSizesByShirtId(Long id) {
        shirtRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Shirt not found: " + id));

        List<ShirtSize> sizes = shirtSizeRepository.findByShirtId(id);

        return sizes.stream()
                .map(sz -> new ShirtSizeDto(sz.getSize(), sz.getStock()))
                .toList();
    }
}