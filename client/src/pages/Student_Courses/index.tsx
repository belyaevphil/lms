import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getOwnedCourses, selectCoursesData } from '../../store/courses'
import { Breadcrumbs, MyCourseCard } from '../../components'

import c from './style.module.scss'

export const StudentCourses: FC = () => {
  const { isLoading, courses } = useSelector(selectCoursesData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOwnedCourses({ pageNumber: 1, portionSize: 5 }))
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Breadcrumbs>Мои курсы</Breadcrumbs>
      <div className={c.courseCardsContainer}>
        {courses.length ? (
          courses.map(course => (
            <MyCourseCard
              key={`${course.id}${course.name}`}
              to={`/course/${course.id}`}
              course={course}
            />
          ))
        ) : (
          <div className={c.courseCardsPlaceholder}>У вас пока нет доступных курсов</div>
        )}
      </div>
    </>
  )
}
