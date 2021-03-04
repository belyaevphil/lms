import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { Course } from '../../store/courses'

import c from './style.module.scss'

type MyCourseCardProps = LinkProps & {
  course: Course
}

export const MyCourseCard: FC<MyCourseCardProps> = ({ course, ...rest }) => {
  return (
    <Link className={c.courseLink} {...rest}>
      {course.name}
    </Link>
  )
}
