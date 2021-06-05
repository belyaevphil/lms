package com.example.lms.courses.dto;

import java.util.List;

import lombok.Data;

@Data
public class StudentCoursesDto {
  private int currentPage;
  private int totalPages;
  private long totalElements;
  private List<StudentCourseDto> studentCourseDtos;
}