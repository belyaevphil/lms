package com.example.lms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
  @Value("${uploads.path}")
  private String uploadsPath;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/uploads/images/profile/**").addResourceLocations("file:///" + uploadsPath + "/images/profile/");
    registry.addResourceHandler("/uploads/images/course/**").addResourceLocations("file:///" + uploadsPath + "/images/course/");
    registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
  }
}