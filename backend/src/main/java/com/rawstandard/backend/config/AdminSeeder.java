package com.rawstandard.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.rawstandard.backend.entity.AdminUser;
import com.rawstandard.backend.repository.AdminUserRepository;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner seedAdmin(AdminUserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findByUsername("admin").isEmpty()) {
                AdminUser admin = new AdminUser();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole("ROLE_ADMIN");
                repo.save(admin);

                System.out.println("Admin user created: admin / admin123");
            }
        };
    }
}