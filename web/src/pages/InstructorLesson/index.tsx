import React from 'react'
import { useParams } from 'react-router-dom'

import { InstructorLessonUI } from './InstructorLessonUI'
import { API } from 'api'
import { useFormikRequest } from 'hooks/useFormikRequest'
import { useAsyncRequest } from 'hooks/useAsyncRequest'

// const lesson: InstructorLesson = {
//   id: 1,
//   courseId: 2,
//   name: 'Пример названия урока',
//   description:
//     'Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде---Здесь можно дать задание в текстовом виде'
// }

export const InstructorLessonPage: React.FunctionComponent = () => {
  const { instructorLessonId } = useParams<{ instructorLessonId: string }>()

  const getInstructorLesson = React.useCallback(
    () => API.lessons.getInstructorLesson(Number(instructorLessonId)),
    [instructorLessonId]
  )
  const [instructorLessonResponseData] = useAsyncRequest(getInstructorLesson)

  const [editInstructorLessonResponseData, editInstructorLessonRequest] = useFormikRequest(
    API.lessons.edit
  )

  return (
    <InstructorLessonUI
      instructorLessonResponseData={instructorLessonResponseData}
      instructorLessonId={instructorLessonId}
      editInstructorLessonResponseData={editInstructorLessonResponseData}
      editInstructorLessonRequest={editInstructorLessonRequest}
    />
  )
}
