import React from 'react'
import styled from 'styled-components'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  margin?: string
  fullWidth?: boolean
}

export const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  margin: ${props => props.margin};
  height: 36px;
  background-color: ${props => props.theme.palette.primary.main};
  color: #ffffff;
  border-radius: ${props => props.theme.shape.borderRadius};
  font-size: ${props => props.theme.typography.fontSize};
  cursor: pointer;
  width: ${props => props.fullWidth && '100%'};

  &:disabled {
    background-color: #414040;
    color: #949494;
  }
`
