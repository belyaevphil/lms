import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { app } from './appSlice'
import { auth } from './authSlice'
import { theme } from './themeSlice'

export const store = configureStore({
  reducer: {
    auth,
    app,
    theme
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Thunk<R = Promise<void>> = ThunkAction<R, RootState, unknown, Action>
