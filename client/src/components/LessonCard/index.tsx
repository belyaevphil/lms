import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { StudentLesson } from '../../store/studentLesson'

import c from './style.module.scss'

type LessonCardProps = LinkProps & {
  lesson: StudentLesson
}

export const LessonCard: FC<LessonCardProps> = ({ lesson, ...rest }) => {
  return (
    <Link className={c.lessonLink} {...rest}>
      {lesson.name}
    </Link>
  )
}
