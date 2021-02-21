import { FC, HTMLAttributes, useState } from 'react'

import { Course } from '../../store/courses'
import { handleInputChange } from '../../helpers/validation'
import { Button } from '../Button'
import { Input } from '../Input'

import c from './style.module.scss'

export type CourseCardForStoriesProps = HTMLAttributes<HTMLLIElement> & {
  course: Course
}

// export const CourseCardForStories: FC<CourseCardForStoriesProps> = ({ course, ...rest }) => {
//   const [form, setForm] = useState<{
//     codeword: string
//     codewordError: string
//   }>({
//     codeword: '',
//     codewordError: ''
//   })
//   const { codeword, codewordError } = form

//   const handleCodewordSending = () => {
//     console.log('codeword sent')
//   }

//   const shouldButtonBeDisabled = !(codeword && !codewordError)

//   return (
//     <li className={c.courseWrapper} {...rest}>
//       {course.name}
//       <Input
//         value={codeword}
//         name={'codeword'}
//         type={'password'}
//         onChange={handleInputChange(setForm)}
//         error={codewordError}
//         placeholder={'Кодовое слово'}
//         style={{ marginTop: '20px' }}
//       />
//       <Button
//         disabled={shouldButtonBeDisabled}
//         style={{ marginTop: '20px' }}
//         onClick={handleCodewordSending}
//       >
//         Получить курс
//       </Button>
//     </li>
//   )
// }

export const CourseCardForStories: FC<CourseCardForStoriesProps> = ({ course, ...rest }) => {
  return (
    <li className={c.course} {...rest}>
      <div className={c.course__upperPart}>
        <div className={c.course__name}>{course.name}</div>
        <div className={c.course__description}>{course.description}</div>
      </div>
      <div
        style={{
          width: `${course.completeness}%`,
          height: '2px',
          background: '#f25700'
        }}
      />
      <div className={c.course__bottomPart}>
        <span className={c.course__completeness}>{course.completeness}&#37;</span>
        <Button
          style={{
            backgroundColor: '#F25700',
            width: '100px'
          }}
        >
          Перейти
        </Button>
      </div>
    </li>
  )
}
