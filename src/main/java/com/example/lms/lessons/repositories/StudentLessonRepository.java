package com.example.lms.lessons.repositories;

import java.util.List;
import java.util.Optional;

import com.example.lms.lessons.entities.StudentLesson;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentLessonRepository extends JpaRepository<StudentLesson, Long> {
  @Query("SELECT sl.id FROM StudentLesson sl LEFT JOIN sl.lesson l LEFT JOIN sl.studentCourse sc LEFT JOIN sc.course c" + " " +
    "LEFT JOIN c.teachers t LEFT JOIN t.user u WHERE u.id = :teacherId AND sl.id = :lessonId AND sl.status = 'ожидается проверка'")
  public Optional<Long> findTeacherLessonToGrade(Long teacherId, Long lessonId);

  @Query("SELECT sl FROM StudentLesson sl LEFT JOIN FETCH sl.lesson l LEFT JOIN FETCH sl.studentCourse sc LEFT JOIN FETCH sc.user u WHERE sl.id = :id")
  public StudentLesson fetchTeacherLessonToGrade(Long id);

  @Query("SELECT sl.id FROM StudentLesson sl LEFT JOIN sl.lesson l LEFT JOIN sl.studentCourse sc LEFT JOIN sc.course c" + " " +
    "LEFT JOIN c.teachers t LEFT JOIN t.user u WHERE l.name LIKE %:name% AND u.id = :teacherId AND sl.status = 'ожидается проверка'")
  public Page<Long> findTeacherLessonsToGrade(String name, Long teacherId, Pageable pageable);

  @Query("SELECT DISTINCT sl FROM StudentLesson sl LEFT JOIN FETCH sl.lesson l LEFT JOIN FETCH sl.studentCourse sc LEFT JOIN FETCH sc.user u" + " " +
    "WHERE sl.id IN :ids")
  public List<StudentLesson> fetchTeacherLessonsToGrade(List<Long> ids);
}