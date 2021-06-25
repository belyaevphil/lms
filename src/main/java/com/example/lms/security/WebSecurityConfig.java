package com.example.lms.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  private final UserDetailsService userDetailsService;

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .userDetailsService(userDetailsService)
      .passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      .antMatchers("/", "/how-to-learn", "/signup", "/static/**","/uploads/**").permitAll()
      .anyRequest().authenticated()
      .and()
      .formLogin()
        .loginPage("/signin")
        .loginProcessingUrl("/signin")
        .defaultSuccessUrl("/")
        .permitAll()
      .and()
      .rememberMe().key("00834dce-51c0-4d93-9267-00393e819771")
      .and()
      .logout()
        .logoutUrl("/signout")
        .invalidateHttpSession(true)
        .clearAuthentication(true)
        .logoutSuccessUrl("/signin")
      .and()
      .exceptionHandling().accessDeniedPage("/403");
  }

}