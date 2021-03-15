import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getManyCourses, selectCoursesData } from '../../store/courses'
import { Breadcrumbs, CourseCard } from '../../components'

import c from './style.module.scss'

export const Courses: FC = () => {
  const { isLoading, courses } = useSelector(selectCoursesData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getManyCourses({ pageNumber: 1, portionSize: 5 }))
  }, [])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      {courses.length ? (
        <ul className={c.courseCardsContainer}>
          {courses.map(course => (
            <CourseCard key={`${course.id}${course.name}`} course={course} />
          ))}
        </ul>
      ) : (
        <div className={c.courseCardsPlaceholder}>Нет таких курсов</div>
      )}
    </>
  )
}
