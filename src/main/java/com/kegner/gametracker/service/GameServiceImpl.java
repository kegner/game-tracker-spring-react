package com.kegner.gametracker.service;

import java.util.Objects;

import com.kegner.gametracker.exceptions.ResourceExistsException;
import com.kegner.gametracker.exceptions.ResourceNotFoundException;
import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;
import com.kegner.gametracker.model.entity.Game;
import com.kegner.gametracker.model.entity.Games;
import com.kegner.gametracker.persistence.GameRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {
    
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public GameDto getGame(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("A game with this ID was not found."));
        return modelMapper.map(game, GameDto.class);
    }
    
    @Override
    public GamesDto getGames(Long userId) {
        Games games;
        if (userId != null) {
            games = new Games(gameRepository.findByUserId(userId));
        } else {
            games = new Games(gameRepository.findAll());
        }
        return modelMapper.map(games, GamesDto.class);
    }

    @Override
    public GamesDto getGames() {
        return getGames(null);
    }

    @Override
    public GameDto insertGame(GameDto game) {
        // enforce that POST should create resources
        if (game.getId() != null && gameRepository.findById(game.getId()).orElse(null) != null) {
            throw new ResourceExistsException("A game with this ID already exists.");
        }
        return saveGame(game);
    }

    @Override
    public GameDto upsertGame(GameDto game) {
        return saveGame(game);
    }

    @Override
    public Long deleteGame(Long id) {
        gameRepository.deleteById(id);
        return id;
    }

    private GameDto saveGame(GameDto game) {
        Game existingGame = gameRepository.findByUserIdAndTitle(game.getUserId(), game.getTitle());
        if (existingGame != null && !Objects.equals(existingGame.getId(), game.getId())) {
            throw new ResourceExistsException("A game with this title already exists.");
        }
        Game gameEntity = modelMapper.map(game, Game.class);
        return modelMapper.map(gameRepository.save(gameEntity), GameDto.class);
    }

}
