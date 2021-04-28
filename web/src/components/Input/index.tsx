import React from 'react'
import styled, { css } from 'styled-components'

const InputWrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 10px;
  }
`

type InputFieldProps = {
  error?: string | boolean
  isCorrect?: boolean
}
const InputField = styled.input<InputFieldProps>`
  width: 100%;
  height: ${props => (props.height ? props.height : '36px')};
  border: 1px solid #c7c7c7;
  border-radius: ${props => props.theme.shape.borderRadius};
  line-height: 36px;
  padding: 8px 16px;
  color: ${props => props.theme.palette.text.primary};
  background-color: transparent;
  resize: vertical;

  &::placeholder {
    color: #959595;
  }

  &:disabled {
    background-color: #424242;
    border-color: #424242;
    cursor: not-allowed;

    &::placeholder {
      color: #424242;
    }
  }

  ${props =>
    props.error &&
    css`
      border-color: ${props => props.theme.palette.error.main};
      color: ${props => props.theme.palette.error.main};
      background-color: #fff9f9;

      &::placeholder {
        color: ${props => props.theme.palette.error.main};
      }
    `}

  ${props =>
    props.isCorrect &&
    css`
      border-color: ${props => props.theme.palette.success.main};
      color: ${props => props.theme.palette.success.main};
      background-color: #f3fff2;

      &::placeholder {
        color: ${props => props.theme.palette.success.main};
      }
    `}
`

const InputError = styled.div`
  width: 100%;
  color: ${props => props.theme.palette.error.main};
  margin-top: 4px;
`

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string | boolean
  multiline?: boolean
}

export const Input: React.FunctionComponent<InputProps> = ({ error, multiline, ...rest }) => {
  const isCorrect = !error && Boolean(rest.value)
  const isMultiline = multiline ? 'textarea' : 'input'

  return (
    <InputWrapper>
      <InputField as={isMultiline} error={error} isCorrect={isCorrect} {...rest} />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  )
}
