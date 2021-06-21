package com.example.lms.users.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ChangeProfileImageDto {
  private MultipartFile image;
}
