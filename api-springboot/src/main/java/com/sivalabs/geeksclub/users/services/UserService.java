package com.sivalabs.geeksclub.users.services;

import com.sivalabs.geeksclub.common.exceptions.GeeksClubException;
import com.sivalabs.geeksclub.common.exceptions.ResourceNotFoundException;
import com.sivalabs.geeksclub.users.entities.RoleEnum;
import com.sivalabs.geeksclub.users.entities.User;
import com.sivalabs.geeksclub.users.models.ChangePasswordRequest;
import com.sivalabs.geeksclub.users.models.UserDTO;
import com.sivalabs.geeksclub.users.repositories.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(UserDTO::fromEntity);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDTO createUser(UserDTO user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new GeeksClubException("Email " + user.getEmail() + " is already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User userEntity = user.toEntity();
        userEntity.setRole(RoleEnum.ROLE_USER);
        return UserDTO.fromEntity(userRepository.save(userEntity));
    }

    public UserDTO updateUser(UserDTO user) {
        User userById =
                userRepository
                        .findById(user.getId())
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "User with id " + user.getId() + " not found"));
        User userEntity = user.toEntity();
        userEntity.setPassword(userById.getPassword());
        userEntity.setRole(userById.getRole());
        return UserDTO.fromEntity(userRepository.save(userEntity));
    }

    public void deleteUser(Long userId) {
        userRepository.findById(userId).ifPresent(userRepository::delete);
    }

    public void changePassword(String email, ChangePasswordRequest changePasswordRequest) {
        User user =
                this.getUserByEmail(email)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "User with email " + email + " not found"));
        if (passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        } else {
            throw new GeeksClubException("Current password doesn't match");
        }
    }
}
