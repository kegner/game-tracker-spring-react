package com.kegner.gametracker.model.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class GameDto {
    
    private final Long id;

    private final String title;
    private final String platform;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String status;
    private final Double hoursToComplete;
    private final Double rating;
    private final Double price;
    private final Long userId;
}
