package com.example.lms.courses.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class CreateLessonDto {
  @NotEmpty
  private String name;

  @NotEmpty
  private String description;
}
