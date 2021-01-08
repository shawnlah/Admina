import { LoginData } from "../interfaces/authentication"
import apiClient from "../utils/api"

export const login = async (data: LoginData) => {
  console.log(data)
  return (await apiClient.post('/auth/login', data))
}
