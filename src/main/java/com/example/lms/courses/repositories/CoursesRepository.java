package com.example.lms.courses.repositories;

import java.util.Optional;

import com.example.lms.courses.entities.Course;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursesRepository extends JpaRepository<Course, Long> {
  public Optional<Course> findByName(String name);

  public Page<Course> findAllByTeachersUserId(Long id, Pageable pageable);

  public Page<Course> findAllByNameContaining(String name, Pageable pageable);

  @Query("FROM Course c LEFT JOIN FETCH c.lessons l WHERE c.id = :id")
  public Optional<Course> findByIdWithLessons(Long id);
}