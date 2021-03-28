import axios from 'axios'
import { toast } from 'react-toastify'

import { store } from 'store'
import { setAuthSuccess } from 'store/authSlice'

export const inst = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api'
})

inst.interceptors.response.use(undefined, (error: any) => {
  if (error.response?.status === 401) {
    store.dispatch(setAuthSuccess({ userData: null, isAuth: false }))
  }

  // if (!error.response) {
  //   toast.error('Извините, кажется что-то пошло не так')
  // } else {
  //   toast.error(error.response.data.message)
  // }

  return Promise.reject(error)
})
