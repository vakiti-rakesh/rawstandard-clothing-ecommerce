package com.rawstandard.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rawstandard.backend.entity.Shirt;

public interface ShirtRepository extends JpaRepository<Shirt, Long> {
    Optional<Shirt> findBySlug(String slug);
   
}
