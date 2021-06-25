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
  @Query("FROM StudentLesson sl JOIN FETCH sl.lesson l LEFT JOIN FETCH l.lessonFiles lf WHERE sl.id = :id")
  public Optional<StudentLesson> findByIdWithLessonFiles(Long id);

  @Query("FROM StudentLesson sl LEFT JOIN FETCH sl.lesson l LEFT JOIN FETCH sl.studentCourse sc LEFT JOIN FETCH sc.course c" + " " +
    "LEFT JOIN c.teachers t LEFT JOIN t.user u WHERE u.id = :teacherId AND sl.id = :lessonId")
  public Optional<StudentLesson> findByUserIdAndId(Long teacherId, Long lessonId);

  public Page<StudentLesson> findAllByStudentCourseCourseTeachersUserIdAndStatus(Long id, Long courseId, String status, Pageable pageable);

  @Query("SELECT sl.id FROM StudentLesson sl LEFT JOIN sl.lesson l LEFT JOIN sl.studentCourse sc LEFT JOIN sc.course c" + " " +
    "LEFT JOIN c.teachers t LEFT JOIN t.user u WHERE l.name LIKE %:name% AND u.id = :teacherId AND sl.status = :status")
  public Page<Long> findAllIdsByLessonNameContainingAndTeacherIdAndStatus(String name, Long teacherId, String status, Pageable pageable);

  @Query("SELECT DISTINCT sl FROM StudentLesson sl LEFT JOIN FETCH sl.lesson l WHERE sl.id IN :ids")
  public List<StudentLesson> fetchAllByIds(List<Long> ids);
}
