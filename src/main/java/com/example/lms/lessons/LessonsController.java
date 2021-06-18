package com.example.lms.lessons;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.file.Path;

import javax.validation.Valid;

import com.example.lms.lessons.dto.AddAnswerDto;
import com.example.lms.lessons.dto.EditLessonDto;
import com.example.lms.lessons.dto.GradeAnswerDto;
import com.example.lms.lessons.dto.TeacherLessonsToGradeDto;
import com.example.lms.lessons.entities.Lesson;
import com.example.lms.lessons.entities.StudentLesson;
import com.example.lms.security.UserDetailsImpl;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LessonsController {
  private final LessonsService lessonsService;

  @GetMapping("/download")
  @PreAuthorize("hasAuthority('STUDENT')")
  public ResponseEntity<Resource> downloadFile(
    @RequestParam("path") String path,
    @RequestParam("name") String name
  ) throws MalformedURLException, UnsupportedEncodingException {
    Path filePath = Path.of(path);
    Resource resource = new UrlResource(filePath.toUri());
    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType("application/octet-stream"))
      .header("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(name, "UTF-8") + "\"")
      .body(resource);
  }

  @GetMapping("/lessons/teacher/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLesson(@PathVariable("id") Long id, Model model) {
    Lesson lesson = lessonsService.get(id);
    EditLessonDto editLessonDto = new EditLessonDto();
    editLessonDto.setName(lesson.getName());
    editLessonDto.setDescription(lesson.getDescription());

    model.addAttribute("lesson", lesson);
    model.addAttribute("editLessonDto", editLessonDto);
    return "teacher/lesson";
  }

  @PostMapping("/lessons/teacher/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String edit(@PathVariable("id") Long id, @Valid EditLessonDto editLessonDto, BindingResult bindingResult, Model model) {
    Lesson lesson = lessonsService.get(id);

    if (bindingResult.hasErrors()) {
      model.addAttribute("lesson", lesson);
      return "teacher/lesson";
    }

    try {
      lessonsService.edit(id, editLessonDto);
    } catch (Exception e) {
      model.addAttribute("lesson", lesson);
      model.addAttribute("error", e.getMessage());
      return "teacher/lesson";
    }

    model.addAttribute("lesson", lesson);
    model.addAttribute("success", "Урок был отредактирован успешно");
    return "teacher/lesson";
  }

  @GetMapping("/lessons/teacher/{id}/grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLessonToGrade(@AuthenticationPrincipal UserDetailsImpl principal, @PathVariable("id") Long id, Model model) {
    Long teacherId = principal.getUserData().getId();
    StudentLesson teacherLessonToGrade = lessonsService.getTeacherLessonToGrade(teacherId, id);
    GradeAnswerDto gradeAnswerDto = new GradeAnswerDto();
    int gradePlaceholder = 5;
    gradeAnswerDto.setGrade(gradePlaceholder);

    model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
    model.addAttribute("gradeAnswerDto", gradeAnswerDto);
    return "teacher/lessonToGrade";
  }

  @PostMapping("/lessons/teacher/{id}/grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String grade(
    @AuthenticationPrincipal UserDetailsImpl principal,
    @PathVariable("id") Long id,
    @Valid GradeAnswerDto gradeAnswerDto,
    BindingResult bindingResult,
    Model model
  ) {
    Long teacherId = principal.getUserData().getId();
    StudentLesson teacherLessonToGrade = lessonsService.getTeacherLessonToGrade(teacherId, id);

    if (bindingResult.hasErrors()) {
      model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
      return "teacher/lessonToGrade";
    }

    try {
      lessonsService.grade(teacherLessonToGrade, gradeAnswerDto);
    } catch (Exception e) {
      model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
      model.addAttribute("error", e.getMessage());
      return "teacher/lessonToGrade";
    }

    model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
    model.addAttribute("success", "Оценка была выставлена успешно");
    return "teacher/lessonToGrade";
  }

  @GetMapping("/courses/teacher/{id}/grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLessonsToGrade(
    @AuthenticationPrincipal UserDetailsImpl principal,
    Pageable pageable,
    @PathVariable("id") Long courseId,
    Model model
  ) {
    Long teacherId = principal.getUserData().getId();
    TeacherLessonsToGradeDto teacherLessonsToGradeDto = lessonsService.getTeacherLessonsToGrade(teacherId, courseId, pageable);

    model.addAttribute("currentPage", teacherLessonsToGradeDto.getCurrentPage());
    model.addAttribute("totalPages", teacherLessonsToGradeDto.getTotalPages());
    model.addAttribute("totalElements", teacherLessonsToGradeDto.getTotalElements());
    model.addAttribute("teacherLessonsToGrade", teacherLessonsToGradeDto.getStudentLessons());
    return "teacher/lessonsToGrade";
  }

  @GetMapping("/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentLesson(@PathVariable("id") Long id, Model model) {
    StudentLesson studentLesson = lessonsService.getStudentLesson(id);
    AddAnswerDto addAnswerDto = new AddAnswerDto();
    addAnswerDto.setAnswer(studentLesson.getAnswer());

    model.addAttribute("studentLesson", studentLesson);
    model.addAttribute("addAnswerDto", addAnswerDto);
    return "student/lesson";
  }

  @PostMapping("/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String addAnswer(
    @PathVariable("id") Long id,
    @Valid AddAnswerDto addAnswerDto,
    BindingResult bindingResult,
    Model model
  ) {
    StudentLesson studentLesson = lessonsService.getStudentLesson(id);

    if (bindingResult.hasErrors()) {
      model.addAttribute("studentLesson", studentLesson);
      return "student/lesson";
    }

    try {
      lessonsService.addAnswer(studentLesson, addAnswerDto);
    } catch (Exception e) {
      model.addAttribute("studentLesson", studentLesson);
      model.addAttribute("error", e.getMessage());
      return "student/lesson";
    }

    model.addAttribute("studentLesson", studentLesson);
    model.addAttribute("success", "Ответ был добавлен успешно");
    return "student/lesson";
  }
}
