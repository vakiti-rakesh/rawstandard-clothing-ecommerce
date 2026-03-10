package com.rawstandard.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rawstandard.backend.entity.ShirtImage;

public interface ShirtImageRepository extends JpaRepository<ShirtImage, Long> {
    List<ShirtImage> findByShirtIdOrderBySortOrderAsc(Long shirtId);
}