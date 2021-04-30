import styled from 'styled-components'

type SelectProps = {
  backgroundColor?: string
}

export const Select = styled.select<SelectProps>`
  display: block;
  background-color: ${props => props.backgroundColor};
  border: 1px solid #111111;
  border-radius: ${props => props.theme.shape.borderRadius};
  cursor: pointer;
  width: 300px;
  height: 36px;
`
