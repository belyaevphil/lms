import React from 'react'

import { Alert, Container, Grid, Preloader, Typography } from 'components'
import { InstructorCoursesToManageType } from 'types'
import { CourseToManageCard } from './CourseToManageCard'
import { ResponseStatus, ResponseMessage } from 'api'

export type InstructorCoursesToManageUIProps = {
  instructorCoursesToManage: {
    readonly status: ResponseStatus | null
    readonly payload: {
      courses: InstructorCoursesToManageType[]
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
  }
}

export const InstructorCoursesToManageUI: React.FunctionComponent<InstructorCoursesToManageUIProps> = ({
  instructorCoursesToManage: { isLoading, status, message, payload }
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
        Управление курсами
      </Typography>
      {payload.courses.length ? (
        <Grid container as={'ul'} gap={10}>
          {payload.courses.map(course => {
            return (
              <Grid item as={'li'} key={course.id} large={4} medium={6} small={12}>
                <CourseToManageCard course={course} />
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <Typography>Нет курсов</Typography>
      )}
    </Container>
  )
}
