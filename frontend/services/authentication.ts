import { LoginData } from "../interfaces/authentication"
import apiClient from "../utils/api"

export const login = async (data: LoginData) => {
  console.log(data)
  return (await apiClient.post('/auth/login', data))
}

export const logout = async (refreshToken: string) => {
  // need to remove refresh token in db from logout browser
  return (await apiClient.post('/', { refreshToken }))
}
