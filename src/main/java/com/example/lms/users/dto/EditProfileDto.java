package com.example.lms.users.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class EditProfileDto {
  @NotEmpty
  private String firstName;

  @NotEmpty
  private String lastName;

  private String email;

  private String phone;
}