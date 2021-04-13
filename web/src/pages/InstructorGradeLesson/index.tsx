import React from 'react'
import { useParams } from 'react-router-dom'

import { InstructorGradeLessonUI } from './InstructorGradeLessonUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'
import { LessonForInstructorGradeLessonPage } from 'types'
import { useFormikRequest } from 'hooks/useFormikRequest'

export const InstructorGradeLesson: React.FunctionComponent = () => {
  // const [lesson, setLesson] = React.useState<LessonForInstructorGradeLessonPage>({
  //   answer:
  //     'Это ответ ученика на задание---Это ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на заданиеЭто ответ ученика на задание'
  // })
  const { studentLessonId } = useParams<{ studentLessonId: string }>()

  const getInstructorLessonToGrade = React.useCallback(
    () => API.lessons.getInstructorLessonToGrade(Number(studentLessonId)),
    [studentLessonId]
  )
  const [instructorLessonToGradeData] = useAsyncRequest<{
    lesson: LessonForInstructorGradeLessonPage
  }>(getInstructorLessonToGrade)

  const [gradeLessonResponse, gradeLessonRequest] = useFormikRequest(API.lessons.grade)

  return (
    <InstructorGradeLessonUI
      instructorLessonToGradeData={instructorLessonToGradeData}
      gradeLessonResponse={gradeLessonResponse}
      gradeLessonRequest={gradeLessonRequest}
      studentLessonId={studentLessonId}
    />
  )
}
