import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { assignInstructorRole } from '../../store/courses'
import { Breadcrumbs, Button, Input } from '../../components'
import { handleInputChange } from '../../helpers/validation'

export const AdminAssignInstructorRole: FC = () => {
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    email: string
    courseName: string
    emailError: string
    courseNameError: string
  }>({
    email: '',
    courseName: '',
    emailError: '',
    courseNameError: ''
  })

  const handleAssignment = () => {
    dispatch(assignInstructorRole({ email: form.email, courseName: form.courseName }))
  }

  return (
    <>
      <Breadcrumbs>Администратору / Назначение ролей</Breadcrumbs>
      <Input
        value={form.email}
        name='email'
        onChange={handleInputChange(setForm)}
        error={form.emailError}
        placeholder='Адрес эл. почты пользователя'
        style={{ marginTop: '20px' }}
      />
      <Input
        value={form.courseName}
        name='courseName'
        onChange={handleInputChange(setForm)}
        error={form.courseNameError}
        placeholder='Название курса'
      />
      <Button style={{ marginTop: '20px' }} onClick={handleAssignment}>
        Назначить преподавателем
      </Button>
    </>
  )
}
