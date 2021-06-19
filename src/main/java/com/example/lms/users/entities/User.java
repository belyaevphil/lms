package com.example.lms.users.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.lms.courses.entities.StudentCourse;

import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "username")
  private String username;

  @Column(name = "password")
  private String password;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @Column(name = "phone")
  private String phone;

  @Column(name = "image_url")
  private String imageUrl;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<UserRole> userRoles;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<Teacher> teachers;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<StudentCourse> studentCourses;
}
