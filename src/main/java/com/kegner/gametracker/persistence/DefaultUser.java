package com.kegner.gametracker.persistence;

import com.kegner.gametracker.config.ConfigProperties;
import com.kegner.gametracker.model.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DefaultUser {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ConfigProperties configProperties;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        if (!configProperties.isCreateDefaultUser() || userRepository.findByUsername("testuser") != null) {
            return;
        }

        User user = User.builder()
                .username("testuser")
                .firstName("Test")
                .lastName("User")
                .password(passwordEncoder.encode("pass"))
                .build();
        userRepository.save(user);
    }
}
