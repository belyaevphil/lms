import React from 'react'
import { useParams } from 'react-router-dom'

import { StudentCourseUI } from './StudentCourseUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'

export const StudentCourse: React.FunctionComponent = () => {
  // const [course, setCourse] = React.useState<CourseForStudentCoursePage>({
  //   name: 'Математика',
  //   description:
  //     'Это описание курса. Преподаватель проверяет задания по вторникам и четвергам, Это описание курса. Преподаватель проверяет задания по вторникам и четвергам Это описание курса. Преподаватель проверяет задания по вторникам и четвергам Это описание курса. Преподаватель проверяет',
  //   completedLessonsCount: 2,
  //   lessonsCount: 10,
  //   averageGrade: 4.5,
  //   lessons: [
  //     {
  //       id: 1,
  //       name: 'Урок 1',
  //       description:
  //         'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //       grade: 2,
  //       status: 'выполнено'
  //     },
  //     {
  //       id: 2,
  //       name: 'Урок 2',
  //       description:
  //         'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //       grade: 4,
  //       status: 'выполнено'
  //     },
  //     {
  //       id: 3,
  //       name: 'Урок 3',
  //       description:
  //         'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //       grade: 3,
  //       status: 'выполнено'
  //     },
  //     {
  //       id: 4,
  //       name: 'Урок 4',
  //       description:
  //         'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //       grade: 4,
  //       status: 'выполнено'
  //     },
  //     {
  //       id: 5,
  //       name: 'Урок 5',
  //       description:
  //         'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //       grade: 5,
  //       status: 'выполнено'
  //     }
  //   ]
  // })
  const { studentCourseId } = useParams<{ studentCourseId: string }>()
  const getOneById = React.useCallback(() => API.courses.getOneById(Number(studentCourseId)), [
    studentCourseId
  ])
  const [studentCourseResponseData] = useAsyncRequest(getOneById)

  return (
    <StudentCourseUI
      studentCourseResponseData={studentCourseResponseData}
      studentCourseId={studentCourseId}
    />
  )
}
