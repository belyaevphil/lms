import styled from 'styled-components'

import { Breakpoint } from 'theme/Themes'

type ContainerProps = {
  maxWidth?: Breakpoint
  padding?: string
}

export const Container = styled.div<ContainerProps>`
  max-width: ${props => (props.maxWidth ? props.maxWidth : '1280px')};
  padding: ${props => (props.padding ? props.padding : '0 20px')};
  margin: 0 auto;
`
