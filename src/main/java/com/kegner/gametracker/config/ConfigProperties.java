package com.kegner.gametracker.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ConfigurationProperties(prefix = "users")
public class ConfigProperties {

    private boolean createDefaultUser;
    
}
