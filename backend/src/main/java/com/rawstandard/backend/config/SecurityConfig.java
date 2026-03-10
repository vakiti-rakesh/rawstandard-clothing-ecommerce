package com.rawstandard.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/shirts/**",
                    "/api/orders/checkout",
                    "/api/admin/auth/**",
                    "/api/admin/dashboard/**",
                    "/api/admin/products/**"
                ).permitAll()
                .requestMatchers("/api/admin/**").authenticated()
                .anyRequest().permitAll()
            );

        return http.build();
    }
}