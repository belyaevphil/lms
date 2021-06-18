package com.example.lms.users.dto;

import lombok.Data;

@Data
public class StudentOverviewDto {
  private Integer coursesCount;
  private Integer completedCoursesCount;
  private Integer inProgressCoursesCount;
  private Integer lessonsCount;
  private Integer completedLessonsCount;
  private Integer idlingLessonsCount;
  private Float averageGrade;
}