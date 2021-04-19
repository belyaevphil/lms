import React from 'react'

import { StudentCoursesUI } from './StudentCoursesUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'

export const StudentCourses: React.FunctionComponent = () => {
  // const [courses, setCourses] = React.useState<CourseForStudentCoursesPage[]>([
  //   {
  //     id: 1,
  //     name: 'Математика',
  //     description:
  //       'Описание курса---Описание курса---Описание курса---Описание курса---Описание курса',
  //     completedLessonsCount: 5,
  //     lessonsCount: 27,
  //     averageGrade: 4
  //   },
  //   {
  //     id: 2,
  //     name: 'Русский язык',
  //     description:
  //       'Описание курса---Описание курса---Описание курса---Описание курса---Описание курса',
  //     completedLessonsCount: 6,
  //     lessonsCount: 12,
  //     averageGrade: 3
  //   },
  //   {
  //     id: 3,
  //     name: 'ОБЖ',
  //     description:
  //       'Описание курса---Описание курса---Описание курса---Описание курса---Описание курса',
  //     completedLessonsCount: 1,
  //     lessonsCount: 12,
  //     averageGrade: 5
  //   },
  //   {
  //     id: 4,
  //     name: 'История',
  //     description:
  //       'Описание курса---Описание курса---Описание курса---Описание курса---Описание курса',
  //     completedLessonsCount: 22,
  //     lessonsCount: 22,
  //     averageGrade: 4
  //   },
  //   {
  //     id: 5,
  //     name: 'География',
  //     description:
  //       'Описание курса---Описание курса---Описание курса---Описание курса---Описание курса',
  //     completedLessonsCount: 12,
  //     lessonsCount: 12,
  //     averageGrade: 4
  //   }
  // ])
  // const [courses, setCourses] = React.useState<CourseForStudentCoursesPage[]>([])
  const [studentCoursesResponseData] = useAsyncRequest(API.courses.get)

  return <StudentCoursesUI studentCoursesResponseData={studentCoursesResponseData} />
}
