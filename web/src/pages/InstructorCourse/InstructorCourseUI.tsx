import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { InstructorCourseType } from 'types'
import { Button, Container, Grid, Typography, Alert, Preloader } from 'components'
import { ResponseMessage, ResponseStatus } from 'api'
import { InstructorLessonCard } from './InstructorLessonCard'

export type InstructorCourseUIProps = {
  instructorCourseResponseData: {
    status: ResponseStatus | null
    payload: {
      instructorCourse: InstructorCourseType
    } | null
    message: ResponseMessage
    isLoading: boolean
    removeMessage: () => void
  }
  instructorCourseId: string
}

export const InstructorCourseUI: React.FunctionComponent<InstructorCourseUIProps> = ({
  instructorCourseResponseData,
  instructorCourseId
}) => {
  if (instructorCourseResponseData.isLoading) {
    return (
      <Container>
        <Preloader />
      </Container>
    )
  }

  if (instructorCourseResponseData.status === 'error' || !instructorCourseResponseData.payload) {
    return (
      <Container>
        <Alert type={'error'}>{instructorCourseResponseData.message}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        {instructorCourseResponseData.payload.instructorCourse.name}
      </Typography>
      <Button as={RouterLink} to={`/instructor/courses/${instructorCourseId}/lessons/add`}>
        Добавить урок
      </Button>
      <Typography as={'p'} margin={'20px 0'}>
        {instructorCourseResponseData.payload.instructorCourse.description}
      </Typography>
      <Grid container as={'ul'} gap={10}>
        {instructorCourseResponseData.payload.instructorCourse.lessons.map(lesson => {
          return (
            <Grid item as={'li'} key={lesson.id} large={4} medium={6} small={12}>
              <InstructorLessonCard lesson={lesson} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
