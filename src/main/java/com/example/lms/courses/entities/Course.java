package com.example.lms.courses.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.lms.lessons.entities.Lesson;
import com.example.lms.users.entities.Teacher;

import lombok.Data;

@Entity
@Data
@Table(name = "courses")
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "vendor_code")
  private Integer vendorCode;

  @Column(name = "name")
  private String name;

  @Column(name = "price")
  private Integer price;

  @Column(name = "description")
  private String description;

  @Column(name = "note")
  private String note;

  @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
  private List<Teacher> teachers;

  @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
  private List<Lesson> lessons;
}
