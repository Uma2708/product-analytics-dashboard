import { useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister } from '../api/authApi'

type User = { id: number; username: string; age: number; gender: string }

const AUTH_CHANGED_EVENT = 'auth-changed'

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    return null
  }
}

function hasStoredToken() {
  return Boolean(localStorage.getItem('token'))
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(() => readStoredUser())
  const [hasToken, setHasToken] = useState<boolean>(() => hasStoredToken())

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  useEffect(() => {
    setHasToken(hasStoredToken())
  }, [user])

  useEffect(() => {
    const syncFromStorage = () => {
      setUser(readStoredUser())
      setHasToken(hasStoredToken())
    }
    window.addEventListener(AUTH_CHANGED_EVENT, syncFromStorage)
    window.addEventListener('storage', syncFromStorage)

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, syncFromStorage)
      window.removeEventListener('storage', syncFromStorage)
    }
  }, [])

  const broadcastAuthChange = () => {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
  }

  const login = async (username: string, password: string) => {
    const res = await apiLogin({ username, password })
    const { token, user: u } = res.data
    localStorage.setItem('token', token)
    setUser(u)
    setHasToken(true)
    broadcastAuthChange()
    return u
  }

  const register = async (payload: { username: string; password: string; age: number; gender: string }) => {
    const res = await apiRegister(payload)
    const { token, user: u } = res.data
    localStorage.setItem('token', token)
    setUser(u)
    setHasToken(true)
    broadcastAuthChange()
    return u
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setHasToken(false)
    broadcastAuthChange()
  }

  return { user, login, logout, register, hasToken }
}
