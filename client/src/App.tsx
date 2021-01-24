import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeApp } from './store/app'
import { selectAppData } from './store/app'
import { selectAuthData } from './store/auth'
import { selectServerResponses } from './store/serverResponses'
import { ServerResponse } from './components/ServerResponse'
import { useRoutes } from './helpers/routes/routes'

export const App = () => {
  const {
    isAuth,
    userData: { userRoles }
  } = useSelector(selectAuthData)
  const serverResponses = useSelector(selectServerResponses)
  const dispatch = useDispatch()
  const { isInitialized } = useSelector(selectAppData)
  const routes = useRoutes(isAuth, userRoles)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) return <h1>Loading...</h1>

  return (
    <>
      {serverResponses.length ? (
        <ServerResponse serverResponses={serverResponses} />
      ) : null}
      {routes}
    </>
  )
}
