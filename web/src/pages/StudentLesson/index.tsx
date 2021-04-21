import React from 'react'
import { useParams } from 'react-router-dom'

import { StudentLessonUI } from './StudentLessonUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'
import { useFormikRequest } from 'hooks/useFormikRequest'

export const StudentLessonPage: React.FunctionComponent = () => {
  // const [lesson, setLesson] = React.useState<LessonForStudentLessonPage>({
  //   id: 1,
  //   name: 'Пример названия урока',
  //   description:
  //     'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде',
  //   grade: 5,
  //   status: 'выполнено',
  //   files: [{ path: '/file', originalName: 'Название файла' }]
  // })
  const { studentLessonId } = useParams<{ studentLessonId: string }>()
  const getOneById = React.useCallback(() => API.lessons.getOneById(Number(studentLessonId)), [
    studentLessonId
  ])
  const [studentLessonResponseData] = useAsyncRequest(getOneById)

  const [addAnswerResponse, addAnswerRequest] = useFormikRequest(API.lessons.addAnswer)

  return (
    <StudentLessonUI
      studentLessonResponseData={studentLessonResponseData}
      addAnswerResponse={addAnswerResponse}
      addAnswerRequest={addAnswerRequest}
      studentLessonId={studentLessonId}
    />
  )
}
