package com.example.lms.auth.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignupDto {
    @NotEmpty
    private String username;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @Size(min = 6, max = 20)
    private String password;

    @NotEmpty
    private String confirmPassword;
}
