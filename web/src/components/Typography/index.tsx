import styled from 'styled-components'

type TypographyProps = {
  margin?: string
  lineHeight?: string
  color?: string
}

export const Typography = styled.div<TypographyProps>`
  margin: ${props => props.margin};
  color: ${props => (props.color ? props.color : props.theme.palette.text.primary)};
  line-height: ${props => props.lineHeight};
`
