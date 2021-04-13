import { Formik, FormikHelpers } from 'formik'

import { Button, Typography, Container, Select, Alert } from 'components'
import { LessonForInstructorGradeLessonPage } from 'types'
import { Preloader } from 'components'
import { ResponseMessage, ResponseStatus } from 'api'

export type InstructorGradeLessonUIProps = {
  instructorLessonToGradeData: {
    status: ResponseStatus | null
    payload: {
      lesson: LessonForInstructorGradeLessonPage
    } | null
    message: ResponseMessage
    isLoading: boolean
    removeMessage: () => void
  }
  gradeLessonResponse: {
    readonly status: ResponseStatus | null
    readonly payload: null
    readonly message: ResponseMessage
    readonly removeMessage: () => void
  }
  gradeLessonRequest: (values: any, formikHelpers: FormikHelpers<any>) => Promise<void>
  studentLessonId: string
}

export const InstructorGradeLessonUI: React.FunctionComponent<InstructorGradeLessonUIProps> = ({
  instructorLessonToGradeData,
  gradeLessonResponse,
  gradeLessonRequest,
  studentLessonId
}) => {
  if (instructorLessonToGradeData.isLoading) {
    return (
      <Container>
        <Preloader />
      </Container>
    )
  }

  if (instructorLessonToGradeData.status === 'error' || !instructorLessonToGradeData.payload) {
    return (
      <Container>
        <Alert type={'error'}>{instructorLessonToGradeData.message}</Alert>
      </Container>
    )
  }

  return (
    <Container>
      <Typography as={'h1'} margin={'0 0 20px 0'}>
        Выставление оценки
      </Typography>
      <Typography as={'p'} margin={'0 0 20px 0'}>
        {instructorLessonToGradeData.payload.lesson.answer}
      </Typography>
      {gradeLessonResponse.status && gradeLessonResponse.message && (
        <Alert
          type={gradeLessonResponse.status}
          margin={'0 0 20px 0'}
          onClick={gradeLessonResponse.removeMessage}
        >
          {gradeLessonResponse.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          id: Number(studentLessonId),
          grade: 5
        }}
        onSubmit={gradeLessonRequest}
      >
        {formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <Select
              name={'grade'}
              value={formProps.values.grade}
              onChange={formProps.handleChange}
              backgroundColor={'#ffffff'}
            >
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Select>
            <Button type={'submit'} disabled={formProps.isSubmitting} margin={'20px 0 0 0'}>
              Выставить
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  )
}
