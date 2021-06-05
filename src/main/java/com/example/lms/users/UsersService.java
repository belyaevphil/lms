package com.example.lms.users;

import com.example.lms.users.dto.AdminOverviewDto;
import com.example.lms.users.dto.StudentOverviewDto;
import com.example.lms.users.dto.TeacherOverviewDto;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {
  public StudentOverviewDto getStudentOverviewData(Long userId) {
    StudentOverviewDto studentOverviewDto = new StudentOverviewDto();
    return studentOverviewDto;
  }

  public TeacherOverviewDto getTeacherOverviewData(Long userId) {
    TeacherOverviewDto teacherOverviewDto = new TeacherOverviewDto();
    return teacherOverviewDto;
  }

  public AdminOverviewDto getAdminOverviewData(Long userId) {
    AdminOverviewDto adminOverviewDto = new AdminOverviewDto();
    return adminOverviewDto;
  }
}
