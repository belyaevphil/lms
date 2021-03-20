import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getInstuctorCourses, selectCoursesData } from '../../store/courses'
import { Breadcrumbs, InstructorCourseCard } from '../../components'

import c from './style.module.scss'

export const InstructorManageCourses: FC = () => {
  const { isLoading, courses } = useSelector(selectCoursesData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInstuctorCourses({ pageNumber: 1, portionSize: 5 }))
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Breadcrumbs>Преподавателю / Управление курсами</Breadcrumbs>
      <div className={c.courseCardsContainer}>
        {courses.length ? (
          courses.map(course => (
            <InstructorCourseCard
              key={`${course.id}${course.name}`}
              to={`/instructor/add_lesson/${course.id}`}
              course={course}
            />
          ))
        ) : (
          <div className={c.courseCardsPlaceholder}>Вы пока не ведете ни один из курсов</div>
        )}
      </div>
    </>
  )
}
