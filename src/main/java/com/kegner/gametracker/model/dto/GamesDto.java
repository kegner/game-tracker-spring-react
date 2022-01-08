package com.kegner.gametracker.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class GamesDto {

    @JsonProperty("games")
    private final List<GameDto> gamesList;
	private final int count;
	
	public GamesDto(List<GameDto> gamesList) {
		this.gamesList = gamesList;
		this.count = gamesList.size();
	}
    
}