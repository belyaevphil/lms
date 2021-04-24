import styled, { css } from 'styled-components'

import { AlignItems, JustifyContent } from 'types/styling'

type Display = 'flex' | 'inline-flex'
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'

type BoxProps = {
  styling?: {
    display?: Display
    flexDirection?: FlexDirection
    justifyContent?: JustifyContent
    alignItems?: AlignItems
    margin?: string
    padding?: string
    position?: Position
    top?: string
    left?: string
    bottom?: string
    right?: string
    backgroundColor?: string
  }
}

export const Box = styled.div<BoxProps>`
  ${props =>
    props.styling &&
    css`
      display: ${props.styling.display ? props.styling.display : 'flex'};
      flex-direction: ${props.styling.flexDirection && props.styling.flexDirection};
      justify-content: ${props.styling.justifyContent && props.styling.justifyContent};
      align-items: ${props.styling.alignItems && props.styling.alignItems};
      position: ${props.styling.position && props.styling.position};
      top: ${props.styling.top && props.styling.top};
      left: ${props.styling.left && props.styling.left};
      right: ${props.styling.right && props.styling.right};
      bottom: ${props.styling.bottom && props.styling.bottom};
      background-color: ${props.styling.backgroundColor && props.styling.backgroundColor};
      margin: ${props.styling.margin && props.styling.margin};
      padding: ${props.styling.padding && props.styling.padding};
    `}
`
