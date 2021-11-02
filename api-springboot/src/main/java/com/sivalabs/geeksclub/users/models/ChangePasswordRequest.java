package com.sivalabs.geeksclub.users.models;

import javax.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordRequest {

    @NotBlank(message = "Old password cannot be blank")
    String oldPassword;

    @NotBlank(message = "New password cannot be blank")
    String newPassword;
}
