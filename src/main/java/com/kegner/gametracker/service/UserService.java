package com.kegner.gametracker.service;

import com.kegner.gametracker.model.dto.UserDto;

public interface UserService {

    public UserDto getUser(String username);

    public UserDto signup(UserDto user);
    
}
