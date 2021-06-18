package com.example.lms.users;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.example.lms.courses.entities.Course;
import com.example.lms.courses.entities.StudentCourse;
import com.example.lms.courses.repositories.StudentsCoursesRepository;
import com.example.lms.lessons.entities.Lesson;
import com.example.lms.users.dto.AdminOverviewDto;
import com.example.lms.users.dto.StudentOverviewDto;
import com.example.lms.users.dto.TeacherOverviewDto;
import com.example.lms.users.entities.Teacher;
import com.example.lms.users.repositories.TeachersRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {
  private final StudentsCoursesRepository studentsCoursesRepository;
  private final TeachersRepository teachersRepository;

  public StudentOverviewDto getStudentOverviewData(Long studentId) {
    List<StudentCourse> studentCourses = studentsCoursesRepository.fetchAllByStudentId(studentId);

    int coursesCount = studentCourses.size();

    int completedCoursesCount = studentCourses.stream().filter(studentCourse -> {
      int completedLessonsCount = studentCourse.getStudentLessons().stream().filter(studentLesson -> studentLesson.getStatus().equals("выполнено"))
        .collect(Collectors.toList()).size();
      int lessonsCount = studentCourse.getStudentLessons().size();
      int completeness = Math.round((float)completedLessonsCount / lessonsCount * 100);
      return completeness == 100;
    }).collect(Collectors.toList()).size();

    int inProgressCoursesCount = coursesCount - completedCoursesCount;

    int lessonsCount = studentCourses.stream().map(studentCourse -> studentCourse.getStudentLessons().size()).reduce(0, (acc, count) -> acc + count);

    int completedLessonsCount = studentCourses.stream()
      .map(studentCourse -> studentCourse.getStudentLessons().stream().filter(studentLesson -> studentLesson.getStatus().equals("выполнено"))
        .collect(Collectors.toList()).size())
      .reduce(0, (acc, count) -> acc + count);

    int idlingLessonsCount = studentCourses.stream()
    .map(studentCourse -> studentCourse.getStudentLessons().stream().filter(studentLesson -> studentLesson.getStatus().equals("ожидается проверка"))
      .collect(Collectors.toList()).size())
    .reduce(0, (acc, count) -> acc + count);

    int sumOfAllLessonsGrades = studentCourses.stream().map(studentCourse -> studentCourse.getStudentLessons().stream()
      .map(studentLesson -> studentLesson.getGrade()).filter(grade -> Objects.nonNull(grade)).reduce(0, (acc, grade) -> acc + grade))
      .reduce(0, (acc, count) -> acc + count);
    int lessonsWithGradeCount = studentCourses.stream().map(studentCourse -> studentCourse.getStudentLessons().stream()
      .filter(studentLesson -> Objects.nonNull(studentLesson.getGrade())).collect(Collectors.toList()).size())
      .reduce(0, (acc, count) -> acc + count);
    Float averageGrade = sumOfAllLessonsGrades != 0 ? (float)sumOfAllLessonsGrades / lessonsWithGradeCount : null;


    StudentOverviewDto studentOverviewDto = new StudentOverviewDto();
    studentOverviewDto.setCoursesCount(coursesCount);
    studentOverviewDto.setCompletedCoursesCount(completedCoursesCount);
    studentOverviewDto.setInProgressCoursesCount(inProgressCoursesCount);
    studentOverviewDto.setLessonsCount(lessonsCount);
    studentOverviewDto.setCompletedLessonsCount(completedLessonsCount);
    studentOverviewDto.setIdlingLessonsCount(idlingLessonsCount);
    studentOverviewDto.setAverageGrade(averageGrade);
    return studentOverviewDto;
  }

  // public TeacherOverviewDto getTeacherOverviewData(Long userId) {
  //   // всего проводимых курсов
  //   // заданий для проверки
  //   // всего студентов

  //   List<Teacher> teachers = teachersRepository.fetchAllByTeacherId(userId);

  //   int coursesCount = teachers.size();

  //   // teachers.stream().map(teacher -> teacher.getCourse().getLessons().stream().map(lesson -> lesson.getStudentLessons().stream()
  //   //   .filter(studentLesson -> studentLesson.getStatus().equals("ожидается проверка")).collect(Collectors.toList()).size()))
  //   // List<Course> teacherCourses = teachers.stream().map(teacher -> teacher.getCourse()).collect(Collectors.toList());
  //   // int lessonsToGrade = teacherCourses.stream().map(teacherCourse -> teacherCourse.getLessons().stream()
  //   //   .filter(studentLesson -> studentLesson.getStatus().equals("ожидается проверка")))

  //   teachers.stream().map(teacher -> teacher.getCourse().getLessons())

  //   int studentsCount = 5;

  //   TeacherOverviewDto teacherOverviewDto = new TeacherOverviewDto();
  //   teacherOverviewDto.setCoursesCount(coursesCount);
  //   return teacherOverviewDto;
  // }

  public AdminOverviewDto getAdminOverviewData(Long userId) {
    AdminOverviewDto adminOverviewDto = new AdminOverviewDto();
    return adminOverviewDto;
  }
}
