package com.kegner.gametracker.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import com.kegner.gametracker.exceptions.ResourceExistsException;
import com.kegner.gametracker.exceptions.ResourceNotFoundException;
import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;
import com.kegner.gametracker.model.entity.Game;
import com.kegner.gametracker.persistence.GameRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class GameServiceTest {

    @Autowired
    private GameServiceImpl gameService;

    @MockBean
    private GameRepository gameRepository;

    private Game game;
    private GameDto gameDtoWithId;
    private List<Game> gamesList;

    @BeforeEach
    private void setup() {
        game = Game.builder().id(123L).userId(1L).title("My game").build();
        gameDtoWithId = GameDto.builder().id(123L).build();
        gamesList = List.of(game);
    }

    @Test
    void getGameTest() {
        when(gameRepository.findById(any())).thenReturn(Optional.of(game));
        GameDto gameDto = gameService.getGame(123L);
        assertEquals("My game", gameDto.getTitle());
    }

    @Test
    void getGameErrorTest() {
        when(gameRepository.findById(any())).thenThrow(new ResourceNotFoundException("Not found"));
        assertThrows(ResourceNotFoundException.class, () -> {
            gameService.getGame(123L);
        });
    }
    
    @Test
    void getAllGamesTest() {
        when(gameRepository.findAll()).thenReturn(gamesList);
        GamesDto gamesDto = gameService.getGames();
        assertEquals(1, gamesDto.getCount());
        assertEquals("My game", gamesDto.getGamesList().get(0).getTitle());
    }
    
    @Test
    void getGamesByUserIdTest() {
        when(gameRepository.findByUserId(any())).thenReturn(gamesList);
        GamesDto gamesDto = gameService.getGames(1L);
        assertEquals(1, gamesDto.getCount());
        assertEquals("My game", gamesDto.getGamesList().get(0).getTitle());
    }
    
    @Test
    void insertGameTest() {
        when(gameRepository.findByUserIdAndTitle(any(), any())).thenReturn(null);
        when(gameRepository.save(any())).thenReturn(game);
        GameDto gameDto = gameService.insertGame(new GameDto());
        assertEquals("My game", gameDto.getTitle());
    }
    
    @Test
    void insertGameErrorTest() {
        when(gameRepository.findByUserIdAndTitle(any(), any())).thenReturn(game);
        assertThrows(ResourceExistsException.class, () -> {
            gameService.insertGame(new GameDto());
        });
    }
    
    @Test
    void upsertGameTest() {
        when(gameRepository.findById(any())).thenReturn(Optional.of(game));
        when(gameRepository.save(any())).thenReturn(game);
        GameDto gameDto = gameService.upsertGame(gameDtoWithId);
        assertEquals("My game", gameDto.getTitle());
    }

    @Test
    void upsertGameDoesNotExistTest() {
        when(gameRepository.save(any())).thenReturn(game);
        when(gameRepository.findByUserIdAndTitle(any(), any())).thenReturn(game);
        GameDto gameDto = gameService.upsertGame(gameDtoWithId);
        assertEquals("My game", gameDto.getTitle());
    }

    @Test
    void upsertGameWithAlreadyExistingTitleTest() {
        when(gameRepository.findByUserIdAndTitle(any(), any())).thenReturn(game);
        GameDto gameDtoWithDifferentId = GameDto.builder().id(456L).build();
        assertThrows(ResourceExistsException.class, () -> {
            gameService.upsertGame(gameDtoWithDifferentId);
        });
    }

    @Test
    void deleteGameTest() {
        doNothing().when(gameRepository).deleteById(any());
        Long deletedId = gameService.deleteGame(123L);
        assertEquals(123, deletedId);
    }
}
