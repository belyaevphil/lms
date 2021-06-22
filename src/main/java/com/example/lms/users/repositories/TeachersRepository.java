package com.example.lms.users.repositories;

import java.util.List;
import java.util.Optional;

import com.example.lms.courses.entities.Course;
import com.example.lms.users.entities.Teacher;
import com.example.lms.users.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeachersRepository extends JpaRepository<Teacher, Long> {
  public Optional<Teacher> findByUserAndCourse(User user, Course course);
}
