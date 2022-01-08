package com.kegner.gametracker.persistence;

import java.util.List;

import com.kegner.gametracker.model.entity.Game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    public List<Game> findByUserId(Long userId);

    public Game findByUserIdAndTitle(Long userId, String title);
  
}
