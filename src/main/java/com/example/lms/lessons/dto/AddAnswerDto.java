package com.example.lms.lessons.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class AddAnswerDto {
  @NotEmpty
  private String answer;
}
