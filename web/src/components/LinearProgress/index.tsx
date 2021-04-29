import styled from 'styled-components'

type LinearProgressProps = {
  styling: {
    width: string
    height: string
    background?: string
  }
}

export const LinearProgress = styled.div<LinearProgressProps>`
  width: ${props => props.styling.width};
  height: ${props => props.styling.height};
  background-color: ${props =>
    props.styling.background ? props.styling.background : props.theme.palette.primary.main};
`
