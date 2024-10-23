package com.example.chatg3.chat.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permitir todas las rutas
                .allowedOrigins("http://localhost:3000") // Permitir solo tu frontend
                .allowedMethods("*") // Métodos permitidos
                .allowedHeaders("*") // Permitir todos los headers
                .allowCredentials(true); // Permitir credenciales si es necesario
    }
}
