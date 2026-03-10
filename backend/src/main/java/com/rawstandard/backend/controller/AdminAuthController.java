package com.rawstandard.backend.controller;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rawstandard.backend.dto.LoginRequest;
import com.rawstandard.backend.dto.LoginResponse;
import com.rawstandard.backend.entity.AdminUser;
import com.rawstandard.backend.repository.AdminUserRepository;
import com.rawstandard.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAuthController {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminAuthController(AdminUserRepository adminUserRepository,
                               PasswordEncoder passwordEncoder,
                               JwtUtil jwtUtil) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Optional<AdminUser> adminOptional = adminUserRepository.findByUsername(request.getUsername());

        if (adminOptional.isEmpty()) {
            return new LoginResponse(false, "Invalid username or password", null);
        }

        AdminUser admin = adminOptional.get();

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return new LoginResponse(false, "Invalid username or password", null);
        }

        String token = jwtUtil.generateToken(admin.getUsername(), admin.getRole());

        return new LoginResponse(true, "Login successful", token);
    }
}