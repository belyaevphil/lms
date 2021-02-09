import { AppState, InferredActions, Thunk } from '.'
import { authActions } from './auth'

export type Response = {
  type: 'success' | 'error'
  message: string
}

type InitialState = {
  responses: Response[]
}

const initialState: InitialState = {
  responses: []
}

export const serverResponses = (
  state = initialState,
  action: ServerResponsesActions
): InitialState => {
  switch (action.type) {
    case 'SERVER_RESPONSES_SET_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, action.payload.response]
      }
    case 'SERVER_RESPONSES_UNSET_RESPONSE':
      const newArr = [...state.responses]
      newArr.shift()
      return {
        ...state,
        responses: newArr
      }
    default:
      return state
  }
}

export type ServerResponsesActions = InferredActions<typeof serverResponsesActions>

export type ServerResponsesThunk = Thunk

export const serverResponsesActions = {
  createMessage: (response: Response) => {
    return {
      type: 'SERVER_RESPONSES_SET_RESPONSE',
      payload: {
        response
      }
    } as const
  },
  unsetMessage: () => {
    return {
      type: 'SERVER_RESPONSES_UNSET_RESPONSE'
    } as const
  }
}

export const setMessage = (
  type: 'success' | 'error',
  message: any
): ServerResponsesThunk => async dispatch => {
  const isError = type === 'error'

  if (isError && message.response.data.message === 'Пожалуйста, авторизуйтесь') {
    dispatch(
      authActions.setAuthSuccess(
        {
          userId: null,
          userRoles: [],
          userEmail: null,
          userFirstName: null,
          userLastName: null
        },
        false
      )
    )
  }

  dispatch(
    serverResponsesActions.createMessage({
      type,
      message: isError
        ? message.response
          ? message.response.data.message
          : 'Извините, кажется что-то пошло не так'
        : message
    })
  )
  setTimeout(() => {
    dispatch(serverResponsesActions.unsetMessage())
  }, 3000)
}

export const selectServerResponses = (state: AppState) => {
  return state.serverResponses.responses
}
