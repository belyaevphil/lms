package com.example.lms.users.repositories;

import com.example.lms.users.entities.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRolesRepository extends JpaRepository<UserRole, Long> {
}
