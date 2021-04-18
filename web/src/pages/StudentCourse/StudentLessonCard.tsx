import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Button, Paper, Typography, Box } from 'components'
import { LessonForStudentCoursePage } from 'types'

export type StudentLessonCardProps = {
  lesson: LessonForStudentCoursePage
  studentCourseId: string
}

export const StudentLessonCard: React.FunctionComponent<StudentLessonCardProps> = props => {
  return (
    <Paper padding={'8px 16px'}>
      <Typography as={'h3'} margin={'0 0 4px 0'}>
        {props.lesson.name}
      </Typography>
      <Typography margin={'0 0 4px 0'}>Оценка: {props.lesson.grade}</Typography>
      <Typography margin={'0 0 4px 0'}>Статус: {props.lesson.status}</Typography>
      <Box
        styling={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button as={RouterLink} to={`/courses/${props.studentCourseId}/lessons/${props.lesson.id}`}>
          Перейти
        </Button>
      </Box>
    </Paper>
  )
}
