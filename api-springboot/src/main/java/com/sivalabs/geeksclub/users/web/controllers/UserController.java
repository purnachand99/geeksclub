package com.sivalabs.geeksclub.users.web.controllers;

import static org.springframework.http.HttpStatus.CREATED;

import com.sivalabs.geeksclub.common.annotations.AnyAuthenticatedUser;
import com.sivalabs.geeksclub.common.exceptions.BadRequestException;
import com.sivalabs.geeksclub.users.models.CreateUserRequest;
import com.sivalabs.geeksclub.users.models.UserDTO;
import com.sivalabs.geeksclub.users.services.SecurityService;
import com.sivalabs.geeksclub.users.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.Optional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final SecurityService securityService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        log.info("process=get_user, user_id={}", id);
        return userService
                .getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseStatus(CREATED)
    public UserDTO createUser(@RequestBody @Valid CreateUserRequest createUserRequest) {
        log.info("process=create_user, user_email={}", createUserRequest.getEmail());
        UserDTO userDTO =
                new UserDTO(
                        null,
                        createUserRequest.getName(),
                        createUserRequest.getEmail(),
                        createUserRequest.getPassword(),
                        null,
                        null);
        return userService.createUser(userDTO);
    }

    @PutMapping("/{id}")
    @AnyAuthenticatedUser
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public UserDTO updateUser(@PathVariable Long id, @RequestBody @Valid UserDTO user) {
        log.info("process=update_user, user_id={}", id);
        if (!id.equals(securityService.loginUserId())) {
            throw new BadRequestException("Invalid details");
        }
        user.setId(id);
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    @AnyAuthenticatedUser
    @Operation(security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        log.info("process=delete_user, user_id={}", id);
        Optional<UserDTO> userById = userService.getUserById(id);
        if (userById.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        if (!id.equals(securityService.loginUserId()) && !securityService.isCurrentUserAdmin()) {
            return ResponseEntity.badRequest().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
