package com.example.lms.lessons.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class GradeAnswerDto {
  @NotNull
  @Min(value = 2)
  @Max(value = 5)
  private Integer grade;
}
