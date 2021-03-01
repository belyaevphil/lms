import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { Course } from '../../store/courses'

import c from './style.module.scss'

type InstructorCourseCardProps = LinkProps & {
  course: Course
}

export const InstructorCourseCard: FC<InstructorCourseCardProps> = ({ course, ...rest }) => {
  return (
    <Link className={c.instructorCourseLink} {...rest}>
      {course.name}
    </Link>
  )
}
