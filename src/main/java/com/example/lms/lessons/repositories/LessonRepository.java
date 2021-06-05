package com.example.lms.lessons.repositories;

import java.util.List;

import com.example.lms.lessons.entities.Lesson;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
  public List<Lesson> findAllByCourseId(Long courseId);
}
