package com.example.lms.courses;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.lms.auth.AuthService;
import com.example.lms.courses.dto.AssignCourseDto;
import com.example.lms.courses.dto.AssignTeacherDto;
import com.example.lms.courses.dto.ChangeCourseImageDto;
import com.example.lms.courses.dto.CreateCourseDto;
import com.example.lms.courses.dto.EditCourseDto;
import com.example.lms.courses.dto.EditCourseNoteDto;
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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CoursesService {
  @Value("${uploads.path}")
  private String uploadsPath;

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

    int isLessonsCountZero = lessonsCount == 0 ? 1 : lessonsCount;
    int completeness = Math.round((float)completedLessonsCount / isLessonsCountZero * 100);
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
    StudentCourse studentCourse = studentsCoursesRepository.fetchStudentCourse(id)
      .orElseThrow(() -> new NotFoundException("Такого курса не найдено"));
    return convertStudentCourseToDto(studentCourse);
  }

  public StudentCoursesDto getStudentCourses(String queryParam, Long studentId, Pageable pageable) {
    Page<Long> idsPage = studentsCoursesRepository.findStudentCourses(queryParam, studentId, pageable);
    List<StudentCourseDto> studentCourses = studentsCoursesRepository.fetchStudentCourses(idsPage.getContent())
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

  public Page<Course> getCourses(String query, Pageable pageable) {
    return coursesRepository.findAllByNameContaining(query, pageable);
  }

  public void changeCourseImage(Long id, ChangeCourseImageDto changeCourseImageDto) throws IOException {
    Course course = coursesRepository.findById(id).orElseThrow(() -> new NotFoundException("Курс не найден"));

    // Spring automatically generates 1 file with empty name, if none was present
    MultipartFile image = changeCourseImageDto.getImage();
    String firstFileName = image.getOriginalFilename();
    if (Objects.isNull(firstFileName)) {
      return;
    }
    if (!firstFileName.isEmpty()) {
      String imageUrl = UUID.randomUUID() + "-" + image.getOriginalFilename();
      if (!Objects.isNull(course.getImageUrl())) {
        Files.delete(Path.of(uploadsPath + "/images/course/" + course.getImageUrl()));
      }
      Files
        .copy(image.getInputStream(), Path.of(uploadsPath + "/images/course/" + imageUrl), StandardCopyOption.REPLACE_EXISTING);
      course.setImageUrl(imageUrl);
    }

    coursesRepository.save(course);
  }

  public void deleteCourseImage(Long id) throws IOException {
    Course course = coursesRepository.findById(id).orElseThrow(() -> new NotFoundException("Курс не найден"));
    Files.delete(Path.of(uploadsPath + "/images/course/" + course.getImageUrl()));
    course.setImageUrl(null);
    coursesRepository.save(course);
  }

  public void create(CreateCourseDto createCourseDto) throws IOException {
    Optional<Course> course = coursesRepository.findByName(createCourseDto.getName());
    if (course.isPresent()) {
      throw new BadRequestException("Такой курс уже существует");
    }

    Course newCourse = new Course();
    newCourse.setName(createCourseDto.getName());
    newCourse.setVendorCode(createCourseDto.getVendorCode());
    newCourse.setPrice(createCourseDto.getPrice());
    newCourse.setDescription(createCourseDto.getDescription());

    MultipartFile image = createCourseDto.getImage();
    String firstFileName = image.getOriginalFilename();
    if (Objects.isNull(firstFileName)) {
      return;
    }
    if (!firstFileName.isEmpty()) {
      String imageUrl = UUID.randomUUID() + "-" + image.getOriginalFilename();
      Files
        .copy(image.getInputStream(), Path.of(uploadsPath + "/images/course/" + imageUrl), StandardCopyOption.REPLACE_EXISTING);
      newCourse.setImageUrl(imageUrl);
    }

    coursesRepository.save(newCourse);
  }

  public void editCourse(Long id, EditCourseDto editCourseDto) {
    Course course = coursesRepository.findById(id).orElseThrow(() -> new NotFoundException("Курс не найден"));
    course.setVendorCode(editCourseDto.getVendorCode());
    course.setPrice(editCourseDto.getPrice());
    course.setDescription(editCourseDto.getDescription());
    coursesRepository.save(course);
  }

  public void editCourseNote(Long id, EditCourseNoteDto editCourseNoteDto) {
    Course course = coursesRepository.findById(id).orElseThrow(() -> new NotFoundException("Курс не найден"));
    course.setNote(editCourseNoteDto.getNote());
    coursesRepository.save(course);
  }

  private void addExistingLessonsToNewStudentCourse(List<Lesson> courseLessons, StudentCourse studentCourse) {
    List<StudentLesson> studentLessons = courseLessons.stream().map(courseLesson -> {
      StudentLesson studentLesson = new StudentLesson();
      studentLesson.setStudentCourse(studentCourse);
      studentLesson.setLesson(courseLesson);
      studentLesson.setStatus("не выполнено");
      return studentLesson;
    }).collect(Collectors.toList());
    studentLessonRepository.saveAll(studentLessons);
  }

  @Transactional(rollbackFor = Exception.class)
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
      addExistingLessonsToNewStudentCourse(courseLessons, studentCourse);
    }
  }

  @Transactional(rollbackFor = Exception.class)
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
