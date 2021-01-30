import { User } from '../store/auth'
import { inst } from '.'

type GetAuthDataResponse = {
  success: boolean
  userData: User
}

type ResponseType = {
  success: boolean
  message: string
}

type SignUpResponse = ResponseType

type SignInResponse = ResponseType

type SignOutResponse = ResponseType

type AssignInstructorRoleResponse = ResponseType

export const usersAPI = {
  getAuthData: async () => {
    const response = await inst.get<GetAuthDataResponse>('/users/getAuthData')
    return response.data
  },
  signUp: async (
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await inst.post<SignUpResponse>('/users/signUp', {
      email,
      password,
      repeatPassword,
      firstName,
      lastName
    })
    return response.data
  },
  signIn: async (email: string, password: string) => {
    const response = await inst.post<SignInResponse>('/users/signIn', {
      email,
      password
    })
    return response.data
  },
  signOut: async () => {
    const response = await inst.get<SignOutResponse>('/users/signOut')
    return response.data
  },
  assignInstructorRole: async (email: string, courseName: string) => {
    const response = await inst.post<AssignInstructorRoleResponse>(
      '/users/assignInstructorRole',
      {
        email,
        courseName
      }
    )
    return response.data
  }
}
