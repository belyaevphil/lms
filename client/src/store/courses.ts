import { coursesAPI } from '../api/coursesAPI'
import { usersAPI } from '../api/usersAPI'
import { AppState, InferredActions, Thunk } from '.'
import { setMessage } from './serverResponses'

export type Course = {
  id: number
  name: string
}

type InitialState = {
  courses: Course[]
  isLoading: boolean
}

const initialState: InitialState = {
  courses: [],
  isLoading: false
}

export const courses = (state = initialState, action: CoursesActions): InitialState => {
  switch (action.type) {
    case 'courses/COURSES_REQUEST':
      return {
        ...state,
        courses: [],
        isLoading: true
      }
    case 'courses/COURSES_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'courses/COURSES_RESPONSE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export const coursesActions = {
  setCoursesRequest: () => {
    return {
      type: 'courses/COURSES_REQUEST'
    } as const
  },
  setCoursesSuccess: (courses: Course[]) => {
    return {
      type: 'courses/COURSES_SUCCESS',
      payload: {
        courses
      }
    } as const
  },
  setCoursesResponse: () => {
    return {
      type: 'courses/COURSES_RESPONSE'
    } as const
  }
}

type CoursesActions = InferredActions<typeof coursesActions>
type CoursesThunk = Thunk

export const createCourse = (coursesDTO: {
  name: string
  codeword: string
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await coursesAPI.createCourse(coursesDTO)
    const { success, message } = response
    if (success) dispatch(setMessage('success', message))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const assignInstructorRole = (coursesDTO: {
  email: string
  courseName: string
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await usersAPI.assignInstructorRole(coursesDTO)
    const { success, message } = response
    if (success) dispatch(setMessage('success', message))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const getManyCourses = (coursesDTO: {
  pageNumber: number
  portionSize: number
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await coursesAPI.getMany(coursesDTO)
    const { success, payload } = response
    if (success) dispatch(coursesActions.setCoursesSuccess(payload.items))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const getOwnedCourses = (coursesDTO: {
  pageNumber: number
  portionSize: number
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await coursesAPI.getOwned(coursesDTO)
    const { success, payload } = response
    if (success) dispatch(coursesActions.setCoursesSuccess(payload.items))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const getInstuctorCourses = (coursesDTO: {
  pageNumber: number
  portionSize: number
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await coursesAPI.getInstructorCourses(coursesDTO)
    const { success, payload } = response
    if (success) dispatch(coursesActions.setCoursesSuccess(payload.items))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const acquireCourse = (coursesDTO: {
  courseId: string
  codeword: string
}): CoursesThunk => async dispatch => {
  dispatch(coursesActions.setCoursesRequest())
  try {
    const response = await coursesAPI.acquireCourse(coursesDTO)
    const { success, message } = response
    if (success) {
      dispatch(setMessage('success', message))
    }
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(coursesActions.setCoursesResponse())
  }
}

export const selectCoursesData = (state: AppState) => state.courses
