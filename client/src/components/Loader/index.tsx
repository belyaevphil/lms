import { FC } from 'react'

import c from './style.module.scss'

export const Loader: FC = () => {
  return <div className={c.loader}>Loading...</div>
}
