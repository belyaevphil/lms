import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getOneCourseById, selectStudentCourse } from '../../store/studentCourse'
import { Breadcrumbs, LessonCard } from '../../components'

import c from './style.module.scss'

export const StudentCourse: FC = () => {
  const { id } = useParams<{
    id: string
  }>()
  const { isLoading, studentCourse } = useSelector(selectStudentCourse)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneCourseById({ courseId: Number(id) }))
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Breadcrumbs>Курсы / {studentCourse?.courseName}</Breadcrumbs>
      <div className={c.lessonsContainer}>
        {studentCourse && studentCourse.lessons.length ? (
          studentCourse.lessons.map(lesson => (
            <LessonCard
              key={`${lesson.id}${lesson.name}`}
              to={`/lesson/${lesson.id}`}
              lesson={lesson}
            />
          ))
        ) : (
          <div className={c.lessonsCardsPlaceholder}>Нет уроков</div>
        )}
      </div>
    </>
  )
}
