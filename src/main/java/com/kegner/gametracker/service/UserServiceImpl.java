package com.kegner.gametracker.service;

import com.kegner.gametracker.exceptions.ResourceExistsException;
import com.kegner.gametracker.model.dto.UserDto;
import com.kegner.gametracker.model.entity.User;
import com.kegner.gametracker.persistence.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Could not find user");
        }
        return modelMapper.map(user, UserDto.class); 
    }

    @Override
    public UserDto signup(UserDto user) {
        int count = userRepository.countByUsername(user.getUsername());
        if (count > 0) {
            throw new ResourceExistsException("A user with this username already exists.");
        }
        User userEntity = modelMapper.map(user, User.class);
        userEntity = userEntity.toBuilder().password(passwordEncoder.encode(userEntity.getPassword())).build();
        return modelMapper.map(userRepository.save(userEntity), UserDto.class);
    }
    
}
