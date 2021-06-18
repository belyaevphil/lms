package com.example.lms.courses;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.lms.auth.AuthService;
import com.example.lms.courses.dto.AssignCourseDto;
import com.example.lms.courses.dto.AssignTeacherDto;
import com.example.lms.courses.dto.CreateCourseDto;
import com.example.lms.courses.dto.StudentCourseDto;
import com.example.lms.courses.dto.StudentCoursesDto;
import com.example.lms.courses.entities.Course;
import com.example.lms.courses.entities.StudentCourse;
import com.example.lms.courses.repositories.CoursesRepository;
import com.example.lms.courses.repositories.StudentsCoursesRepository;
import com.example.lms.exceptions.BadRequestException;
import com.example.lms.exceptions.NotFoundException;
import com.example.lms.lessons.entities.Lesson;
import com.example.lms.lessons.entities.StudentLesson;
import com.example.lms.lessons.repositories.LessonRepository;
import com.example.lms.lessons.repositories.StudentLessonRepository;
import com.example.lms.users.entities.Role;
import com.example.lms.users.entities.Teacher;
import com.example.lms.users.entities.User;
import com.example.lms.users.entities.UserRole;
import com.example.lms.users.repositories.RolesRepository;
import com.example.lms.users.repositories.TeachersRepository;
import com.example.lms.users.repositories.UsersRepository;
import com.example.lms.users.repositories.UsersRolesRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CoursesService {
  private final CoursesRepository coursesRepository;
  private final UsersRepository usersRepository;
  private final StudentsCoursesRepository studentsCoursesRepository;
  private final TeachersRepository teachersRepository;
  private final UsersRolesRepository usersRolesRepository;
  private final RolesRepository rolesRepository;
  private final LessonRepository lessonRepository;
  private final StudentLessonRepository studentLessonRepository;
  private final AuthService authService;

  private StudentCourseDto convertStudentCourseToDto(StudentCourse studentCourse) {
    StudentCourseDto studentCourseResponseDto = new StudentCourseDto();
    studentCourseResponseDto.setStudentCourse(studentCourse);

    int completedLessonsCount = studentCourse.getStudentLessons().stream().filter(studentLesson -> studentLesson.getStatus().equals("выполнено"))
      .collect(Collectors.toList()).size();
    studentCourseResponseDto.setCompletedLessonsCount(completedLessonsCount);

    int lessonsCount = studentCourse.getStudentLessons().size();
    studentCourseResponseDto.setLessonsCount(lessonsCount);

    int completeness = Math.round((float)completedLessonsCount / lessonsCount * 100);
    studentCourseResponseDto.setCompleteness(completeness);

    int sumOfAllLessonsGrades = studentCourse.getStudentLessons().stream().map(studentLesson -> studentLesson.getGrade())
      .filter(grade -> Objects.nonNull(grade)).reduce(0, (acc, grade) -> acc + grade);
    int lessonsWithGradeCount = studentCourse.getStudentLessons().stream().filter(studentLesson -> Objects.nonNull(studentLesson.getGrade()))
      .collect(Collectors.toList()).size();
    Float averageGrade = sumOfAllLessonsGrades != 0 ? (float)sumOfAllLessonsGrades / lessonsWithGradeCount : null;
    studentCourseResponseDto.setAverageGrade(averageGrade);

    return studentCourseResponseDto;
  }
  
  public StudentCourseDto getStudentCourse(Long id) {
    StudentCourse studentCourse = studentsCoursesRepository.findByIdWithStudentLessons(id)
      .orElseThrow(() -> new NotFoundException("Такого курса не найдено"));
    return convertStudentCourseToDto(studentCourse);
  }

  public StudentCoursesDto getStudentCourses(Long studentId, Pageable pageable) {
    Page<Long> idsPage = studentsCoursesRepository.findAllIdsByStudentId(studentId, pageable);
    List<StudentCourseDto> studentCourses = studentsCoursesRepository.fetchAllByIds(idsPage.getContent())
      .stream().map(studentCourse -> convertStudentCourseToDto(studentCourse)).collect(Collectors.toList());
    StudentCoursesDto studentCoursesDto = new StudentCoursesDto();
    studentCoursesDto.setCurrentPage(pageable.getPageNumber() + 1);
    studentCoursesDto.setTotalPages(idsPage.getTotalPages());
    studentCoursesDto.setTotalElements(idsPage.getTotalElements());
    studentCoursesDto.setStudentCourseDtos(studentCourses);
    return studentCoursesDto;
  }

  public Course getTeacherCourse(Long id) {
    return coursesRepository.findByIdWithLessons(id).orElseThrow(() -> new NotFoundException("Такого курса не найдено"));
  }

  public Page<Course> getTeacherCourses(Long id, Pageable pageable) {
    return coursesRepository.findAllByTeachersUserId(id, pageable);
  }

  public Course getCourse(Long id) {
    return coursesRepository.findById(id).orElseThrow(() -> new NotFoundException("Такого курса не найдено"));
  }

  public List<Course> getCourses() {
    return coursesRepository.findAll();
  }

  public void create(CreateCourseDto createCourseDto) {
    Optional<Course> course = coursesRepository.findByName(createCourseDto.getName());
    if (course.isPresent()) {
      throw new BadRequestException("Такой курс уже существует");
    }

    Course newCourse = new Course();
    newCourse.setName(createCourseDto.getName());
    coursesRepository.save(newCourse);
  }

  @Transactional(rollbackFor = Throwable.class)
  public void assign(AssignCourseDto assignCourseDto) {
    User user = usersRepository.findByUsername(assignCourseDto.getUsername())
      .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
    Course course = coursesRepository.findByName(assignCourseDto.getCourseName())
      .orElseThrow(() -> new NotFoundException("Курс не найден"));
    studentsCoursesRepository.findByUserAndCourse(user, course).ifPresent(studentCourse -> {
      throw new BadRequestException("Пользователь уже имеет данный курс");
    });

    StudentCourse studentCourse = new StudentCourse();
    studentCourse.setUser(user);
    studentCourse.setCourse(course);
    studentsCoursesRepository.save(studentCourse);

    List<Lesson> courseLessons = lessonRepository.findAllByCourseId(course.getId());
    if (!courseLessons.isEmpty()) {
      List<StudentLesson> studentLessons = courseLessons.stream().map(courseLesson -> {
        StudentLesson studentLesson = new StudentLesson();
        studentLesson.setStudentCourse(studentCourse);
        studentLesson.setLesson(courseLesson);
        studentLesson.setStatus("не выполнено");
        return studentLesson;
      }).collect(Collectors.toList());
      studentLessonRepository.saveAll(studentLessons);
    }
  }

  @Transactional(rollbackFor = Throwable.class)
  public void assignTeacher(AssignTeacherDto assignTeacherDto) {
    User user = usersRepository.findByUsernameWithRoles(assignTeacherDto.getUsername())
      .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
    Course course = coursesRepository.findByName(assignTeacherDto.getCourseName())
      .orElseThrow(() -> new NotFoundException("Курс не найден"));
    teachersRepository.findByUserAndCourse(user, course).ifPresent(instructor -> {
      throw new BadRequestException("Преподаватель уже ведет данный курс");
    });

    List<String> userRoles = user.getUserRoles().stream().map(userRole -> userRole.getRole().getName()).collect(Collectors.toList());
    boolean isUserTeacherAlready = userRoles.contains("TEACHER");
    if (!isUserTeacherAlready) {
      Role role = rolesRepository.findByName("TEACHER").orElseThrow(() -> new NotFoundException("Роль не найдена"));

      UserRole userRole = new UserRole();
      userRole.setUser(user);
      userRole.setRole(role);
      usersRolesRepository.save(userRole);
    }

    Teacher instructor = new Teacher();
    instructor.setUser(user);
    instructor.setCourse(course);
    teachersRepository.save(instructor);

    authService.deleteSessionsByUsername(user.getUsername());
  }
}
