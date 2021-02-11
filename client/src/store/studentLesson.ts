import { AppState, InferredActions, Thunk } from '.'
import { lessonsAPI } from '../api/lessonsAPI'
import { setMessage } from './serverResponses'

export type File = {
  originalName: string
  path: string
}

export type StudentLesson = {
  id: number
  name: string
  description: string
  status: string
  files: File[]
}

type StudentLessonState = {
  studentLesson: StudentLesson | null
  isLoading: boolean
}

const initialState: StudentLessonState = {
  studentLesson: null,
  isLoading: false
}

export const studentLesson = (
  state = initialState,
  action: StudentLessonActions
): StudentLessonState => {
  switch (action.type) {
    case 'studentLesson/STUDENT_LESSON_REQUEST':
      return {
        ...state,
        studentLesson: null,
        isLoading: true
      }
    case 'studentLesson/STUDENT_LESSON_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'studentLesson/STUDENT_LESSON_RESPONSE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

const studentLessonActions = {
  setStudentLessonRequest: () => {
    return {
      type: 'studentLesson/STUDENT_LESSON_REQUEST'
    } as const
  },
  setStudentLessonSuccess: (studentLesson: StudentLesson) => {
    return {
      type: 'studentLesson/STUDENT_LESSON_SUCCESS',
      payload: {
        studentLesson
      }
    } as const
  },
  setStudentLessonResponse: () => {
    return {
      type: 'studentLesson/STUDENT_LESSON_RESPONSE'
    } as const
  }
}

type StudentLessonActions = InferredActions<typeof studentLessonActions>
type StudentLessonThunk = Thunk

export const createLesson = (formData: FormData): StudentLessonThunk => async dispatch => {
  dispatch(studentLessonActions.setStudentLessonRequest())
  try {
    const response = await lessonsAPI.create(formData)
    const { success, message } = response
    if (success) dispatch(setMessage('success', message))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(studentLessonActions.setStudentLessonResponse())
  }
}

export const getOneLessonById = (lessonsDTO: {
  lessonId: number
}): StudentLessonThunk => async dispatch => {
  dispatch(studentLessonActions.setStudentLessonRequest())
  try {
    const response = await lessonsAPI.getOneById(lessonsDTO)
    const { success, studentLesson } = response
    if (success) dispatch(studentLessonActions.setStudentLessonSuccess(studentLesson))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(studentLessonActions.setStudentLessonResponse())
  }
}

export const downloadFile = (
  filePath: string,
  fileOriginalName: string
): StudentLessonThunk => async dispatch => {
  try {
    const response = await lessonsAPI.downloadFile({ filePath })

    const blobURL = window.URL.createObjectURL(new Blob([response]))
    const tempLink = document.createElement('a')
    tempLink.href = blobURL
    tempLink.setAttribute('download', fileOriginalName)
    document.body.appendChild(tempLink)
    tempLink.click()

    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  } catch (e) {
    dispatch(setMessage('error', e))
  }
}

export const selectStudentLesson = (state: AppState) => state.studentLesson
