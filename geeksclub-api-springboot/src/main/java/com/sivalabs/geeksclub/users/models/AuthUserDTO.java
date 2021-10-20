package com.sivalabs.geeksclub.users.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sivalabs.geeksclub.users.entities.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthUserDTO {
    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("role")
    private RoleEnum role;
}
