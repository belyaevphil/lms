package com.example.lms.auth;

import javax.validation.Valid;

import com.example.lms.auth.dto.SignupDto;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @GetMapping("/signin")
  public String getSignin(SignupDto signupDto) {
    return "signin";
  }

  @GetMapping("/signup")
  public String getSignup(SignupDto signupDto) {
    return "signup";
  }

  @PostMapping("/signup")
  public String postSignup(@Valid SignupDto signupDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "signup";
    }
  
    try {
      authService.signup(signupDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "signup";
    }

    model.addAttribute("success", "Аккаунт был создан успешно");
    return "signup";
  }
}
