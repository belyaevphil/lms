import { FC } from 'react'

import c from './style.module.scss'

export const Breadcrumbs: FC = ({ children }) => {
  return <div className={c.breadcrumbs}>{children}</div>
}
