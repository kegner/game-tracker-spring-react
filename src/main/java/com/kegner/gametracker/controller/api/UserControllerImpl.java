package com.kegner.gametracker.controller.api;

import java.security.Principal;

import com.kegner.gametracker.model.dto.UserDto;
import com.kegner.gametracker.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Override
    public UserDto getCurrentUser(Principal principal) {
        return userService.getUser(principal.getName());
    }

    @Override
    public UserDto signup(UserDto user) {
        return userService.signup(user);
    }
    
}
