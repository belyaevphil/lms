package com.example.lms.auth;

import java.util.List;
import java.util.stream.Collectors;

import com.example.lms.auth.dto.SignupDto;
import com.example.lms.exceptions.BadRequestException;
import com.example.lms.exceptions.NotFoundException;
import com.example.lms.users.entities.Role;
import com.example.lms.users.entities.User;
import com.example.lms.users.entities.UserRole;
import com.example.lms.users.repositories.RolesRepository;
import com.example.lms.users.repositories.UsersRepository;
import com.example.lms.users.repositories.UsersRolesRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UsersRepository usersRepository;
  private final UsersRolesRepository usersRolesRepository;
  private final RolesRepository rolesRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final FindByIndexNameSessionRepository<? extends Session> sessionRepository;

  public void deleteSessionsByUsername(String username) {
    List<Session> sessions = sessionRepository.findByPrincipalName(username).values().stream().collect(Collectors.toList());
    for (Session session : sessions) {
      sessionRepository.deleteById(session.getId());
    }
  }

  @Transactional(rollbackFor = Throwable.class)
  public void signup(SignupDto signupDto) {
    if (!signupDto.getPassword().equals(signupDto.getConfirmPassword())) {
      throw new BadRequestException("Пароли не совпадают");
    }

    usersRepository.findByUsername(signupDto.getUsername()).ifPresent(candidate -> {
      throw new BadRequestException("Имя пользователя уже существует");
    });

    User newUser = new User();
    newUser.setUsername(signupDto.getUsername());
    newUser.setPassword(passwordEncoder.encode(signupDto.getPassword()));
    newUser.setFirstName(signupDto.getFirstName());
    newUser.setLastName(signupDto.getLastName());
    usersRepository.save(newUser);

    Role role = rolesRepository.findByName("STUDENT").orElseThrow(() -> new NotFoundException("Роль не найдена"));
    UserRole userRole = new UserRole();
    userRole.setUser(newUser);
    userRole.setRole(role);
    usersRolesRepository.save(userRole);
  }
}
