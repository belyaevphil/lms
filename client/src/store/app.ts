import { getAuthUserData } from './auth'
import { AppState, InferredActions, Thunk } from '.'

interface AppReducerState {
  isInitialized: boolean
}

const initialState: AppReducerState = {
  isInitialized: false
}

export const app = (
  state = initialState,
  action: AppActions
): AppReducerState => {
  switch (action.type) {
    case 'app/APP_INITIALIZE':
      return {
        ...state,
        isInitialized: true
      }
    default:
      return state
  }
}

type AppActions = InferredActions<typeof appActions>

type AppThunk = Thunk

export const appActions = {
  initializedSuccess: () => {
    return {
      type: 'app/APP_INITIALIZE'
    } as const
  }
}

export const initializeApp = (): AppThunk => async dispatch => {
  try {
    const userData = dispatch(getAuthUserData())

    Promise.all([userData]).then(() => {
      dispatch(appActions.initializedSuccess())
    })
  } catch (e) {}
}

export const selectAppData = (state: AppState) => state.app
