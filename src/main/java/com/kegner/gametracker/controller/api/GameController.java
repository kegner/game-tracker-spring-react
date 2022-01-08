package com.kegner.gametracker.controller.api;

import com.kegner.gametracker.model.dto.GameDto;
import com.kegner.gametracker.model.dto.GamesDto;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/games")
public interface GameController {

    @GetMapping("/{id}")
    public GameDto getGame(@PathVariable Long id);

    @GetMapping
    public GamesDto getGames(@RequestParam(required = false) Long userId);

    @PostMapping
    public GameDto insertGame(@RequestBody GameDto game);

    @PutMapping
    public GameDto upsertGame(@RequestBody GameDto game);

    @DeleteMapping("/{id}")
    public Long deleteGame(@PathVariable Long id);
    
}
