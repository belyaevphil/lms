import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Container, Grid, Typography, Button, Paper, Box, Preloader, Alert } from 'components'
import { GradeStudentLesson } from 'types'
import { ResponseMessage, ResponseStatus } from 'api'

export type InstructorLessonsToGradeUIProps = {
  instructorLessonsToGrade: {
    readonly status: ResponseStatus | null
    readonly payload: {
      lessons: GradeStudentLesson[]
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
    readonly removeMessage: () => void
  }
}

export const InstructorLessonsToGradeUI: React.FunctionComponent<InstructorLessonsToGradeUIProps> = ({
  instructorLessonsToGrade: { payload, isLoading, status, message }
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
        Проверка заданий
      </Typography>
      {payload.lessons.length ? (
        <Grid container as={'ul'} gap={10}>
          {payload.lessons.map(studentLesson => {
            return (
              <Grid item as={'li'} key={studentLesson.id} large={4} medium={6} small={12}>
                <Paper padding={'8px 16px'}>
                  <Typography margin={'0 0 4px 0'}>{studentLesson.name}</Typography>
                  <Box
                    styling={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button as={RouterLink} to={`/instructor/lessons/${studentLesson.id}/grade`}>
                      Перейти
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      ) : (
        'Нет заданий для проверки'
      )}
    </Container>
  )
}
