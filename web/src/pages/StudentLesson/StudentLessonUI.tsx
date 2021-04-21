import React from 'react'
import * as yup from 'yup'
import { Formik, FormikHelpers } from 'formik'
import { ThemeContext } from 'styled-components'

import { Input, Button, Container, Typography, Box, Preloader, Alert } from 'components'
import { LessonForStudentLessonPage } from 'types'
import { ResponseMessage, ResponseStatus } from 'api'

export type StudentLessonUIProps = {
  studentLessonResponseData: {
    readonly status: ResponseStatus | null
    readonly payload: {
      lessonData: LessonForStudentLessonPage
    } | null
    readonly message: ResponseMessage
    readonly isLoading: boolean
    readonly removeMessage: () => void
  }
  addAnswerResponse: {
    readonly status: ResponseStatus | null
    readonly payload: null
    readonly message: ResponseMessage
    readonly removeMessage: () => void
  }
  addAnswerRequest: (values: any, formikHelpers: FormikHelpers<any>) => Promise<void>
  studentLessonId: string
}

export const StudentLessonUI: React.FunctionComponent<StudentLessonUIProps> = ({
  studentLessonResponseData: { isLoading, payload, status, message },
  addAnswerResponse,
  addAnswerRequest,
  studentLessonId
}) => {
  const theme = React.useContext(ThemeContext)

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
      <Typography as={'h1'}>{payload.lessonData.name}</Typography>
      <Typography as={'p'} margin={'20px 0'}>
        {payload.lessonData.description}
      </Typography>
      <Typography as={'p'} margin={'8px 0'}>
        Материалы к уроку
      </Typography>
      <Box
        styling={{
          margin: '0 0 20px 0'
        }}
      >
        {payload.lessonData.files.length
          ? payload.lessonData.files.map(file => (
              <Typography
                as={'button'}
                key={file.path}
                color={theme.palette.primary.dark}
                style={{ backgroundColor: 'transparent' }}
              >
                {file.originalName}
              </Typography>
            ))
          : 'Пока не добавлено ни одного материала'}
      </Box>
      {addAnswerResponse.status && addAnswerResponse.message && (
        <Alert
          type={addAnswerResponse.status}
          margin={'0 0 20px 0'}
          onClick={addAnswerResponse.removeMessage}
        >
          {addAnswerResponse.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          id: Number(studentLessonId),
          answer: payload.lessonData.answer || ''
        }}
        validationSchema={yup.object().shape({
          answer: yup.string().required('Ответ должен быть введен')
        })}
        onSubmit={addAnswerRequest}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder={'Ответ на задание'}
              name={'answer'}
              value={values.answer}
              error={touched.answer && errors.answer}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              height={'240px'}
            />
            <Button type={'submit'} disabled={isSubmitting} margin={'20px 0 0 0'}>
              Отправить
            </Button>
          </form>
        )}
      </Formik>
      <Typography margin={'20px 0 0 0'}>Текущая оценка: {payload.lessonData.grade || '-'}</Typography>
      <Typography margin={'20px 0 0 0'}>Статус: {payload.lessonData.status}</Typography>
    </Container>
  )
}
