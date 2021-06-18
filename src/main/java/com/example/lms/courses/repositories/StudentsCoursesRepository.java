package com.example.lms.courses.repositories;

import java.util.List;
import java.util.Optional;

import com.example.lms.courses.entities.Course;
import com.example.lms.courses.entities.StudentCourse;
import com.example.lms.users.entities.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentsCoursesRepository extends JpaRepository<StudentCourse, Long> {
  public Optional<StudentCourse> findByUserAndCourse(User user, Course course);

  @Query("FROM StudentCourse sc LEFT JOIN FETCH sc.studentLessons sl LEFT JOIN FETCH sl.lesson l LEFT JOIN FETCH sc.course c WHERE sc.id = :id")
  public Optional<StudentCourse> findByIdWithStudentLessons(Long id);

  public List<StudentCourse> findAllByCourseId(Long courseId);

  @Query("SELECT sc.id FROM StudentCourse sc LEFT JOIN sc.user u WHERE u.id = :id")
  public Page<Long> findAllIdsByStudentId(Long id, Pageable pageable);

  @Query("SELECT DISTINCT sc FROM StudentCourse sc LEFT JOIN FETCH sc.studentLessons sl LEFT JOIN FETCH sc.course c WHERE sc.id IN :ids")
  public List<StudentCourse> fetchAllByIds(List<Long> ids);

  @Query("SELECT sc FROM StudentCourse sc LEFT JOIN FETCH sc.studentLessons sl LEFT JOIN sc.user u WHERE u.id = :studentId")
  public List<StudentCourse> fetchAllByStudentId(Long studentId);
}