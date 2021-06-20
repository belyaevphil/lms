package com.example.lms.courses.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ChangeCourseImageDto {
  private MultipartFile image;
}
