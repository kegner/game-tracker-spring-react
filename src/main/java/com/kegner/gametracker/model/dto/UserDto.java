package com.kegner.gametracker.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class UserDto {

    private final Long id;

    private final String username;
    @JsonProperty(access = Access.WRITE_ONLY)
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final List<GameDto> games;

    @JsonProperty("fullName")
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
