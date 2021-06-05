package com.example.lms.lessons.dto;

import java.util.List;

import com.example.lms.lessons.entities.StudentLesson;

import lombok.Data;

@Data
public class TeacherLessonsToGradeDto {
  private int currentPage;
  private int totalPages;
  private long totalElements;
  private List<StudentLesson> studentLessons;
}
