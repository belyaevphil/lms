package com.example.lms.courses.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class CreateCourseDto {
  @NotEmpty
  private String name;
}
