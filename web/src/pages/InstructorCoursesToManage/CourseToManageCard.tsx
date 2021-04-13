import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Typography, Button, Paper, Box } from 'components'
import { InstructorCoursesToManageType } from 'types'

export type CourseToManageCardProps = {
  course: InstructorCoursesToManageType
}

export const CourseToManageCard: React.FunctionComponent<CourseToManageCardProps> = ({ course }) => {
  return (
    <Paper padding={'8px 16px'}>
      <Typography margin={'0 0 4px 0'}>{course.name}</Typography>
      <Box
        styling={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button as={RouterLink} to={`/instructor/courses/${course.id}`}>
          Перейти
        </Button>
      </Box>
    </Paper>
  )
}
