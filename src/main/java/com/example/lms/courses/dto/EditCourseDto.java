package com.example.lms.courses.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class EditCourseDto {
  @NotNull
  private Integer vendorCode;

  @NotNull
  private Integer price;

  @NotEmpty
  private String description;
}
