package com.example.lms.lessons;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.validation.Valid;

import com.example.lms.lessons.dto.AddAnswerDto;
import com.example.lms.lessons.dto.EditLessonDto;
import com.example.lms.lessons.dto.GradeAnswerDto;
import com.example.lms.lessons.dto.TeacherLessonsToGradeDto;
import com.example.lms.lessons.entities.Lesson;
import com.example.lms.lessons.entities.StudentLesson;
import com.example.lms.security.UserDetailsImpl;

import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LessonsController {
  private final LessonsService lessonsService;

  @GetMapping("/teacher/lessons/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLesson(@PathVariable("id") Long id, Model model) {
    Lesson lesson = lessonsService.get(id);
    EditLessonDto editLessonDto = new EditLessonDto();
    editLessonDto.setName(lesson.getName());
    editLessonDto.setDescription(lesson.getDescription());

    model.addAttribute("lesson", lesson);
    model.addAttribute("editLessonDto", editLessonDto);
    model.addAttribute("org.springframework.validation.BindingResult.editLessonDto", model.asMap().get("editLessonDtoBindingResult"));
    return "teacher/lesson";
  }

  @PostMapping("/teacher/lessons/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String edit(
    @PathVariable("id") Long id,
    @Valid EditLessonDto editLessonDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("editLessonDtoBindingResult", bindingResult);
        return "redirect:/teacher/lessons/" + id;
      }

      lessonsService.edit(id, editLessonDto);

      redirectAttributes.addFlashAttribute("success", "Урок был отредактирован успешно");
      return "redirect:/teacher/lessons/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/teacher/lessons/" + id;
    }
  }

  @GetMapping("/teacher/lessons-to-grade/{lessonId}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLessonToGrade(@AuthenticationPrincipal UserDetailsImpl principal, @PathVariable Long lessonId, Model model) {
    Long teacherId = principal.getUserData().getId();
    StudentLesson teacherLessonToGrade = lessonsService.getTeacherLessonToGrade(teacherId, lessonId);
    GradeAnswerDto gradeAnswerDto = new GradeAnswerDto();
    int gradePlaceholder = 5;
    gradeAnswerDto.setGrade(gradePlaceholder);

    model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
    model.addAttribute("gradeAnswerDto", gradeAnswerDto);
    model.addAttribute("org.springframework.validation.BindingResult.gradeAnswerDto", model.asMap().get("gradeAnswerDtoBindingResult"));
    return "teacher/lessonToGrade";
  }

  @PostMapping("/teacher/lessons-to-grade/{lessonId}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String grade(
    @AuthenticationPrincipal UserDetailsImpl principal,
    @PathVariable Long lessonId,
    @Valid GradeAnswerDto gradeAnswerDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("gradeAnswerDtoBindingResult", bindingResult);
        return "redirect:/teacher/lessons-to-grade/" + lessonId;
      }

      Long teacherId = principal.getUserData().getId();
      StudentLesson teacherLessonToGrade = lessonsService.getTeacherLessonToGrade(teacherId, lessonId);

      lessonsService.grade(teacherLessonToGrade, gradeAnswerDto);

      redirectAttributes.addFlashAttribute("success", "Оценка была выставлена успешно");
      return "redirect:/teacher/lessons-to-grade/" + lessonId;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/teacher/lessons-to-grade/" + lessonId;
    }
  }

  @GetMapping("/teacher/lessons-to-grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLessonsToGrade(
    @AuthenticationPrincipal UserDetailsImpl principal,
    Pageable pageable,
    @RequestParam(required = false) String query,
    Model model
  ) {
    String queryParam = query != null ? query : "";
    Long teacherId = principal.getUserData().getId();
    TeacherLessonsToGradeDto teacherLessonsToGradeDto = lessonsService.getTeacherLessonsToGrade(queryParam, teacherId, pageable);

    model.addAttribute("currentPage", teacherLessonsToGradeDto.getCurrentPage());
    model.addAttribute("totalPages", teacherLessonsToGradeDto.getTotalPages());
    model.addAttribute("totalElements", teacherLessonsToGradeDto.getTotalElements());
    model.addAttribute("teacherLessonsToGrade", teacherLessonsToGradeDto.getStudentLessons());
    model.addAttribute("query", query);
    return "teacher/lessonsToGrade";
  }

  @PostMapping("/teacher/lessons-to-grade")
  public String setTeacherLessonsToGradeFilter(@RequestParam(required = false) String queryFilter) throws UnsupportedEncodingException {
    String queryParam = queryFilter.equals("") ? "" : "?query=" + URLEncoder.encode(queryFilter, "UTF-8");
    return "redirect:/teacher/lessons-to-grade" + queryParam;
  }

  @GetMapping("/student/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentLesson(@PathVariable("id") Long id, Model model) {
    StudentLesson studentLesson = lessonsService.getStudentLesson(id);
    AddAnswerDto addAnswerDto = new AddAnswerDto();
    addAnswerDto.setAnswer(studentLesson.getAnswer());

    model.addAttribute("studentLesson", studentLesson);
    model.addAttribute("addAnswerDto", addAnswerDto);
    model.addAttribute("org.springframework.validation.BindingResult.addAnswerDto", model.asMap().get("addAnswerDtoBindingResult"));
    return "student/lesson";
  }

  @PostMapping("/student/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String addAnswer(
    @PathVariable("id") Long id,
    @Valid AddAnswerDto addAnswerDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("addAnswerDtoBindingResult", bindingResult);
        return "redirect:/student/lessons/" + id;
      }

      lessonsService.addAnswer(id, addAnswerDto);

      redirectAttributes.addFlashAttribute("success", "Ответ был добавлен успешно");
      return "redirect:/student/lessons/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/student/lessons/" + id;
    }
  }
}
