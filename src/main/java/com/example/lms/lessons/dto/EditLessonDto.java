package com.example.lms.lessons.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class EditLessonDto {
  @NotEmpty
  private String name;

  @NotEmpty
  private String description;

  @Size(max = 3)
  private MultipartFile[] files;
}
