import axios from 'axios'

export const inst = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api'
})
