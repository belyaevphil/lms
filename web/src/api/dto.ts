export type SignUpDto = {
  username: string
  password: string
  repeatPassword: string
  firstName: string
  lastName: string
}

export type SignInDto = {
  username: string
  password: string
}

export type AssignInstructorDto = {
  username: string
  courseName: string
}

export type AssignCourseDto = {
  username: string
  courseName: string
}

export type CreateCourseDto = {
  courseName: string
}

export type GetCoursesDto = {
  pageNumber: number
  portionSize: number
}

export type GetInstructorCoursesToManageDto = GetCoursesDto

export type AddAnswerDto = {
  answer: string
}

export type GradeLessonDto = {
  lessonId: number
  grade: number
}

export type GetInstructorLessonsToGradeDto = GetCoursesDto
