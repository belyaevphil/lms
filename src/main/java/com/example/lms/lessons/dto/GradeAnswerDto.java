package com.example.lms.lessons.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class GradeAnswerDto {
  @NotEmpty
  @Size(min = 2, max = 5)
  private Integer grade;
}
