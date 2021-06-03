import * as yup from 'yup'

export const validationSchemas = {
  auth: {
    signUp: yup.object().shape({
      username: yup.string().required('Имя пользователя должно быть заполнено'),
      password: yup
        .string()
        .required('Пароль должен быть введен')
        .min(6, 'Пароль должен содержать минимум 6 символов'),
      repeatPassword: yup
        .string()
        .required('Повторный пароль должен быть введен')
        .min(6, 'Повторный пароль должен содержать минимум 6 символов')
        .test({
          message: 'Пароли должны совпадать',
          test: function(value) {
            return this.parent.password === value
          }
        }),
      firstName: yup.string().required('Имя должно быть введено'),
      lastName: yup.string().required('Фамилия должна быть введена')
    }),
    signIn: yup.object().shape({
      username: yup.string().required('Имя пользователя должно быть заполнено'),
      password: yup
        .string()
        .required('Пароль должен быть введен')
        .min(6, 'Пароль должен содержать минимум 6 символов')
    })
  },
  course: {
    create: yup.object().shape({
      courseName: yup.string().required('Название курса должно быть введено')
    }),
    assign: yup.object().shape({
      username: yup.string().required('Имя пользователя должно быть заполнено'),
      courseName: yup.string().required('Название курса должно быть введено')
    }),
    assignInstructor: yup.object().shape({
      username: yup.string().required('Имя пользователя должно быть заполнено'),
      courseName: yup.string().required('Название курса должно быть введено')
    })
  },
  lesson: {
    create: yup.object().shape({
      name: yup.string().required('Название урока должно быть введено'),
      courseId: yup.number().required('ID курса должен быть введен'),
      description: yup.string().required('Описание урока должно быть введено')
    }),
    addAnswer: yup.object().shape({
      id: yup.number().required('ID урока должен быть введен'),
      answer: yup.string().required('Ответ должен быть введен')
    }),
    grade: yup.object().shape({
      id: yup.number().required('ID урока должен быть введен'),
      grade: yup.string().required('Оценка должна быть введена')
    })
  }
}
