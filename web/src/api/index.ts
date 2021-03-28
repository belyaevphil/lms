import { inst } from './axios'
import {
  User,
  InstructorCourseType,
  InstructorCoursesToManageType,
  InstructorLesson,
  GradeStudentLesson,
  CourseForStudentCoursePage,
  LessonForStudentLessonPage,
  LessonForInstructorGradeLessonPage,
  CourseForStudentCoursesPage
} from 'types'
import {
  CreateCourseDto,
  SignInDto,
  SignUpDto,
  GetCoursesDto,
  GetInstructorCoursesToManageDto,
  AssignCourseDto,
  AssignInstructorDto,
  AddAnswerDto,
  GradeLessonDto,
  GetInstructorLessonsToGradeDto
} from './dto'

export type ResponseStatus = 'success' | 'error'

export type Response<ResponsePayload = null> = {
  status: ResponseStatus
  payload: ResponsePayload
  message: string | null
}

export const API = {
  users: {
    getAuthData: async () => {
      const response = await inst.get<
        Response<{
          userData: User
        }>
      >('/users/auth-data')
      return response.data
    },
    signUp: async (signUpDto: SignUpDto) => {
      const response = await inst.post<Response>('/users/sign-up', signUpDto)
      return response.data
    },
    signIn: async (signInDto: SignInDto) => {
      const response = await inst.post<
        Response<{
          userData: User
        }>
      >('/users/sign-in', signInDto)
      return response.data
    },
    signOut: async () => {
      const response = await inst.get<Response>('/users/sign-out')
      return response.data
    }
  },
  courses: {
    create: async (createCourseDto: CreateCourseDto) => {
      const response = await inst.post<Response>('/courses', createCourseDto)
      return response.data
    },
    get: async (getCoursesDTO?: GetCoursesDto) => {
      const response = await inst.get<
        Response<{
          courses: CourseForStudentCoursesPage[]
        }>
      >(`/courses?page=${getCoursesDTO?.pageNumber}&portionSize=${getCoursesDTO?.portionSize}`)
      return response.data
    },
    getInstructorCourse: async (id: number) => {
      const response = await inst.get<
        Response<{
          instructorCourse: InstructorCourseType
        }>
      >(`/courses/instructor/${id}`)
      return response.data
    },
    getInstructorCoursesToManage: async (
      getInstructorCoursesToManageDto?: GetInstructorCoursesToManageDto
    ) => {
      const response = await inst.get<
        Response<{
          courses: InstructorCoursesToManageType[]
        }>
      >(
        `/courses/instructor?page=${getInstructorCoursesToManageDto?.pageNumber}&portionSize=${getInstructorCoursesToManageDto?.portionSize}`
      )
      return response.data
    },
    getOneById: async (id: number) => {
      const response = await inst.get<
        Response<{
          courseData: CourseForStudentCoursePage
        }>
      >(`/courses/${id}`)
      return response.data
    },
    assign: async (assignCourseDto: AssignCourseDto) => {
      const response = await inst.post<Response>(`/courses/assign`, assignCourseDto)
      return response.data
    },
    assignInstructor: async (assignInstructorDto: AssignInstructorDto) => {
      const response = await inst.post<Response>('/courses/instructor/assign', assignInstructorDto)
      return response.data
    }
  },
  lessons: {
    create: async (createLessonDTO: FormData) => {
      const response = await inst.post<Response>('/lessons', createLessonDTO)
      return response.data
    },
    getOneById: async (id: number) => {
      const response = await inst.get<
        Response<{
          lessonData: LessonForStudentLessonPage
        }>
      >(`/lessons/${id}`)
      return response.data
    },
    downloadFile: async (path: string) => {
      const response = await inst.get<BlobPart>(`/lessons/file/${path}`, {
        responseType: 'blob'
      })
      return response.data
    },
    addAnswer: async (addAnswerDTO: AddAnswerDto) => {
      const response = await inst.post<Response>('/lessons/answer', addAnswerDTO)
      return response.data
    },
    grade: async (gradeLessonDto: GradeLessonDto) => {
      const response = await inst.post<Response>('/lessons/grade', gradeLessonDto)
      return response.data
    },
    getInstructorLesson: async (id: number) => {
      const response = await inst.get<
        Response<{
          lessonData: InstructorLesson
        }>
      >(`/lessons/instructor/${id}`)
      return response.data
    },
    getInstructorLessonsToGrade: async (
      getInstructorLessonsToGradeDto?: GetInstructorLessonsToGradeDto
    ) => {
      const response = await inst.get<
        Response<{
          lessons: GradeStudentLesson[]
        }>
      >(
        `/lessons/instructor/grade?page=${getInstructorLessonsToGradeDto?.pageNumber}&portionSize=${getInstructorLessonsToGradeDto?.portionSize}`
      )
      return response.data
    },
    getInstructorLessonToGrade: async (id: number) => {
      const response = await inst.get<
        Response<{
          lesson: LessonForInstructorGradeLessonPage
        }>
      >(`/lessons/instructor/grade/${id}`)
      return response.data
    }
  }
}
