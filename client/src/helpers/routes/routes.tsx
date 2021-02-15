import { Route, Switch, Redirect } from 'react-router-dom'

import { Header, NavBar } from '../../components'
import { AdminRoute, InstructorRoute } from './ProtectedRoutes'
import { paths } from './paths'
import {
  AdminAssignInstructorRole,
  AdminCreateCourse,
  Courses,
  ForgotPassword,
  InstructorCreateLesson,
  InstructorManageCourses,
  RestorePassword,
  SignIn,
  SignUp,
  StudentCourse,
  StudentCourses,
  StudentLesson
} from '../../pages'

import c from './routes.module.scss'

const checkRole = (expectedRole: string, roles: string[]) => {
  return roles.includes(expectedRole)
}

export const useRoutes = (isAuthenticated: boolean, roles: string[]) => {
  if (isAuthenticated) {
    return (
      <div className={c.appWrapper}>
        <Header />
        <div className={c.navbarAndContentWrapper}>
          <NavBar
            isInstructor={checkRole('преподаватель', roles)}
            isAdmin={checkRole('администратор', roles)}
          />
          <div className={c.contentWrapper}>
            <Switch>
              <Route path={paths.COURSES} exact component={Courses} />
              <Route path={paths.LESSON} exact component={StudentLesson} />
              <Route path={paths.MY_COURSES} exact component={StudentCourses} />
              <Route path={paths.COURSE} component={StudentCourse} />
              <InstructorRoute
                isInstructor={checkRole('преподаватель', roles)}
                path={paths.INSTRUCTOR_MANAGE_COURSES}
                exact
                component={InstructorManageCourses}
              />
              <InstructorRoute
                isInstructor={checkRole('преподаватель', roles)}
                path={paths.INSTRUCTOR_ADD_LESSON}
                exact
                component={InstructorCreateLesson}
              />
              <AdminRoute
                isAdmin={checkRole('администратор', roles)}
                path={paths.ADMIN_CREATE_COURSE}
                exact
                component={AdminCreateCourse}
              />
              <AdminRoute
                isAdmin={checkRole('администратор', roles)}
                path={paths.ADMIN_ASSIGN_INSTRUCTOR_ROLE}
                exact
                component={AdminAssignInstructorRole}
              />
              <Redirect to={paths.COURSES} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={c.authFormsWrapper}>
      <Switch>
        <Route path={paths.SIGN_UP} exact component={SignUp} />
        <Route path={paths.SIGN_IN} exact component={SignIn} />
        <Route path={paths.FORGOT_PASSWORD} exact component={ForgotPassword} />
        <Route path={paths.RESTORE_PASSWORD} exact component={RestorePassword} />
        <Redirect to={paths.SIGN_IN} />
      </Switch>
    </div>
  )
}
