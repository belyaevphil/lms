package com.example.lms.courses.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CreateCourseDto implements Serializable {
  @NotEmpty
  private String name;

  @NotNull
  private Integer vendorCode;

  @NotNull
  private Integer price;

  @NotEmpty
  private String description;

  private MultipartFile image;
}
