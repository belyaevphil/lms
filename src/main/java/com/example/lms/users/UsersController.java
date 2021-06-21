package com.example.lms.users;

import javax.validation.Valid;

import com.example.lms.security.UserDetailsImpl;
import com.example.lms.users.dto.AdminOverviewDto;
import com.example.lms.users.dto.ChangeProfileImageDto;
import com.example.lms.users.dto.EditProfileDto;
import com.example.lms.users.dto.StudentOverviewDto;
import com.example.lms.users.dto.TeacherOverviewDto;
import com.example.lms.users.entities.User;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UsersController {
  private final UsersService usersService;

  @GetMapping("/profile")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getProfilePage(@AuthenticationPrincipal UserDetailsImpl principal, Model model) {
    User user = principal.getUserData();
    
    EditProfileDto editProfileDto = new EditProfileDto();
    editProfileDto.setFirstName(user.getFirstName());
    editProfileDto.setLastName(user.getLastName());
    editProfileDto.setEmail(user.getEmail());
    editProfileDto.setPhone(user.getPhone());

    ChangeProfileImageDto changeProfileImageDto = new ChangeProfileImageDto();

    model.addAttribute("editProfileDto", editProfileDto);
    model.addAttribute("changeProfileImageDto", changeProfileImageDto);
    model.addAttribute("imageUrl", user.getImageUrl());
    model.addAttribute("org.springframework.validation.BindingResult.editProfileDto", model.asMap().get("editProfileDtoBindingResult"));
    model.addAttribute("org.springframework.validation.BindingResult.changeProfileImageDto", model.asMap().get("changeProfileImageDtoBindingResult"));
    return "student/profile";
  }

  @PostMapping("/profile")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String editProfileData(
    @AuthenticationPrincipal UserDetailsImpl principal,
    ChangeProfileImageDto changeProfileImageDto,
    @Valid EditProfileDto editProfileDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("editProfileDtoBindingResult", bindingResult);
        return "redirect:/profile";
      }

      User user = principal.getUserData();

      usersService.editProfileData(user, editProfileDto);

      redirectAttributes.addFlashAttribute("success", "Профиль был обновлен успешно");
      return "redirect:/profile";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/profile";
    }
  }

  @PostMapping("/profile/change/image")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String changeProfileImage(
    @AuthenticationPrincipal UserDetailsImpl principal,
    @Valid ChangeProfileImageDto changeProfileImageDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("changeProfileImageDtoBindingResult", bindingResult);
        return "redirect:/profile";
      }

      User user = principal.getUserData();

      usersService.changeProfileImage(user, changeProfileImageDto);

      redirectAttributes.addFlashAttribute("success", "Изображение было изменено успешно");
      return "redirect:/profile";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/profile";
    }
  }

  @PostMapping("/profile/delete/image")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String deleteProfileImage(
    @AuthenticationPrincipal UserDetailsImpl principal,
    RedirectAttributes redirectAttributes
  ) {
    try {
      User user = principal.getUserData();

      usersService.deleteProfileImage(user);

      redirectAttributes.addFlashAttribute("success", "Изображение было удалено успешно");
      return "redirect:/profile";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/profile";
    }
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
