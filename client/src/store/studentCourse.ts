import { AppState, InferredActions, Thunk } from '.'
import { coursesAPI } from '../api/coursesAPI'
import { setMessage } from './serverResponses'
import { StudentLesson } from './studentLesson'

export type StudentCourse = {
  courseName: string
  lessons: StudentLesson[]
}

type StudentCourseState = {
  studentCourse: StudentCourse | null
  isLoading: boolean
}

const initialState: StudentCourseState = {
  studentCourse: null,
  isLoading: false
}

export const studentCourse = (
  state = initialState,
  action: StudentCourseActions
): StudentCourseState => {
  switch (action.type) {
    case 'studentCourse/STUDENT_COURSE_REQUEST':
      return {
        ...state,
        studentCourse: null,
        isLoading: true
      }
    case 'studentCourse/STUDENT_COURSE_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'studentCourse/STUDENT_COURSE_RESPONSE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

const studentCourseActions = {
  setStudentCourseRequest: () => {
    return {
      type: 'studentCourse/STUDENT_COURSE_REQUEST'
    } as const
  },
  setStudentCourseSuccess: (studentCourse: StudentCourse) => {
    return {
      type: 'studentCourse/STUDENT_COURSE_SUCCESS',
      payload: {
        studentCourse
      }
    } as const
  },
  setStudentCourseResponse: () => {
    return {
      type: 'studentCourse/STUDENT_COURSE_RESPONSE'
    } as const
  }
}

type StudentCourseActions = InferredActions<typeof studentCourseActions>
type StudentCourseThunk = Thunk

export const getOneCourseById = (coursesDTO: {
  courseId: number
}): StudentCourseThunk => async dispatch => {
  dispatch(studentCourseActions.setStudentCourseRequest())
  try {
    const response = await coursesAPI.getOneById(coursesDTO)
    const { success, studentCourse } = response
    if (success) dispatch(studentCourseActions.setStudentCourseSuccess(studentCourse))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(studentCourseActions.setStudentCourseResponse())
  }
}

export const selectStudentCourse = (state: AppState) => state.studentCourse
