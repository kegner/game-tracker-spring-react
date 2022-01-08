package com.kegner.gametracker.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kegner.gametracker.controller.api.GameControllerImpl;
import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;
import com.kegner.gametracker.security.UserDetailsServiceImpl;
import com.kegner.gametracker.service.GameServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = GameControllerImpl.class)
@AutoConfigureMockMvc(addFilters = false)
class GameControllerTest {
    
    @MockBean
    private GameServiceImpl gameService;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private MockMvc mockMvc;

    private GameDto game;
    private GamesDto games;
    private List<GameDto> gamesList;
    
    @BeforeEach
    void setup() throws Exception {
        game = GameDto.builder().title("My game").build();
        gamesList = List.of(game);
        games = GamesDto.builder().gamesList(gamesList).build();
    }

    @Test
    void getGameTest() throws Exception {
        when(gameService.getGame(any())).thenReturn(game);
        mockMvc.perform(get("/api/v1/games/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("My game"));
    }
    
    @Test
    void getGamesTest() throws Exception {
        when(gameService.getGames(any())).thenReturn(games);
        mockMvc.perform(get("/api/v1/games"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.games[0].title").value("My game"));
    }
    
    @Test
    void insertGameTest() throws Exception {
        when(gameService.insertGame(any())).thenReturn(game);
        mockMvc.perform(post("/api/v1/games")
                .content(new ObjectMapper().writeValueAsString(game))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("My game"));
    }
    
    @Test
    void upsertTest() throws Exception {
        when(gameService.upsertGame(any())).thenReturn(game);
        mockMvc.perform(put("/api/v1/games")
                .content(new ObjectMapper().writeValueAsString(game))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("My game"));
    }
    
    @Test
    void deleteGameTest() throws Exception {
        when(gameService.deleteGame(any())).thenReturn(1L);
        mockMvc.perform(delete("/api/v1/games/123"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}
