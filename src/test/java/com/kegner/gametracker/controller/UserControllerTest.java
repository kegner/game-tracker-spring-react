package com.kegner.gametracker.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.security.Principal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kegner.gametracker.controller.api.UserControllerImpl;
import com.kegner.gametracker.model.dto.UserDto;
import com.kegner.gametracker.security.UserDetailsServiceImpl;
import com.kegner.gametracker.service.UserServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@WebMvcTest(controllers = UserControllerImpl.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {
    
    @MockBean
    private UserServiceImpl userService;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private MockMvc mockMvc;

    private UserDto user;
    
    @BeforeEach
    void setup() throws Exception {
        user = UserDto.builder().id(1L).username("user").build();
    }

    @Test
    void getUserTest() throws Exception {
        when(userService.getUser(any())).thenReturn(user);

        Principal mockPrincipal = mock(Principal.class);
        when(mockPrincipal.getName()).thenReturn("user");
        
        RequestBuilder requestBuilder = MockMvcRequestBuilders
            .get("/api/v1/users/current-user")
            .principal(mockPrincipal)
            .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(requestBuilder).andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("user"));
    }
    
    @Test
    void signupUserTest() throws Exception {
        when(userService.signup(any())).thenReturn(user);
        mockMvc.perform(post("/api/v1/users")
                .content(new ObjectMapper().writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user"));
    }
}
