package com.sivalabs.geeksclub.bookmarks.web.controllers;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.sivalabs.geeksclub.common.AbstractIntegrationTest;
import com.sivalabs.geeksclub.config.ApplicationProperties;
import com.sivalabs.geeksclub.config.security.TokenHelper;
import com.sivalabs.geeksclub.users.entities.User;
import com.sivalabs.geeksclub.users.models.AuthenticationRequest;
import com.sivalabs.geeksclub.users.models.UserDTO;
import com.sivalabs.geeksclub.users.services.UserService;
import com.sivalabs.geeksclub.utils.TestDataFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

class AuthenticationControllerIT extends AbstractIntegrationTest {

    @Autowired private UserService userService;

    @Autowired private TokenHelper tokenHelper;

    @Autowired private ApplicationProperties properties;

    @Test
    void should_login_successfully_with_valid_credentials() throws Exception {
        User user = createUser();
        AuthenticationRequest authenticationRequestDTO =
                AuthenticationRequest.builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .build();

        this.mockMvc
                .perform(
                        post("/api/auth/login")
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(authenticationRequestDTO)))
                .andExpect(status().isOk());
    }

    @Test
    void should_not_login_with_invalid_credentials() throws Exception {
        AuthenticationRequest authenticationRequestDTO =
                AuthenticationRequest.builder()
                        .username("nonexisting@gmail.com")
                        .password("secret")
                        .build();

        this.mockMvc
                .perform(
                        post("/api/auth/login")
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(authenticationRequestDTO)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser("siva@gmail.com")
    void should_get_refreshed_authToken_if_authorized() throws Exception {
        String token = tokenHelper.generateToken("siva@gmail.com");
        this.mockMvc
                .perform(
                        post("/api/auth/refresh")
                                .header(properties.getJwt().getHeader(), "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void should_fail_to_get_refreshed_authToken_if_unauthorized() throws Exception {
        this.mockMvc.perform(post("/api/auth/refresh")).andExpect(status().isForbidden());
    }

    @Test
    void should_fail_to_get_refreshed_authToken_if_token_is_invalid() throws Exception {
        this.mockMvc
                .perform(
                        post("/api/auth/refresh")
                                .header(properties.getJwt().getHeader(), "Bearer invalid-token"))
                .andExpect(status().isForbidden());
    }

    private User createUser() {
        User user = TestDataFactory.createUser();
        String plainPwd = user.getPassword();
        UserDTO userDTO = userService.createUser(UserDTO.fromEntity(user));
        user.setId(userDTO.getId());
        user.setPassword(plainPwd);
        return user;
    }
}
