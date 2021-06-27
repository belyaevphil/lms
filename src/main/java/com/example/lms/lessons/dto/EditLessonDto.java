package com.example.lms.lessons.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class EditLessonDto {
  @NotEmpty
  private String name;

  @NotEmpty
  private String description;
}
