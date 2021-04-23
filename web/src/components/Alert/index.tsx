import styled from 'styled-components'

export type AlertProps = {
  type: 'success' | 'error'
  margin?: string
}

export const Alert = styled.div<AlertProps>`
  padding: 8px 16px;
  margin: ${props => props.margin};
  color: ${props =>
    ({
      success: props.theme.palette.success.main,
      error: props.theme.palette.error.main
    }[props.type])};
  border: 1px solid
    ${props =>
      ({
        success: props.theme.palette.success.main,
        error: props.theme.palette.error.main
      }[props.type])};
  border-radius: ${props => props.theme.shape.borderRadius};
  cursor: ${props => props.onClick && 'pointer'};
`
