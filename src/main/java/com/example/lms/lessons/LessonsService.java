package com.example.lms.lessons;

import java.util.List;
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
import com.example.lms.lessons.entities.StudentLesson;
import com.example.lms.lessons.repositories.LessonRepository;
import com.example.lms.lessons.repositories.StudentLessonRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LessonsService {
  private final StudentLessonRepository studentLessonRepository;
  private final CoursesRepository coursesRepository;
  private final StudentsCoursesRepository studentsCoursesRepository;
  private final LessonRepository lessonRepository;

  public Lesson get(Long id) {
    return lessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
  }

  public StudentLesson getStudentLesson(Long id) {
    return studentLessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
  }

  public void addAnswer(Long studentLessonId, AddAnswerDto addAnswerDto) {
    StudentLesson studentLesson = studentLessonRepository.findById(studentLessonId)
      .orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
    studentLesson.setAnswer(addAnswerDto.getAnswer());
    studentLesson.setGrade(null);
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

  public TeacherLessonsToGradeDto getTeacherLessonsToGrade(String queryParam, Long teacherId, Pageable pageable) {
    Page<Long> idsPage = studentLessonRepository
      .findAllIdsByLessonNameContainingAndTeacherIdAndStatus(queryParam, teacherId, "ожидается проверка", pageable);
    List<StudentLesson> studentLessons = studentLessonRepository.fetchAllByIds(idsPage.getContent());
    TeacherLessonsToGradeDto teacherLessonsToGradeDto = new TeacherLessonsToGradeDto();
    teacherLessonsToGradeDto.setCurrentPage(pageable.getPageNumber() + 1);
    teacherLessonsToGradeDto.setTotalPages(idsPage.getTotalPages());
    teacherLessonsToGradeDto.setTotalElements(idsPage.getTotalElements());
    teacherLessonsToGradeDto.setStudentLessons(studentLessons);
    return teacherLessonsToGradeDto;
  }

  private void addNewLessonToExistingStudentsCourses(List<StudentCourse> studentsCourses, Lesson lesson) {
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
  public void create(CreateLessonDto createLessonDto, Long courseId) {
    Course course = coursesRepository.findById(courseId).orElseThrow(() -> new NotFoundException("Такого курса не найдено"));

    Lesson lesson = new Lesson();
    lesson.setName(createLessonDto.getName());
    lesson.setDescription(createLessonDto.getDescription());
    lesson.setCourse(course);
    lessonRepository.save(lesson);

    List<StudentCourse> studentsCourses = studentsCoursesRepository.findAllByCourseId(courseId);
    if (!studentsCourses.isEmpty()) {
      addNewLessonToExistingStudentsCourses(studentsCourses, lesson);
    }
  }

  @Transactional(rollbackFor = Throwable.class)
  public void edit(Long id, EditLessonDto editLessonDto) {
    Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого урока не найдено"));
    lesson.setName(editLessonDto.getName());
    lesson.setDescription(editLessonDto.getDescription());
    lessonRepository.save(lesson);
  }
}
