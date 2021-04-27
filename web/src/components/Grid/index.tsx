import styled, { css } from 'styled-components'
import { down } from 'theme/Themes'

import { AlignItems, JustifyContent } from 'types/styling'

const COLUMNS_COUNT = 12
type SpanCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const columnWidth = (columnsCount: SpanCount) => css`
  width: calc(100% / ${COLUMNS_COUNT} * ${columnsCount});
`

const columnWidthFrom = (columnsCount: SpanCount, media: string) => css`
  ${media} {
    width: calc(100% / ${COLUMNS_COUNT} * ${columnsCount});
  }
`

type GridProps = {
  container?: boolean
  item?: boolean
  gap?: number
  extraSmall?: SpanCount
  small?: SpanCount
  medium?: SpanCount
  large?: SpanCount
  justifyContent?: JustifyContent
  alignItems?: AlignItems
}

export const Grid = styled.div<GridProps>`
  ${props =>
    props.container &&
    css`
      display: flex;
      flex-wrap: wrap;
      margin: ${props.gap && `0 -${props.gap / 2}px`};
      ${props.justifyContent &&
      css`
        justify-content: ${props.justifyContent};
      `}
      ${props.alignItems &&
      css`
        align-items: ${props.alignItems};
      `}

      > li {
        padding: ${props.gap && `${props.gap / 2}px`};
      }
    `}
  ${props =>
    props.item &&
    css`
      ${columnWidth(4)};
      ${props.large && columnWidthFrom(props.large, down('1280px'))}
      ${props.medium && columnWidthFrom(props.medium, down('960px'))}
      ${props.small && columnWidthFrom(props.small, down('600px'))}
      ${props.extraSmall && columnWidthFrom(props.extraSmall, down('0px'))}
    `}
`
