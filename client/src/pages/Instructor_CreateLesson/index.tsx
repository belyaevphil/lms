import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Breadcrumbs, Input, Button, Form } from '../../components'
import { handleInputChange } from '../../helpers/validation'
import { createLesson } from '../../store/studentLesson'
import { useParams } from 'react-router-dom'
import { FileUploader } from '../../components/FileUploader'

export const InstructorCreateLesson: FC = () => {
  const { courseId } = useParams<{
    courseId: string
  }>()
  const dispatch = useDispatch()

  const [form, setForm] = useState<{
    name: string
    description: string
    nameError: string
    descriptionError: string
  }>({
    name: '',
    nameError: '',
    description: '',
    descriptionError: ''
  })

  const handleLessonCreation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = document.getElementById('creationLessonForm') as HTMLFormElement
    const formData = new FormData(formElement)
    formData.append('courseId', courseId)
    dispatch(createLesson(formData))
  }

  return (
    <>
      <Breadcrumbs>Преподавателю / Создать урок</Breadcrumbs>
      <Form id={'creationLessonForm'} onSubmit={handleLessonCreation}>
        <Input
          value={form.name}
          name={'name'}
          onChange={handleInputChange(setForm)}
          error={form.nameError}
          placeholder={'Название урока'}
          style={{ marginTop: '20px' }}
        />
        <Input
          value={form.description}
          name={'description'}
          onChange={handleInputChange(setForm)}
          error={form.descriptionError}
          placeholder={'Описание'}
        />
        <FileUploader style={{ marginTop: '20px' }} />
        <Button style={{ marginTop: '20px' }}>Создать</Button>
      </Form>
    </>
  )
}
