package com.example.lms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/uploads/images/profile/**").addResourceLocations("file:///D:/Desktop/Phil/projects/Java/uploads/images/profile/");
    registry.addResourceHandler("/uploads/images/course/**").addResourceLocations("file:///D:/Desktop/Phil/projects/Java/uploads/images/course/");
    registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
  }
}