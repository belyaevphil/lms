import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, Thunk } from 'store'
import { API } from 'api'
import { User } from 'types'
import { SignInDto, SignUpDto } from 'api/dto'

export type AuthState = {
  userData: User | null
  isLoading: boolean
  isAuth: boolean
  status: 'success' | 'error' | null
  message: string | null
}

// const initialState: AuthState = {
//   userData: {
//     id: 1,
//     roles: ['STUDENT', 'ADMIN', 'INSTRUCTOR'],
//     username: 'heyy',
//     firstName: 'Philip',
//     lastName: 'Belyaev',
//     email: null,
//     phone: null
//   },
//   isLoading: false,
//   isAuth: true,
//   status: null,
//   message: null
// }
const initialState: AuthState = {
  userData: null,
  isLoading: false,
  isAuth: false,
  status: null,
  message: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthRequest(state) {
      state.userData = null
      state.isLoading = true
      state.isAuth = false
      state.status = null
      state.message = null
    },
    setAuthSuccess(
      state,
      action: PayloadAction<{
        userData: User | null
        status: 'success' | 'error' | null
        message: string | null
        isAuth: boolean
      }>
    ) {
      state.userData = action.payload.userData
      state.isAuth = action.payload.isAuth
      state.status = action.payload.status
      state.message = action.payload.message
    },
    setAuthResponse(state) {
      state.isLoading = false
    },
    removeAuthMessage(state) {
      state.message = null
    }
  }
})

export const { setAuthSuccess, removeAuthMessage } = authSlice.actions

export const auth = authSlice.reducer

export const getAuthUserData = (): Thunk => async dispatch => {
  dispatch(authSlice.actions.setAuthRequest())
  try {
    const response = await API.auth.getAuthData()
    const { status, payload, message } = response
    dispatch(
      authSlice.actions.setAuthSuccess({ userData: payload.userData, status, message, isAuth: true })
    )
  } catch (e) {
  } finally {
    dispatch(authSlice.actions.setAuthResponse())
  }
}

export const signIn = (signInDto: SignInDto): Thunk => async dispatch => {
  dispatch(authSlice.actions.setAuthRequest())
  try {
    const response = await API.auth.signIn(signInDto)
    const { status, payload, message } = response
    dispatch(
      authSlice.actions.setAuthSuccess({ userData: payload.userData, status, message, isAuth: true })
    )
  } catch (e) {
    dispatch(
      authSlice.actions.setAuthSuccess({
        userData: null,
        status: 'error',
        message: e.response ? e.response.data.message : 'Извините, кажется что-то пошло не так',
        isAuth: false
      })
    )
  } finally {
    dispatch(authSlice.actions.setAuthResponse())
  }
}

export const signUp = (signUpDto: SignUpDto): Thunk => async dispatch => {
  dispatch(authSlice.actions.setAuthRequest())
  try {
    const response = await API.auth.signUp(signUpDto)
    const { status, message } = response
    dispatch(authSlice.actions.setAuthSuccess({ userData: null, status, message, isAuth: false }))
  } catch (e) {
    dispatch(
      authSlice.actions.setAuthSuccess({
        userData: null,
        status: 'error',
        message: e.response ? e.response.data.message : 'Извините, кажется что-то пошло не так',
        isAuth: false
      })
    )
  } finally {
    dispatch(authSlice.actions.setAuthResponse())
  }
}

export const signOut = (): Thunk => async dispatch => {
  dispatch(authSlice.actions.setAuthRequest())
  try {
    await API.auth.signOut()
    dispatch(
      authSlice.actions.setAuthSuccess({
        userData: null,
        status: null,
        message: null,
        isAuth: false
      })
    )
  } catch (e) {
  } finally {
    dispatch(authSlice.actions.setAuthResponse())
  }
}

export const selectAuthData = (state: RootState) => state.auth
