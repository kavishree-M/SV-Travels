package com.svtravels.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Value("${svtravels.cors.allowed-origins:http://localhost:3000,http://localhost:5173,https://*.onrender.com,https://*.run.app}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String[] origins = Arrays.stream(allowedOrigins.split(","))
                        .map(String::trim)
                        .filter(origin -> !origin.isEmpty())
                        .map(CorsConfig::normalizeOrigin)
                        .toArray(String[]::new);
                registry.addMapping("/api/**")
                        .allowedOriginPatterns(origins)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }

    private static String normalizeOrigin(String origin) {
        if (origin.contains("://")) {
            return origin;
        }

        if (!origin.contains(".") && !origin.contains(":")) {
            return "https://" + origin + ".onrender.com";
        }

        return "https://" + origin;
    }
}
