export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>

export type File = {
  path: string
  originalName: string
}

export type LessonForStudentLessonPage = {
  id: number
  name: string
  description: string
  answer: string | null
  grade: number | null
  status: string
  files: File[]
}

export type LessonForStudentCoursePage = {
  id: number
  name: string
  description: string
  grade: number | null
  status: string
}

export type CourseForStudentCoursePage = {
  name: string
  description: string
  completedLessonsCount: number
  lessonsCount: number
  averageGrade: number
  lessons: LessonForStudentCoursePage[]
}

export type CourseForStudentCoursesPage = {
  id: number
  name: string
  description: string
  completedLessonsCount: number
  lessonsCount: number
  averageGrade: number
}

export type InstructorCourseLesson = {
  id: number
  courseId: number
  name: string
}

export type InstructorLesson = {
  id: number
  courseId: number
  name: string
  description: string
}

export type InstructorCourseType = {
  name: string
  description: string
  lessons: InstructorCourseLesson[]
}

export type GradeStudentLesson = {
  id: number
  name: string
}

export type LessonForInstructorGradeLessonPage = {
  answer: string
}

export type User = {
  id: number
  roles: string[]
  username: string
  firstName: string
  lastName: string
  email: string | null
  phone: string | null
}

export type Course = {
  id: number
  name: string
  description: string | null
  completeness: number
}

export type InstructorCoursesToManageType = {
  id: number
  name: string
}
