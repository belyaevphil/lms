import { inst } from '.'
import { StudentLesson } from '../store/studentLesson'

type CreateLessonResponse = {
  success: boolean
  message: string
}

type GetOneLessonByIdResponse = {
  success: boolean
  studentLesson: StudentLesson
}

type DownloadFileResponse = BlobPart

export const lessonsAPI = {
  create: async (formData: FormData) => {
    const response = await inst.post<CreateLessonResponse>(
      '/lessons/createLesson',
      formData
    )
    return response.data
  },
  getOneById: async (lessonId: number) => {
    const response = await inst.get<GetOneLessonByIdResponse>(
      `/lessons/getOneLessonById?id=${lessonId}`
    )
    return response.data
  },
  downloadFile: async (filePath: string) => {
    const response = await inst.get<DownloadFileResponse>(
      `/lessons/downloadFile?path=${filePath}`,
      {
        responseType: 'blob'
      }
    )
    return response.data
  }
}
