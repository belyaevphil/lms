package com.example.lms.auth;

import javax.validation.Valid;

import com.example.lms.auth.dto.SignupDto;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @GetMapping("/signin")
  public String getSignin() {
    return "signin";
  }

  @GetMapping("/signup")
  public String getSignup(SignupDto signupDto, Model model) {
    model.addAttribute("org.springframework.validation.BindingResult.signupDto", model.asMap().get("signupDtoBindingResult"));

    return "signup";
  }

  @PostMapping("/signup")
  public String postSignup(@Valid SignupDto signupDto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("signupDtoBindingResult", bindingResult);
        return "redirect:/signup";
      }

      authService.signup(signupDto);

      redirectAttributes.addFlashAttribute("success", "Аккаунт был создан успешно");
      return "redirect:/signup";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/signup";
    }
  }
}
