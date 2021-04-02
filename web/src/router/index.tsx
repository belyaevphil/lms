import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Appbar } from 'components'
import { authenticatedRoutes, unauthenticatedRoutes } from 'router/routes'
import { AuthState } from 'store/authSlice'

type ProtectedProps = {
  userRoles: string[]
  roles: string[]
}

export const Protected: React.FunctionComponent<ProtectedProps> = ({
  userRoles,
  roles,
  children,
  ...rest
}) => {
  if (roles.every(role => userRoles.includes(role))) {
    if (!children) {
      return <Route {...rest} />
    } else {
      return <>{children}</>
    }
  } else {
    return null
  }
}

type RouterProps = {
  authData: AuthState
}

export const Router: React.FunctionComponent<RouterProps> = props => {
  const { isAuth, userData } = props.authData

  if (isAuth && userData) {
    return (
      <Appbar>
        <Switch>
          {authenticatedRoutes.map(authenticatedRoute => {
            return (
              <Protected
                key={authenticatedRoute.path}
                userRoles={userData.roles}
                {...authenticatedRoute}
              />
            )
          })}
          <Redirect to={'/courses'} />
        </Switch>
      </Appbar>
    )
  } else {
    return (
      <Switch>
        {unauthenticatedRoutes.map(unauthenticatedRoute => {
          return <Route key={unauthenticatedRoute.path} {...unauthenticatedRoute} />
        })}
        <Redirect to={'/sign-in'} />
      </Switch>
    )
  }
}
