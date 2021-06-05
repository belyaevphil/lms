package com.example.lms.users.dto;

import lombok.Data;

@Data
public class AdminOverviewDto {
  private Integer completedCoursesCount;
  private Integer coursesCount;
  private Integer completedLessonsCount;
  private Integer lessonsCount;
  private Integer completeness;
  private Float averageGrade;
}