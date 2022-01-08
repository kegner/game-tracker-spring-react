package com.kegner.gametracker.controller.api;

import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;
import com.kegner.gametracker.service.GameService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameControllerImpl implements GameController {

    @Autowired
    private GameService gameService;

    @Override
    public GameDto getGame(Long id) {
        return gameService.getGame(id);
    }

    @Override
    public GamesDto getGames(Long userId) {
        return gameService.getGames(userId);
    }

    @Override
    public GameDto insertGame(GameDto game) {
        return gameService.insertGame(game);
    }

    @Override
    public GameDto upsertGame(GameDto game) {
        return gameService.upsertGame(game);
    }

    @Override
    public Long deleteGame(Long id) {
        return gameService.deleteGame(id);
    }
    
}
