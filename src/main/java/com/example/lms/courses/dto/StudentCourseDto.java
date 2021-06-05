package com.example.lms.courses.dto;

import com.example.lms.courses.entities.StudentCourse;

import lombok.Data;

@Data
public class StudentCourseDto {
  private Integer completedLessonsCount;
  private Integer lessonsCount;
  private Integer completeness;
  private Float averageGrade;
  private StudentCourse studentCourse;
}
