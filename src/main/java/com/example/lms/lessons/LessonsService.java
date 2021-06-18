package com.example.lms.lessons;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.lms.courses.dto.CreateLessonDto;
import com.example.lms.courses.entities.Course;
import com.example.lms.courses.entities.StudentCourse;
import com.example.lms.courses.repositories.CoursesRepository;
import com.example.lms.courses.repositories.StudentsCoursesRepository;
import com.example.lms.exceptions.NotFoundException;
import com.example.lms.lessons.dto.AddAnswerDto;
import com.example.lms.lessons.dto.EditLessonDto;
import com.example.lms.lessons.dto.GradeAnswerDto;
import com.example.lms.lessons.dto.TeacherLessonsToGradeDto;
import com.example.lms.lessons.entities.Lesson;
import com.example.lms.lessons.entities.LessonFile;
import com.example.lms.lessons.entities.StudentLesson;
import com.example.lms.lessons.repositories.LessonFileRepository;
import com.example.lms.lessons.repositories.LessonRepository;
import com.example.lms.lessons.repositories.StudentLessonRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LessonsService {
  private final StudentLessonRepository studentLessonRepository;
  private final CoursesRepository coursesRepository;
  private final StudentsCoursesRepository studentsCoursesRepository;
  private final LessonFileRepository lessonFileRepository;
  private final LessonRepository lessonRepository;

  public Lesson get(Long id) {
    return lessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
  }

  public StudentLesson getStudentLesson(Long id) {
    return studentLessonRepository.findByIdWithLessonFiles(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
  }

  public void addAnswer(StudentLesson studentLesson, AddAnswerDto addAnswerDto) {
    studentLesson.setAnswer(addAnswerDto.getAnswer());
    studentLesson.setStatus("ожидается проверка");
    studentLessonRepository.save(studentLesson);
  }

  public void grade(StudentLesson studentLesson, GradeAnswerDto gradeAnswerDto) {
    studentLesson.setGrade(gradeAnswerDto.getGrade());
    studentLesson.setStatus("выполнено");
    studentLessonRepository.save(studentLesson);
  }

  public StudentLesson getTeacherLessonToGrade(Long teacherId, Long lessonId) {
    return studentLessonRepository.findByUserIdAndId(teacherId, lessonId).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
  }

  public TeacherLessonsToGradeDto getTeacherLessonsToGrade(Long teacherId, Long courseId, Pageable pageable) {
    Page<Long> idsPage = studentLessonRepository.findAllIdsByTeacherIdAndCourseIdAndStatus(teacherId, courseId, "ожидается проверка", pageable);
    List<StudentLesson> studentLessons = studentLessonRepository.fetchAllByIds(idsPage.getContent());
    TeacherLessonsToGradeDto teacherLessonsToGradeDto = new TeacherLessonsToGradeDto();
    teacherLessonsToGradeDto.setCurrentPage(pageable.getPageNumber() + 1);
    teacherLessonsToGradeDto.setTotalPages(idsPage.getTotalPages());
    teacherLessonsToGradeDto.setTotalElements(idsPage.getTotalElements());
    teacherLessonsToGradeDto.setStudentLessons(studentLessons);
    return teacherLessonsToGradeDto;
  }

  private void saveLessonFiles(MultipartFile[] files, Lesson lesson) throws IOException {
    List<LessonFile> lessonFiles = new ArrayList<>();
    for (MultipartFile file : files) {
      String path = "./uploads/lessons/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
      Files.copy(file.getInputStream(), Path.of(path), StandardCopyOption.REPLACE_EXISTING);

      LessonFile lessonFile = new LessonFile();
      lessonFile.setLesson(lesson);
      lessonFile.setOriginalName(file.getOriginalFilename());
      lessonFile.setPath(path);
      lessonFiles.add(lessonFile);
    }
    lessonFileRepository.saveAll(lessonFiles);
  }

  private void saveLessonForEachCourseOwner(List<StudentCourse> studentsCourses, Lesson lesson) {
    List<StudentLesson> studentsLessons = studentsCourses.stream().map(studentCourse -> {
      StudentLesson studentLesson = new StudentLesson();
      studentLesson.setStudentCourse(studentCourse);
      studentLesson.setLesson(lesson);
      studentLesson.setStatus("не выполнено");
      return studentLesson;
    }).collect(Collectors.toList());
    studentLessonRepository.saveAll(studentsLessons);
  }

  @Transactional(rollbackFor = Throwable.class)
  public void create(CreateLessonDto createLessonDto, Long courseId) throws IOException {
    Course course = coursesRepository.findById(courseId).orElseThrow(() -> new NotFoundException("Такого курса не найдено"));

    Lesson lesson = new Lesson();
    lesson.setName(createLessonDto.getName());
    lesson.setDescription(createLessonDto.getDescription());
    lesson.setCourse(course);
    lessonRepository.save(lesson);

    List<StudentCourse> studentsCourses = studentsCoursesRepository.findAllByCourseId(courseId);
    if (!studentsCourses.isEmpty()) {
      saveLessonForEachCourseOwner(studentsCourses, lesson);
    }

    // Spring automatically generates 1 file with empty name, if none was present
    MultipartFile[] files = createLessonDto.getFiles();
    String firstFile = files[0].getOriginalFilename();
    if (Objects.isNull(firstFile)) {
      return;
    }
    if (!firstFile.isEmpty()) {
      saveLessonFiles(files, lesson);
    }
  }

  @Transactional(rollbackFor = Throwable.class)
  public void edit(Long id, EditLessonDto editLessonDto) throws IOException {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
    lesson.setName(editLessonDto.getName());
    lesson.setDescription(editLessonDto.getDescription());
    lessonRepository.save(lesson);

    // Spring automatically generates 1 file with empty name, if none was present
    MultipartFile[] files = editLessonDto.getFiles();
    String firstFile = files[0].getOriginalFilename();
    if (Objects.isNull(firstFile)) {
      return;
    }
    if (!firstFile.isEmpty()) {
      saveLessonFiles(files, lesson);
    }
  }
}
