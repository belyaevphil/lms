package com.example.lms.users;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import com.example.lms.auth.AuthService;
import com.example.lms.courses.entities.StudentCourse;
import com.example.lms.courses.repositories.StudentsCoursesRepository;
import com.example.lms.users.dto.ChangeProfileImageDto;
import com.example.lms.users.dto.EditProfileDto;
import com.example.lms.users.dto.StudentOverviewDto;
import com.example.lms.users.entities.User;
import com.example.lms.users.repositories.UsersRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {
  @Value("${uploads.path}")
  private String uploadsPath;

  private final UsersRepository usersRepository;
  private final StudentsCoursesRepository studentsCoursesRepository;
  private final AuthService authService;

  public void editProfileData(User user, EditProfileDto editProfileDto) {
    user.setFirstName(editProfileDto.getFirstName());
    user.setLastName(editProfileDto.getLastName());
    user.setEmail(editProfileDto.getEmail());
    user.setPhone(editProfileDto.getPhone());
    usersRepository.save(user);

    authService.deleteSessionsByUsername(user.getUsername());
  }

  public void changeProfileImage(User user, ChangeProfileImageDto changeProfileImageDto) throws IOException {
    // Spring automatically generates 1 file with empty name, if none was present
    MultipartFile image = changeProfileImageDto.getImage();
    String firstFileName = image.getOriginalFilename();
    if (Objects.isNull(firstFileName)) {
      return;
    }
    if (!firstFileName.isEmpty()) {
      String imageUrl = UUID.randomUUID() + "-" + image.getOriginalFilename();
      if (!Objects.isNull(user.getImageUrl())) {
        Files.delete(Path.of(uploadsPath + "/images/profile/" + user.getImageUrl()));
      }
      Files
        .copy(image.getInputStream(), Path.of(uploadsPath + "/images/profile/" + imageUrl), StandardCopyOption.REPLACE_EXISTING);
      user.setImageUrl(imageUrl);
    }

    usersRepository.save(user);

    authService.deleteSessionsByUsername(user.getUsername());
  }

  public void deleteProfileImage(User user) throws IOException {
    Files.delete(Path.of(uploadsPath + "/images/profile/" + user.getImageUrl()));
    user.setImageUrl(null);
    usersRepository.save(user);

    authService.deleteSessionsByUsername(user.getUsername());
  }

  public StudentOverviewDto getStudentOverviewData(Long studentId) {
    List<StudentCourse> studentCourses = studentsCoursesRepository.fetchStudentCourses(studentId);

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

    int isCoursesCountZero = coursesCount == 0 ? 1 : coursesCount;
    int completeness = Math.round((float)completedCoursesCount / isCoursesCountZero * 100);

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
    studentOverviewDto.setCompleteness(completeness);
    studentOverviewDto.setAverageGrade(averageGrade);
    return studentOverviewDto;
  }
}
