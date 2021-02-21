import { FC, HTMLAttributes, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { acquireCourse, Course, selectCoursesData } from '../../store/courses'
import { handleInputChange } from '../../helpers/validation'
import { Button } from '../Button'
import { Input } from '../Input'

import c from './style.module.scss'

export type CourseCardProps = HTMLAttributes<HTMLDivElement> & {
  course: Course
}

export const CourseCard: FC<CourseCardProps> = ({ course, ...rest }) => {
  const { isLoading } = useSelector(selectCoursesData)
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    codeword: string
    codewordError: string
  }>({
    codeword: '',
    codewordError: ''
  })

  const handleCodewordSending = () => {
    dispatch(acquireCourse({ courseId: String(course.id), codeword: form.codeword }))
  }

  const shouldButtonBeDisabled = !(form.codeword && !form.codewordError)

  return (
    <div className={c.courseWrapper} {...rest}>
      {course.name}
      <Input
        value={form.codeword}
        name={'codeword'}
        type={'password'}
        onChange={handleInputChange(setForm)}
        error={form.codewordError}
        placeholder={'Кодовое слово'}
        style={{ marginTop: '20px' }}
      />
      <Button
        disabled={shouldButtonBeDisabled || isLoading}
        style={{ marginTop: '20px' }}
        onClick={handleCodewordSending}
      >
        Получить курс
      </Button>
    </div>
  )
}
