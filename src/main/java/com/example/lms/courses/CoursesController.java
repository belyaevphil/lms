package com.example.lms.courses;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.validation.Valid;

import com.example.lms.courses.dto.AssignCourseDto;
import com.example.lms.courses.dto.AssignTeacherDto;
import com.example.lms.courses.dto.ChangeCourseImageDto;
import com.example.lms.courses.dto.CreateCourseDto;
import com.example.lms.courses.dto.CreateLessonDto;
import com.example.lms.courses.dto.EditCourseDto;
import com.example.lms.courses.dto.EditCourseNoteDto;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CoursesController {
  private final CoursesService coursesService;
  private final LessonsService lessonsService;

  @GetMapping("/teacher/courses/{id}/create-lesson")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getCreateLessonPage(CreateLessonDto createLessonDto, Model model) {
    model.addAttribute("org.springframework.validation.BindingResult.createLessonDto", model.asMap().get("createLessonDtoBindingResult"));

    return "teacher/createLesson";
  }

  @PostMapping("/teacher/courses/{id}/create-lesson")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String createLesson(
    @PathVariable("id") Long id,
    @Valid CreateLessonDto createLessonDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("createLessonDtoBindingResult", bindingResult);
        return "redirect:/courses/teacher/" + id + "/create-lesson";
      }

      lessonsService.create(createLessonDto, id);

      redirectAttributes.addFlashAttribute("success", "Урок был создан успешно");
      return "redirect:/courses/teacher/" + id + "/create-lesson";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/teacher/" + id + "/create-lesson";
    }
  }

  @GetMapping("/teacher/courses/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String getTeacherCourse(@PathVariable("id") Long id, Model model) {
    Course teacherCourse = coursesService.getTeacherCourse(id);

    EditCourseNoteDto editCourseNoteDto = new EditCourseNoteDto();
    editCourseNoteDto.setNote(teacherCourse.getNote());

    model.addAttribute("teacherCourse", teacherCourse);
    model.addAttribute("editCourseNoteDto", editCourseNoteDto);
    model.addAttribute("org.springframework.validation.BindingResult.editCourseNoteDto", model.asMap().get("editCourseNoteDtoBindingResult"));
    return "teacher/course";
  }

  @PostMapping("/teacher/courses/{id}")
  @PreAuthorize("hasAuthority('TEACHER')")
  public String editCourseNote(
    @PathVariable("id") Long id,
    @Valid EditCourseNoteDto editCourseNoteDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("editCourseNoteDtoBindingResult", bindingResult);
        return "redirect:/courses/teacher/" + id;
      }

      coursesService.editCourseNote(id, editCourseNoteDto);

      redirectAttributes.addFlashAttribute("success", "Описание было редактировано успешно");
      return "redirect:/courses/teacher/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/teacher/" + id;
    }
  }

  @GetMapping("/teacher/courses")
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

  @GetMapping("/student/courses/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentCourse(@PathVariable("id") Long id, Model model) {
    StudentCourseDto studentCourseDto = coursesService.getStudentCourse(id);

    model.addAttribute("studentCourseDto", studentCourseDto);
    return "student/course";
  }

  @GetMapping("/student/courses")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getStudentCourses(
    @AuthenticationPrincipal UserDetailsImpl principal,
    Pageable pageable,
    @RequestParam(required = false) String query,
    Model model
  ) {
    String queryParam = query != null ? query : "";
    Long studentId = principal.getUserData().getId();
    StudentCoursesDto studentCoursesDto = coursesService.getStudentCourses(queryParam, studentId, pageable);

    model.addAttribute("currentPage", studentCoursesDto.getCurrentPage());
    model.addAttribute("totalPages", studentCoursesDto.getTotalPages());
    model.addAttribute("totalElements", studentCoursesDto.getTotalElements());
    model.addAttribute("studentCoursesDto", studentCoursesDto.getStudentCourseDtos());
    model.addAttribute("query", query);
    return "student/courses";
  }

  @PostMapping("/student/courses")
  public String setStudentCoursesFilter(@RequestParam(required = false) String queryFilter) throws UnsupportedEncodingException {
    String queryParam = queryFilter.equals("") ? "" : "?query=" + URLEncoder.encode(queryFilter, "UTF-8");
    return "redirect:/student/courses" + queryParam;
  }

  @GetMapping("/courses/create")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getCreateCoursePage(Model model) {
    CreateCourseDto createCourseDto = new CreateCourseDto();

    model.addAttribute("createCourseDto", createCourseDto);
    model.addAttribute("org.springframework.validation.BindingResult.createCourseDto", model.asMap().get("createCourseDtoBindingResult"));
    return "admin/createCourse";
  }

  @PostMapping("/courses/create")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String create(
    @Valid CreateCourseDto createCourseDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("createCourseDtoBindingResult", bindingResult);
        return "redirect:/courses/create";
      }

      coursesService.create(createCourseDto);

      redirectAttributes.addFlashAttribute("success", "Курс был создан успешно");
      return "redirect:/courses/create";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/create";
    }
  }

  @GetMapping("/courses/assign")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getAssignCoursePage(AssignCourseDto assignCourseDto, Model model) {
    model.addAttribute("org.springframework.validation.BindingResult.assignCourseDto", model.asMap().get("assignCourseDtoBindingResult"));
    return "admin/assignCourse";
  }

  @PostMapping("/courses/assign")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String assign(@Valid AssignCourseDto assignCourseDto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("assignCourseDtoBindingResult", bindingResult);
        return "redirect:/courses/assign";
      }

      coursesService.assign(assignCourseDto);

      redirectAttributes.addFlashAttribute("success", "Курс был назначен успешно");
      return "redirect:/courses/assign";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/assign";
    }
  }

  @GetMapping("/courses/assign/teacher")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String getAssignTeacherPage(AssignTeacherDto assignTeacherDto, Model model) {
    model.addAttribute("org.springframework.validation.BindingResult.assignTeacherDto", model.asMap().get("assignTeacherDtoBindingResult"));
    return "admin/assignTeacher";
  }

  @PostMapping("/courses/assign/teacher")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String assignTeacher(@Valid AssignTeacherDto assignTeacherDto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("assignTeacherDtoBindingResult", bindingResult);
        return "redirect:/courses/assign/teacher";
      }

      coursesService.assignTeacher(assignTeacherDto);

      redirectAttributes.addFlashAttribute("success", "Преподаватель был назначен успешно");
      return "redirect:/courses/assign/teacher";
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/assign/teacher";
    }
  }

  @GetMapping("/")
  public String getIndexPage(Pageable pageable, @RequestParam(required = false) String query, Model model) {
    String queryParam = query != null ? query : "";
    Page<Course> coursesPage = coursesService.getCourses(queryParam, pageable);

    model.addAttribute("currentPage", pageable.getPageNumber() + 1);
    model.addAttribute("totalPages", coursesPage.getTotalPages());
    model.addAttribute("totalElements", coursesPage.getTotalElements());
    model.addAttribute("courses", coursesPage.getContent());
    model.addAttribute("query", query);
    return "index";
  }

  @PostMapping("/")
  public String setCoursesFilter(@RequestParam(required = false) String queryFilter) throws UnsupportedEncodingException {
    String queryParam = queryFilter.equals("") ? "" : "?query=" + URLEncoder.encode(queryFilter, "UTF-8");
    return "redirect:/" + queryParam;
  }

  @GetMapping("/courses/{id}")
  @PreAuthorize("hasAuthority('STUDENT')")
  public String getCourse(@PathVariable("id") Long id, Model model) {
    Course course = coursesService.getCourse(id);

    EditCourseDto editCourseDto = new EditCourseDto();
    editCourseDto.setVendorCode(course.getVendorCode());
    editCourseDto.setPrice(course.getPrice());
    editCourseDto.setDescription(course.getDescription());

    ChangeCourseImageDto changeCourseImageDto = new ChangeCourseImageDto();

    model.addAttribute("course", course);
    model.addAttribute("editCourseDto", editCourseDto);
    model.addAttribute("changeCourseImageDto", changeCourseImageDto);
    model.addAttribute("org.springframework.validation.BindingResult.editCourseDto", model.asMap().get("editCourseDtoBindingResult"));
    model.addAttribute("org.springframework.validation.BindingResult.changeCourseImageDto", model.asMap().get("changeCourseImageDtoBindingResult"));
    return "course";
  }

  @PostMapping("/courses/{id}")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String editCourse(
    @PathVariable("id") Long id,
    @Valid EditCourseDto editCourseDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("editCourseDtoBindingResult", bindingResult);
        return "redirect:/courses/" + id;
      }

      coursesService.editCourse(id, editCourseDto);

      redirectAttributes.addFlashAttribute("success", "Курс был редактирован успешно");
      return "redirect:/courses/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/" + id;
    }
  }

  @PostMapping("/courses/{id}/change/image")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String changeCourseImage(
    @PathVariable("id") Long id,
    @Valid ChangeCourseImageDto changeCourseImageDto,
    BindingResult bindingResult,
    RedirectAttributes redirectAttributes
  ) {
    try {
      if (bindingResult.hasErrors()) {
        redirectAttributes.addFlashAttribute("changeCourseImageDtoBindingResult", bindingResult);
        return "redirect:/courses/" + id;
      }

      coursesService.changeCourseImage(id, changeCourseImageDto);

      redirectAttributes.addFlashAttribute("success", "Изображение было изменено успешно");
      return "redirect:/courses/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/" + id;
    }
  }

  @PostMapping("/courses/{id}/delete/image")
  @PreAuthorize("hasAuthority('ADMIN')")
  public String deleteCourseImage(
    @PathVariable("id") Long id,
    RedirectAttributes redirectAttributes
  ) {
    try {
      coursesService.deleteCourseImage(id);

      redirectAttributes.addFlashAttribute("success", "Изображение было удалено успешно");
      return "redirect:/courses/" + id;
    } catch (Exception e) {
      redirectAttributes.addFlashAttribute("error", e.getMessage());
      return "redirect:/courses/" + id;
    }
  }
}
