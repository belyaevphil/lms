import { usersAPI } from '../api/usersAPI'
import { setMessage } from './serverResponses'
import { AppState, InferredActions, Thunk } from '.'

export interface User {
  userId: string | null
  userRoles: string[]
  userEmail: string | null
  userFirstName: string | null
  userLastName: string | null
}

interface AuthState {
  userData: User
  isLoading: boolean
  isAuth: boolean
}

const initialState: AuthState = {
  userData: {
    userId: null,
    userEmail: null,
    userRoles: [],
    userFirstName: null,
    userLastName: null
  },
  isLoading: false,
  isAuth: false
}

export const auth = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return {
        ...state,
        userData: {
          userId: null,
          userEmail: null,
          userRoles: [],
          userFirstName: null,
          userLastName: null
        },
        isLoading: true,
        isAuth: false
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        ...action.payload
      }
    case 'AUTH_RESPONSE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

type AuthActions = InferredActions<typeof authActions>

type AuthThunk = Thunk

export const authActions = {
  setAuthRequest: () => {
    return {
      type: 'AUTH_REQUEST'
    } as const
  },
  setAuthSuccess: (userData: User, isAuth: boolean) => {
    return {
      type: 'AUTH_SUCCESS',
      payload: {
        userData,
        isAuth
      }
    } as const
  },
  setAuthResponse: () => {
    return {
      type: 'AUTH_RESPONSE'
    } as const
  }
}

export const getAuthUserData = (): AuthThunk => async dispatch => {
  dispatch(authActions.setAuthRequest())
  try {
    const response = await usersAPI.getAuthData()
    const { success, userData } = response
    if (success) dispatch(authActions.setAuthSuccess(userData, true))
  } catch (e) {
  } finally {
    dispatch(authActions.setAuthResponse())
  }
}

export const signIn = (
  email: string,
  password: string
): AuthThunk => async dispatch => {
  dispatch(authActions.setAuthRequest())
  try {
    const response = await usersAPI.signIn(email, password)
    const { success } = response
    if (success) dispatch(getAuthUserData())
  } catch (e) {
    dispatch(setMessage('error', e))
    dispatch(authActions.setAuthResponse())
  }
}

export const signUp = (
  email: string,
  password: string,
  repeatPassword: string,
  firstName: string,
  lastName: string
): AuthThunk => async dispatch => {
  dispatch(authActions.setAuthRequest())
  try {
    const response = await usersAPI.signUp(
      email,
      password,
      repeatPassword,
      firstName,
      lastName
    )
    const { success, message } = response
    if (success) dispatch(setMessage('success', message))
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(authActions.setAuthResponse())
  }
}

export const signOut = (): AuthThunk => async dispatch => {
  dispatch(authActions.setAuthRequest())
  try {
    const response = await usersAPI.signOut()
    const { success } = response
    if (success) {
      dispatch(
        authActions.setAuthSuccess(
          {
            userId: null,
            userRoles: [],
            userEmail: null,
            userFirstName: null,
            userLastName: null
          },
          false
        )
      )
    }
  } catch (e) {
    dispatch(setMessage('error', e))
  } finally {
    dispatch(authActions.setAuthResponse())
  }
}

export const selectAuthData = (state: AppState) => state.auth
