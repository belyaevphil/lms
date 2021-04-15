import React from 'react'
import * as yup from 'yup'
import { Formik, FormikHelpers } from 'formik'

import { Input, Button, Container, Typography, FileUploader, Preloader, Alert } from 'components'
import { InstructorLesson } from 'types'
import { ResponseMessage, ResponseStatus } from 'api'

export type InstructorLessonUIProps = {
  instructorLessonResponseData: {
    readonly status: ResponseStatus | null
    readonly payload: {
      lessonData: InstructorLesson
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
    readonly removeMessage: () => void
  }
  instructorLessonId: string
  editInstructorLessonResponseData: {
    readonly status: ResponseStatus | null
    readonly payload: {
      lessonData: InstructorLesson
    } | null
    readonly message: ResponseMessage
    readonly removeMessage: () => void
  }
  editInstructorLessonRequest: (values: any, formikHelpers: FormikHelpers<any>) => Promise<void>
}

export const InstructorLessonUI: React.FunctionComponent<InstructorLessonUIProps> = ({
  instructorLessonResponseData: { isLoading, message, payload, status },
  instructorLessonId,
  editInstructorLessonResponseData,
  editInstructorLessonRequest
}) => {
  if (isLoading) {
    return (
      <Container>
        <Preloader />
      </Container>
    )
  }

  if (status === 'error' || !payload) {
    return (
      <Container>
        <Alert type={'error'}>{message}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Редактирование урока
      </Typography>
      {editInstructorLessonResponseData.status && editInstructorLessonResponseData.message && (
        <Alert
          type={editInstructorLessonResponseData.status}
          margin={'0 0 20px 0'}
          onClick={editInstructorLessonResponseData.removeMessage}
        >
          {editInstructorLessonResponseData.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          instructorLessonId,
          name: payload.lessonData.name,
          description: payload.lessonData.description,
          files: ''
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required('Название курса должно быть введено'),
          description: yup.string().required('Описание курса должно быть введено')
        })}
        onSubmit={editInstructorLessonRequest}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          dirty
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder={'Название курса'}
              name={'name'}
              value={values.name}
              error={touched.name && errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              placeholder={'Описание курса'}
              name={'description'}
              value={values.description}
              error={touched.description && errors.description}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              height={'240px'}
            />
            <FileUploader
              type={'file'}
              name={'files'}
              multiple
              max={3}
              onChange={e => setFieldValue('files', e.target.files)}
              margin={'20px 0 0 0'}
            />
            <Button type={'submit'} disabled={isSubmitting || !dirty} margin={'20px 0 0 0'}>
              Редактировать
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  )
}
