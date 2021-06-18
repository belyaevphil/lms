package com.example.lms.users;

import com.example.lms.security.UserDetailsImpl;
import com.example.lms.users.dto.AdminOverviewDto;
import com.example.lms.users.dto.ProfileDto;
import com.example.lms.users.dto.StudentOverviewDto;
import com.example.lms.users.dto.TeacherOverviewDto;
import com.example.lms.users.entities.User;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UsersController {
  private final UsersService usersService;

  @GetMapping("/profile")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getProfilePage(@AuthenticationPrincipal UserDetailsImpl principal, Model model) {
    User user = principal.getUserData();
    
    ProfileDto profileDto = new ProfileDto();
    profileDto.setFirstName(user.getFirstName());
    profileDto.setLastName(user.getLastName());
    profileDto.setEmail(user.getEmail());
    profileDto.setPhone(user.getPhone());

    model.addAttribute("profileDto", profileDto);
    return "profile";
  }

  @GetMapping("/overview/student")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentOverviewPage(@AuthenticationPrincipal UserDetailsImpl principal, Model model) {
    Long userId = principal.getUserData().getId();
    StudentOverviewDto studentOverviewDto = usersService.getStudentOverviewData(userId);

    model.addAttribute("studentOverviewDto", studentOverviewDto);
    return "student/overview";
  }

  // @GetMapping("/overview/teacher")
  // @PreAuthorize("hasAuthority('TEACHER')")
  // public String getTeacherOverviewPage(@AuthenticationPrincipal UserDetailsImpl principal, Model model) {
  //   Long userId = principal.getUserData().getId();
  //   TeacherOverviewDto teacherOverviewDto = usersService.getTeacherOverviewData(userId);

  //   model.addAttribute("teacherOverviewDto", teacherOverviewDto);
  //   return "teacher/overview";
  // }

  @GetMapping("/overview/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getAdminOverviewPage(@AuthenticationPrincipal UserDetailsImpl principal, Model model) {
    Long userId = principal.getUserData().getId();
    AdminOverviewDto adminOverviewDto = usersService.getAdminOverviewData(userId);

    model.addAttribute("adminOverviewDto", adminOverviewDto);
    return "admin/overview";
  }
}
