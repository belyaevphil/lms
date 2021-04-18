import React from 'react'
import { ThemeContext } from 'styled-components'
import ProgressBar from 'react-customizable-progressbar'

import { Container, Grid, Typography, Box, Preloader, Alert } from 'components'
import { StudentLessonCard } from './StudentLessonCard'
import { CourseForStudentCoursePage } from 'types'
import { ResponseMessage, ResponseStatus } from 'api'

export type StudentCourseUIProps = {
  studentCourseResponseData: {
    readonly status: ResponseStatus | null
    readonly payload: {
      courseData: CourseForStudentCoursePage
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
    readonly removeMessage: () => void
  }
  studentCourseId: string
}

export const StudentCourseUI: React.FunctionComponent<StudentCourseUIProps> = ({
  studentCourseResponseData: { isLoading, status, payload, message },
  studentCourseId
}) => {
  const theme = React.useContext(ThemeContext)

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

  const completeness = Math.trunc(
    (payload.courseData.completedLessonsCount / payload.courseData.lessonsCount) * 100
  )

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        {payload.courseData.name}
      </Typography>
      <Box>
        <Box styling={{ display: 'inline-flex' }}>
          <Box
            styling={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography as={'span'}>Завершенность</Typography>
            <Box styling={{ position: 'relative', display: 'inline-flex' }}>
              <ProgressBar
                radius={60}
                progress={completeness}
                initialAnimation
                strokeColor={theme.palette.primary.main}
                strokeWidth={12}
                trackStrokeColor={'#eaedff'}
                trackStrokeWidth={16}
              />
              <Box
                styling={{
                  top: '0px',
                  left: '0px',
                  bottom: '0px',
                  right: '0px',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography as={'h2'}>{completeness}&#37;</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box styling={{ display: 'inline-flex' }}>
          <Box
            styling={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography as={'span'}>Средний балл</Typography>
            <Box
              styling={{
                position: 'relative',
                display: 'inline-flex'
              }}
            >
              <ProgressBar
                radius={60}
                progress={100}
                initialAnimation
                strokeColor={theme.palette.primary.main}
                strokeWidth={12}
                trackStrokeColor={'#eaedff'}
                trackStrokeWidth={16}
              />
              <Box
                styling={{
                  top: '0px',
                  left: '0px',
                  bottom: '0px',
                  right: '0px',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography as={'h2'}>{payload.courseData.averageGrade || 0}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography as={'p'} margin={'20px 0'}>
        {payload.courseData.description}
      </Typography>
      <Grid container as={'ul'} gap={10}>
        {payload.courseData.lessons.map(lesson => {
          return (
            <Grid item as={'li'} key={lesson.id} large={4} medium={6} small={12}>
              <StudentLessonCard lesson={lesson} studentCourseId={studentCourseId} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
