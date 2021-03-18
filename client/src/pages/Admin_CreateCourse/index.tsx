import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Breadcrumbs, Input, Button } from '../../components'
import { handleInputChange } from '../../helpers/validation'
import { createCourse } from '../../store/courses'

export const AdminCreateCourse: FC = () => {
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    name: string
    nameError: string
    codeword: string
    codewordError: string
  }>({
    name: '',
    nameError: '',
    codeword: '',
    codewordError: ''
  })

  const handleCourseCreation = () => {
    dispatch(createCourse({ name: form.name, codeword: form.codeword }))
  }

  return (
    <>
      <Breadcrumbs>Администратору / Создать курс</Breadcrumbs>
      <Input
        value={form.name}
        name={'name'}
        onChange={handleInputChange(setForm)}
        error={form.nameError}
        placeholder={'Название курса'}
        style={{ marginTop: '20px' }}
      />
      <Input
        value={form.codeword}
        name={'codeword'}
        type={'password'}
        onChange={handleInputChange(setForm)}
        error={form.codewordError}
        placeholder={'Кодовое слово'}
      />
      <Button style={{ marginTop: '20px' }} onClick={handleCourseCreation}>
        Создать
      </Button>
    </>
  )
}
