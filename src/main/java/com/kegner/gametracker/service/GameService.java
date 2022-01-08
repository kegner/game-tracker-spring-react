package com.kegner.gametracker.service;

import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;

public interface GameService {

    public GameDto getGame(Long id);

    public GamesDto getGames();

    public GamesDto getGames(Long userId);

    public GameDto insertGame(GameDto game);

    public GameDto upsertGame(GameDto game);

    public Long deleteGame(Long id);
    
}
