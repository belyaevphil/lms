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

    model.addAttribute("editLessonDto", editLessonDto);
    return "teacherLesson";
  }

  @PostMapping("/lessons/teacher/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String edit(@PathVariable("id") Long id, @Valid EditLessonDto editLessonDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "teacherLesson";
    }

    try {
      lessonsService.edit(id, editLessonDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "teacherLesson";
    }

    model.addAttribute("success", "Урок был отредактирован успешно");
    return "teacherLesson";
  }

  @GetMapping("/lessons/teacher/{id}/grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherLessonToGrade(@AuthenticationPrincipal UserDetailsImpl principal, @PathVariable("id") Long id, Model model) {
    Long teacherId = principal.getUserData().getId();
    StudentLesson teacherLessonToGrade = lessonsService.getTeacherLessonToGrade(teacherId, id);
    GradeAnswerDto gradeAnswerDto = new GradeAnswerDto();
    gradeAnswerDto.setGrade(5);

    model.addAttribute("teacherLessonToGrade", teacherLessonToGrade);
    model.addAttribute("gradeAnswerDto", gradeAnswerDto);
    return "teacherLessonToGrade";
  }

  @PostMapping("/lessons/teacher/{id}/grade")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String grade(@Valid GradeAnswerDto gradeAnswerDto, BindingResult bindingResult, @PathVariable("id") Long id, Model model) {
    if (bindingResult.hasErrors()) {
      return "teacherLessonToGrade";
    }

    try {
      lessonsService.grade(id, gradeAnswerDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "teacherLessonToGrade";
    }

    model.addAttribute("success", "Оценка была выставлена успешно");
    return "teacherLessonToGrade";
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
    return "teacherLessonsToGrade";
  }

  @GetMapping("/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentLesson(@PathVariable("id") Long id, Model model) {
    StudentLesson studentLesson = lessonsService.getStudentLesson(id);
    AddAnswerDto addAnswerDto = new AddAnswerDto();
    addAnswerDto.setAnswer(studentLesson.getAnswer());

    model.addAttribute("studentLesson", studentLesson);
    model.addAttribute("addAnswerDto", addAnswerDto);
    return "studentLesson";
  }

  @PostMapping("/lessons/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String addAnswer(@PathVariable("id") Long id, @Valid AddAnswerDto addAnswerDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "studentLesson";
    }

    try {
      lessonsService.addAnswer(id, addAnswerDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "studentLesson";
    }

    model.addAttribute("success", "Ответ был добавлен успешно");
    return "studentLesson";
  }
}
