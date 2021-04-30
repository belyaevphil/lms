import styled from 'styled-components'

type PaperProps = {
  padding?: string
}

export const Paper = styled.div<PaperProps>`
  background-color: ${props => props.theme.palette.common.white};
  box-shadow: ${props => props.theme.shadows.default};
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: ${props => (props.padding ? props.padding : '0')};
`
