package com.example.mealmateBackend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

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
            .csrf(csrf -> csrf.disable())
            // other configuration details
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/users/**").permitAll() // Allow anyone to access "/users/** */"
                    .requestMatchers("/deliveryCarts/**").permitAll() // Allow anyone to access "/deliveryCarts/**"

                .anyRequest().authenticated() // All other paths require authentication
            )
            // other configurations like .httpBasic(), .formLogin() if needed
            ;

        return http.build();
    }

}