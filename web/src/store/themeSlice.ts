import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

import { createTheme, ThemeOptions, Theme } from 'theme/Themes'
import { mergeDeep } from 'utils/object'

const STORAGE_THEME = 'theme'

const getInitialTheme = () => {
  const theme = localStorage.getItem(STORAGE_THEME)

  if (theme) {
    return JSON.parse(theme) as Theme
  } else {
    return createTheme({})
  }
}

export type ThemeState = {
  theme: Theme
}

const initialState: ThemeState = {
  theme: getInitialTheme()
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeOptions>) {
      const theme = localStorage.getItem(STORAGE_THEME)
      let newTheme
      if (theme) {
        newTheme = mergeDeep({ ...(JSON.parse(theme) as Theme) }, action.payload)
      } else {
        newTheme = createTheme(action.payload)
      }

      localStorage.setItem(STORAGE_THEME, JSON.stringify(newTheme))
      state.theme = newTheme
    }
  }
})

export const theme = themeSlice.reducer

export const selectTheme = (state: RootState) => state.theme
