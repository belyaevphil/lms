package com.example.lms.security;

import com.example.lms.users.entities.User;
import com.example.lms.users.repositories.UsersRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UsersRepository usersRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = usersRepository.findByUsernameWithRoles(username).orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    return new UserDetailsImpl(user);
  }

}
