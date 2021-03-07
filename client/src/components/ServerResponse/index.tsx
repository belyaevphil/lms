import { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Response, unsetMessage } from '../../store/serverResponses'

import c from './style.module.scss'

type ServerResponseProps = {
  serverResponses: Response[]
}

export const ServerResponse: FC<ServerResponseProps> = ({ serverResponses }) => {
  const dispatch = useDispatch()

  const deleteMessage = (id: string) => () => {
    dispatch(unsetMessage(id))
  }

  return (
    <ul className={c.response}>
      {serverResponses.map((response, index) => (
        <li
          key={`${index} ${response.message}`}
          className={`${c.responseMessage} ${response.type === 'error' && c.error} ${
            response.type === 'success' && c.success
          }}`}
        >
          {response.message}
          <span onClick={deleteMessage(response.id)}>&#10006;</span>
        </li>
      ))}
    </ul>
  )
}
