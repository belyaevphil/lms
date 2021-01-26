import { Course } from '../store/courses'
import { inst } from '.'
import { StudentCourse } from '../store/studentCourse'

type CreateCourseResponse = {
  success: boolean
  message: string
}

type GetResponse = {
  success: boolean
  payload: {
    items: Course[]
  }
}

type GetManyResponse = GetResponse
type GetOwnedResponse = GetResponse
type GetInstructorCoursesResponse = GetResponse

type GetOneByIdResponse = {
  success: boolean
  studentCourse: StudentCourse
}

type AcquireCourseResponse = {
  success: boolean
  message: string
}

export const coursesAPI = {
  createCourse: async (name: string, codeword: string) => {
    const response = await inst.post<CreateCourseResponse>(
      '/courses/createCourse',
      {
        name,
        codeword
      }
    )
    return response.data
  },
  getMany: async (pageNumber: number, portionSize: number) => {
    const response = await inst.get<GetManyResponse>(
      `/courses/getMany?page=${pageNumber}&portionSize=${portionSize}`
    )
    return response.data
  },
  getOwned: async (pageNumber: number, portionSize: number) => {
    const response = await inst.get<GetOwnedResponse>(
      `/courses/getOwned?page=${pageNumber}&portionSize=${portionSize}`
    )
    return response.data
  },
  getInstructorCourses: async (pageNumber: number, portionSize: number) => {
    const response = await inst.get<GetInstructorCoursesResponse>(
      `/courses/getInstructorCourses?page=${pageNumber}&portionSize=${portionSize}`
    )
    return response.data
  },
  getOneById: async (courseId: number) => {
    const response = await inst.get<GetOneByIdResponse>(
      `/courses/getOneById?id=${courseId}`
    )
    return response.data
  },
  acquireCourse: async (courseId: string, codeword: string) => {
    const response = await inst.post<AcquireCourseResponse>(
      `/courses/acquireCourse`,
      {
        courseId,
        codeword
      }
    )
    return response.data
  }
}
