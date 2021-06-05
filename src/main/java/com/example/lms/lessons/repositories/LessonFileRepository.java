package com.example.lms.lessons.repositories;

import com.example.lms.lessons.entities.LessonFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonFileRepository extends JpaRepository<LessonFile, Long> {
}
