import React from 'react'

import { InstructorLessonsToGradeUI } from './InstructorLessonsToGradeUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'

export const InstructorLessonsToGrade: React.FunctionComponent = () => {
  // const [studentsLessons, setStudentsLessons] = React.useState<GradeStudentLesson[]>([
  //   {
  //     id: 1,
  //     name: 'Урок 1'
  //   },
  //   {
  //     id: 2,
  //     name: 'Урок 2'
  //   },
  //   {
  //     id: 3,
  //     name: 'Урок 3'
  //   },
  //   {
  //     id: 4,
  //     name: 'Урок 4'
  //   },
  //   {
  //     id: 5,
  //     name: 'Урок 5'
  //   }
  // ])
  const [instructorLessonsToGrade] = useAsyncRequest(API.lessons.getInstructorLessonsToGrade)

  return <InstructorLessonsToGradeUI instructorLessonsToGrade={instructorLessonsToGrade} />
}
