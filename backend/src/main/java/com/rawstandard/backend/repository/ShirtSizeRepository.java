package com.rawstandard.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rawstandard.backend.entity.ShirtSize;

public interface ShirtSizeRepository extends JpaRepository<ShirtSize, Long> {

    List<ShirtSize> findByShirtId(Long shirtId);

    Optional<ShirtSize> findByShirtIdAndSize(Long shirtId, String size);

    @Query("SELECT COUNT(s) FROM ShirtSize s WHERE s.stock <= 5")
    long countLowStockSizes();
}