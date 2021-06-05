package com.example.lms.users.dto;

import lombok.Data;

@Data
public class TeacherOverviewDto {
  private Integer coursesCount;
  private Integer lessonsCount;
  private Integer completeness;
  private Float averageGrade;
}