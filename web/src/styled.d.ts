import 'styled-components'

import { Theme } from './theme/Themes'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
