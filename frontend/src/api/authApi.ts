import api from './axios'

export const login = (payload: { username: string; password: string }) =>
  api.post('/auth/login', payload)

export const register = (payload: { username: string; password: string; age: number; gender: string }) =>
  api.post('/auth/register', payload)
