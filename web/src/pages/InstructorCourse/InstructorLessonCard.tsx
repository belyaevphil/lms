import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { InstructorCourseLesson } from 'types'
import { Button, Typography, Box, Paper } from 'components'

export type InstructorLessonCardProps = {
  lesson: InstructorCourseLesson
}

export const InstructorLessonCard: React.FunctionComponent<InstructorLessonCardProps> = ({
  lesson
}) => {
  return (
    <Paper padding={'8px 16px'}>
      <Typography as={'h3'} margin={'0 0 4px 0'}>
        {lesson.name}
      </Typography>
      <Box
        styling={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button as={RouterLink} to={`/instructor/courses/${lesson.courseId}/lessons/${lesson.id}`}>
          Перейти
        </Button>
      </Box>
    </Paper>
  )
}
