import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const DATABASE_URL = process.env.DATABASE_URL || ''
export const JWT_SECRET = process.env.JWT_SECRET || 'change_me'
export const FRONTEND_URL = process.env.FRONTEND_URL || ''

export const FRONTEND_ORIGIN = (() => {
  if (!FRONTEND_URL) return ''
  try {
    return new URL(FRONTEND_URL).origin
  } catch {
    return FRONTEND_URL
  }
})()
