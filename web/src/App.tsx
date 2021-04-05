import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { Router } from 'router'
import { GlobalStyles } from 'theme/GlobalStyles'
import { selectTheme } from 'store/themeSlice'
import { selectAuthData } from 'store/authSlice'
import { initializeApp, selectAppData } from 'store/appSlice'
import { Preloader } from 'components'

export const App: React.FunctionComponent = () => {
  const { theme } = useSelector(selectTheme)
  const authData = useSelector(selectAuthData)
  const appData = useSelector(selectAppData)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!appData.isInitialized) return <Preloader />

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router authData={authData} />
    </ThemeProvider>
  )
}
