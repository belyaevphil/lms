package com.example.lms.courses.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class AssignCourseDto {
  @NotEmpty
  private String username;

  @NotEmpty
  private String courseName;
}
