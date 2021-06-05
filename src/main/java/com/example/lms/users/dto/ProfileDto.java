package com.example.lms.users.dto;

import lombok.Data;

@Data
public class ProfileDto {
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
}