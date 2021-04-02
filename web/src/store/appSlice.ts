import { createSlice } from '@reduxjs/toolkit'

import { RootState, Thunk } from 'store'
import { getAuthUserData } from './authSlice'

export type AppState = {
  isInitialized: boolean
}

const initialState: AppState = {
  isInitialized: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialize(state) {
      state.isInitialized = true
    }
  }
})

export const initializeApp = (): Thunk => async dispatch => {
  try {
    const userData = dispatch(getAuthUserData())

    Promise.all([userData]).then(() => {
      dispatch(appSlice.actions.initialize())
    })
  } catch (e) {}
}

export const app = appSlice.reducer

export const selectAppData = (state: RootState) => state.app
