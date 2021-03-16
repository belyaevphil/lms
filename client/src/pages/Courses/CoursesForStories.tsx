import { FC } from 'react'

import { CourseCardForStories } from '../../components/CourseCard/CourseCardForStories'
import { Course } from '../../store/courses'

import c from './style.module.scss'

export type CoursesForStoriesProps = {
  courses: Course[]
}

export const CoursesForStories: FC<CoursesForStoriesProps> = ({ courses }) => {
  return (
    <>
      {courses.length ? (
        <ul className={c.courseCards}>
          {courses.map(course => (
            <CourseCardForStories key={`${course.id}${course.name}`} course={course} />
          ))}
        </ul>
      ) : (
        <div className={c.courseCardsPlaceholder}>Нет таких курсов</div>
      )}
    </>
  )
}
