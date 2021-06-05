package com.example.lms.lessons.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.lms.courses.entities.StudentCourse;

import lombok.Data;

@Entity
@Data
@Table(name = "students_lessons")
public class StudentLesson {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "student_course_id")
  private StudentCourse studentCourse;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "lesson_id")
  private Lesson lesson;

  @Column(name = "answer")
  private String answer;

  @Column(name = "status")
  private String status;

  @Column(name = "grade")
  private Integer grade;
}
