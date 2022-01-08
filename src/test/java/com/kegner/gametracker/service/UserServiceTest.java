package com.kegner.gametracker.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.kegner.gametracker.exceptions.ResourceExistsException;
import com.kegner.gametracker.model.dto.UserDto;
import com.kegner.gametracker.model.entity.User;
import com.kegner.gametracker.persistence.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    private void setup() {
        user = User.builder().id(1L).username("user").build();
    }

    @Test
    void getUserTest() {
        when(userRepository.findByUsername(any())).thenReturn(user);
        UserDto userDto = userService.getUser("user");
        assertEquals("user", userDto.getUsername());
    }

    @Test
    void getUserErrorTest() {
        when(userRepository.findByUsername(any())).thenThrow(new UsernameNotFoundException("Not found"));
        assertThrows(UsernameNotFoundException.class, () -> {
            userService.getUser("user");
        });
    }
    
    @Test
    void signupUserTest() {
        when(userRepository.countByUsername(any())).thenReturn(0);
        when(userRepository.save(any())).thenReturn(user);
        UserDto userDto = userService.signup(UserDto.builder().username("me").password("pass").build());
        assertEquals("user", userDto.getUsername());
    }

    @Test
    void signupUserErrorTest() {
        when(userRepository.countByUsername(any())).thenReturn(1);
        assertThrows(ResourceExistsException.class, () -> {
            userService.signup(UserDto.builder().username("me").password("pass").build());
        });
    }
    
}
