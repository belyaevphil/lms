import React from 'react'
import { useParams } from 'react-router-dom'

import { InstructorCourseType } from 'types'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'
import { InstructorCourseUI } from './InstructorCourseUI'

export const InstructorCourse: React.FunctionComponent = () => {
  // const [course, setCourse] = React.useState<InstructorCourseType>({
  //   name: 'Математика',
  //   description:
  //     'Это описание курса. Преподаватель проверяет задания по вторникам и четвергам, Это описание курса. Преподаватель проверяет задания по вторникам и четвергам Это описание курса. Преподаватель проверяет задания по вторникам и четвергам Это описание курса. Преподаватель проверяет',
  //   lessons: [
  //     {
  //       id: 1,
  //       courseId: 2,
  //       name: 'Урок 1'
  //     },
  //     {
  //       id: 2,
  //       courseId: 2,
  //       name: 'Урок 2'
  //     },
  //     {
  //       id: 3,
  //       courseId: 2,
  //       name: 'Урок 3'
  //     },
  //     {
  //       id: 4,
  //       courseId: 2,
  //       name: 'Урок 4'
  //     },
  //     {
  //       id: 5,
  //       courseId: 2,
  //       name: 'Урок 5'
  //     }
  //   ]
  // })
  const { instructorCourseId } = useParams<{ instructorCourseId: string }>()

  const getInstructorCourse = React.useCallback(
    () => API.courses.getInstructorCourse(Number(instructorCourseId)),
    [instructorCourseId]
  )
  const [instructorCourseResponseData] = useAsyncRequest<{ instructorCourse: InstructorCourseType }>(
    getInstructorCourse
  )

  return (
    <InstructorCourseUI
      instructorCourseResponseData={instructorCourseResponseData}
      instructorCourseId={instructorCourseId}
    />
  )
}
