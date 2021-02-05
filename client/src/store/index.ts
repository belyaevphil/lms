import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'

import { app } from './app'
import { auth } from './auth'
import { courses } from './courses'
import { serverResponses } from './serverResponses'
import { studentCourse } from './studentCourse'
import { studentLesson } from './studentLesson'

const rootReducer = combineReducers({
  app,
  auth,
  serverResponses,
  courses,
  studentCourse,
  studentLesson
})

export type AppState = ReturnType<typeof rootReducer>

export type InferredActions<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

export type Thunk<R = Promise<void>> = ThunkAction<R, AppState, unknown, Action>

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
