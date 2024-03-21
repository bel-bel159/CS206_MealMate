package com.example.mealmateBackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Spring Security filter chain configuration
    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //         // configuration details
    //     return http.build();
    // }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Apply CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .csrf(AbstractHttpConfigurer::disable)
            // other configuration details
            .authorizeHttpRequests(authorize -> authorize

                .requestMatchers("/users").permitAll()

                .requestMatchers("/users/**").permitAll() // Allow anyone to access "/users/** */"
                    .requestMatchers("/users/login").permitAll()
                    .requestMatchers("/deliveryCarts/**").permitAll() // Allow anyone to access "/deliveryCarts/**"
                    .requestMatchers("/orderItems/**").permitAll() // Allow anyone to access "/orderItems/**"
                    .requestMatchers("/orders/**").permitAll() // Allow anyone to access "/orders/**"
                .anyRequest().permitAll() // All other paths require authentication
            )
            // other configurations like .httpBasic(), .formLogin() if needed
            ;

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern(CorsConfiguration.ALL);
        configuration.setAllowedMethods(List.of(CorsConfiguration.ALL));

        //=========================================================================================MUST CHANGE=========================================================
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Frontend server address ===================CHANGE HERE FOR IP BIND================
        //============================================================================================================================================================
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "x-auth-token"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Register CORS configuration for all paths
        return source;
    }
}