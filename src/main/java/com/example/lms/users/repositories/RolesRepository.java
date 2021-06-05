package com.example.lms.users.repositories;

import java.util.Optional;

import com.example.lms.users.entities.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Role, Long> {
  public Optional<Role> findByName(String name);
}
