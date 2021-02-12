import { ChangeEvent, Dispatch } from 'react'

const passwordLeastSymbolsCount = 6

const isLongerThan = (value: string, number: number): boolean => {
  return value.length >= number
}

const isEmailValid = (email: string): boolean => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regExp.test(email.toLowerCase())
}

const validate = (
  fieldName: string,
  fieldValue: string,
  formPassword?: string
): string | undefined => {
  if (!fieldValue) {
    return 'Поле не должно быть пустым'
  }

  if (fieldName === 'email' && !isEmailValid(fieldValue)) {
    return 'Введите корректный адрес эл. почты'
  }

  if (
    (fieldName === 'password' || fieldName === 'repeatPassword') &&
    !isLongerThan(fieldValue, passwordLeastSymbolsCount)
  ) {
    return `Пароль должен содержать минимум ${passwordLeastSymbolsCount} символов. Символов осталось: ${
      passwordLeastSymbolsCount - fieldValue.length
    }`
  }

  if (fieldName === 'repeatPassword' && fieldValue !== formPassword) {
    return 'Пароли должны совпадать'
  }

  return undefined
}

export const handleInputChange = (
  setForm: Dispatch<React.SetStateAction<any>>,
  formPassword?: string
) => (e: ChangeEvent<HTMLInputElement>): void => {
  const errorField = `${e.target.name}Error`
  const message = validate(e.target.name, e.target.value, formPassword)
  setForm((prevState: any) => ({
    ...prevState,
    [e.target.name]: e.target.value,
    [errorField]: message
  }))
}
