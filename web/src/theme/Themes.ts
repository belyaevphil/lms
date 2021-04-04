import { mergeDeep } from 'utils/object'
import { DeepPartial } from 'types'

export type Breakpoint = '0px' | '600px' | '960px' | '1280px' | '1920px'

const defaultTheme = {
  palette: {
    type: 'light',
    common: {
      black: '#000000',
      white: '#ffffff'
    },
    primary: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00'
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c'
    },
    text: {
      primary: '#111111'
    },
    backgroundColor: '#ffffff'
  },
  typography: {
    fontSize: '17px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  shape: {
    borderRadius: '4px'
  },
  shadows: {
    default: '0px 1px 5px 0px rgba(0,0,0,0.15)'
  }
}

export type Theme = typeof defaultTheme
export type ThemeOptions = DeepPartial<Theme>

export const createTheme = (options: ThemeOptions): Theme => {
  return mergeDeep({ ...defaultTheme }, options)
}

export const up = (bp: Breakpoint) => {
  return `@media only screen and (min-width: ${bp})`
}

export const down = (bp: Breakpoint) => {
  return `@media only screen and (max-width: ${bp})`
}
