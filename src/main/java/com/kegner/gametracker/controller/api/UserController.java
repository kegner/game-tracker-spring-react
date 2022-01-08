package com.kegner.gametracker.controller.api;

import java.security.Principal;

import com.kegner.gametracker.model.dto.UserDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public interface UserController {

    @GetMapping("/current-user")
    public UserDto getCurrentUser(Principal principal);

    @PostMapping
    public UserDto signup(@RequestBody UserDto user);
    
}
