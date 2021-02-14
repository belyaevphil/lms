import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { paths } from './paths'

type InstructorRouteProps = RouteProps & {
  isInstructor: boolean
}

export const InstructorRoute: FC<InstructorRouteProps> = ({ isInstructor, ...rest }) => {
  if (isInstructor) {
    return <Route {...rest} />
  } else {
    return <Redirect to={paths.COURSES} />
  }
}

type AdminRouteProps = RouteProps & {
  isAdmin: boolean
}

export const AdminRoute: FC<AdminRouteProps> = ({ isAdmin, ...rest }) => {
  if (isAdmin) {
    return <Route {...rest} />
  } else {
    return <Redirect to={paths.COURSES} />
  }
}
