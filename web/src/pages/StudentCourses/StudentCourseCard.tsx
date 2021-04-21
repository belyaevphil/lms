import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Button, Paper, LinearProgress, Typography, Box } from 'components'
import { CourseForStudentCoursesPage } from 'types'

export type StudentCourseCardProps = {
  course: CourseForStudentCoursesPage
}

export const StudentCourseCard: React.FunctionComponent<StudentCourseCardProps> = ({ course }) => {
  const completeness = Math.trunc((course.completedLessonsCount / course.lessonsCount) * 100)

  return (
    <Paper>
      <Box
        styling={{
          padding: '8px 16px',
          flexDirection: 'column'
        }}
      >
        <Typography as={'h3'} margin={'0 0 4px 0'}>
          {course.name}
        </Typography>
        <Typography margin={'0 0 4px 0'}>{course.description}</Typography>
        <Typography>
          Выполнено заданий: {course.completedLessonsCount} / {course.lessonsCount}
        </Typography>
        <Typography>Средняя оценка: {course.averageGrade}</Typography>
      </Box>
      <LinearProgress styling={{ width: `${completeness}%`, height: '2px' }} />
      <Box
        styling={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 16px',
          backgroundColor: '#eaedff'
        }}
      >
        <Typography as={'h2'} lineHeight={'36px'}>
          {completeness}&#37;
        </Typography>
        <Button as={RouterLink} to={`/courses/${course.id}`}>
          Перейти
        </Button>
      </Box>
    </Paper>
  )
}
