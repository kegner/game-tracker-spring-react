package com.kegner.gametracker.model.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Games {

    @JsonProperty("games")
    private List<Game> gamesList;
	private int count;
	
	public Games(List<Game> gamesList) {
		this.gamesList = gamesList;
		this.count = gamesList.size();
	}
    
}
