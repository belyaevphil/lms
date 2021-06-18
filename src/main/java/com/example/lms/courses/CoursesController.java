package com.example.lms.courses;

import java.util.List;

import javax.validation.Valid;

import com.example.lms.courses.dto.AssignCourseDto;
import com.example.lms.courses.dto.AssignTeacherDto;
import com.example.lms.courses.dto.CreateCourseDto;
import com.example.lms.courses.dto.CreateLessonDto;
import com.example.lms.courses.dto.StudentCourseDto;
import com.example.lms.courses.dto.StudentCoursesDto;
import com.example.lms.courses.entities.Course;
import com.example.lms.lessons.LessonsService;
import com.example.lms.security.UserDetailsImpl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CoursesController {
  private final CoursesService coursesService;
  private final LessonsService lessonsService;

  @GetMapping("/courses/teacher/{id}/create/lesson")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getCreateLessonPage(CreateLessonDto createLessonDto) {
    return "teacher/createLesson";
  }

  @PostMapping("/courses/teacher/{id}/create/lesson")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String createLesson(@PathVariable("id") Long id, @Valid CreateLessonDto createLessonDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "teacher/createLesson";
    }

    try {
      lessonsService.create(createLessonDto, id);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "teacher/createLesson";
    }

    model.addAttribute("success", "Урок был создан успешно");
    return "teacher/createLesson";
  }

  @GetMapping("/courses/teacher/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherCourse(@PathVariable("id") Long id, Model model) {
    Course teacherCourse = coursesService.getTeacherCourse(id);

    model.addAttribute("teacherCourse", teacherCourse);
    return "teacher/course";
  }

  @GetMapping("/courses/teacher")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherCourses(@AuthenticationPrincipal UserDetailsImpl principal, Pageable pageable, Model model) {
    Long teacherId = principal.getUserData().getId();
    Page<Course> teacherCoursesPage = coursesService.getTeacherCourses(teacherId, pageable);

    model.addAttribute("currentPage", pageable.getPageNumber() + 1);
    model.addAttribute("totalPages", teacherCoursesPage.getTotalPages());
    model.addAttribute("totalElements", teacherCoursesPage.getTotalElements());
    model.addAttribute("teacherCourses", teacherCoursesPage.getContent());
    return "teacher/courses";
  }

  @GetMapping("/courses/student/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentCourse(@PathVariable("id") Long id, Model model) {
    StudentCourseDto studentCourseDto = coursesService.getStudentCourse(id);

    model.addAttribute("studentCourseDto", studentCourseDto);
    return "student/course";
  }

  @GetMapping("/courses/student")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentCourses(@AuthenticationPrincipal UserDetailsImpl principal, Pageable pageable, Model model) {
    Long studentId = principal.getUserData().getId();
    StudentCoursesDto studentCoursesDto = coursesService.getStudentCourses(studentId, pageable);

    model.addAttribute("currentPage", studentCoursesDto.getCurrentPage());
    model.addAttribute("totalPages", studentCoursesDto.getTotalPages());
    model.addAttribute("totalElements", studentCoursesDto.getTotalElements());
    model.addAttribute("studentCoursesDto", studentCoursesDto.getStudentCourseDtos());
    return "student/courses";
  }

  @GetMapping("/courses/create")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getCreatePage(CreateCourseDto createCourseDto) {
    return "admin/createCourse";
  }

  @PostMapping("/courses/create")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String create(@Valid CreateCourseDto createCourseDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "admin/createCourse";
    }

    try {
      coursesService.create(createCourseDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "admin/createCourse";
    }

    model.addAttribute("success", "Курс был создан успешно");
    return "admin/createCourse";
  }

  @GetMapping("/courses/assign")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getAssignPage(AssignCourseDto assignCourseDto) {
    return "admin/assignCourse";
  }

  @PostMapping("/courses/assign")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String assign(@Valid AssignCourseDto assignCourseDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "admin/assignCourse";
    }

    try {
      coursesService.assign(assignCourseDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "admin/assignCourse";
    }

    model.addAttribute("success", "Курс был назначен успешно");
    return "admin/assignCourse";
  }

  @GetMapping("/courses/assign/teacher")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getAssignTeacherPage(AssignTeacherDto assignTeacherDto) {
    return "admin/assignTeacher";
  }

  @PostMapping("/courses/assign/teacher")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String assignTeacher(@Valid AssignTeacherDto assignTeacherDto, BindingResult bindingResult, Model model) {
    if (bindingResult.hasErrors()) {
      return "admin/assignTeacher";
    }

    try {
      coursesService.assignTeacher(assignTeacherDto);
    } catch (Exception e) {
      model.addAttribute("error", e.getMessage());
      return "admin/assignTeacher";
    }

    model.addAttribute("success", "Преподаватель был назначен успешно");
    return "admin/assignTeacher";
  }

  @GetMapping("/")
  public String getIndexPage(Model model) {
    List<Course> courses = coursesService.getCourses();

    model.addAttribute("courses", courses);
    return "index";
  }

  @GetMapping("/courses/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getCourse(@PathVariable("id") Long id, Model model) {
    Course course = coursesService.getCourse(id);

    model.addAttribute("course", course);
    return "course";
  }
}
