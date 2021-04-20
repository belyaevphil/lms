import React from 'react'

import { Grid, Container, Typography, Preloader, Alert } from 'components'
import { CourseForStudentCoursesPage } from 'types'
import { StudentCourseCard } from './StudentCourseCard'
import { ResponseMessage, ResponseStatus } from 'api'

export type StudentCoursesUIProps = {
  studentCoursesResponseData: {
    readonly status: ResponseStatus | null
    readonly payload: {
      courses: CourseForStudentCoursesPage[]
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
    readonly removeMessage: () => void
  }
}

export const StudentCoursesUI: React.FunctionComponent<StudentCoursesUIProps> = ({
  studentCoursesResponseData: { isLoading, status, payload, message }
}) => {
  if (isLoading) {
    return (
      <Container>
        <Preloader />
      </Container>
    )
  }

  if (status === 'error' || !payload) {
    return (
      <Container>
        <Alert type={'error'}>{message}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Курсы
      </Typography>
      <Grid container as={'ul'} gap={10}>
        {payload.courses.map(course => {
          return (
            <Grid item as={'li'} key={course.id} large={4} medium={6} small={12}>
              <StudentCourseCard course={course} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
