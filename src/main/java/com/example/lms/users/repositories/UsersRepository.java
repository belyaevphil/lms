package com.example.lms.users.repositories;

import java.util.Optional;

import com.example.lms.users.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
  public Optional<User> findByUsername(String username);

  @Query("FROM User u LEFT JOIN FETCH u.userRoles ur LEFT JOIN FETCH ur.role r WHERE u.username = :username")
  public Optional<User> findByUsernameWithRoles(String username);
}