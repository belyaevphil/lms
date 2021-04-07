import React from 'react'

import { Container } from 'components'
import { AssignCourseForm } from './AssignCourseForm'
import { AssignInstructorForm } from './AssignInstructorForm'
import { CreateCourseForm } from './CreateCourseForm'

export const AdminManagement: React.FunctionComponent = () => {
  return (
    <Container>
      <CreateCourseForm />
      <AssignInstructorForm />
      <AssignCourseForm />
    </Container>
  )
}
