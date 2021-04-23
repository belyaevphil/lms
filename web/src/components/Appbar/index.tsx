import { selectAuthData, signOut } from 'store/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AppbarUI } from './AppbarUI'

export const Appbar: React.FunctionComponent = ({ children }) => {
  const { userData } = useSelector(selectAuthData)
  const dispatch = useDispatch()

  const signOutRequest = () => dispatch(signOut())

  return (
    <AppbarUI userData={userData} signOutRequest={signOutRequest}>
      {children}
    </AppbarUI>
  )
}
