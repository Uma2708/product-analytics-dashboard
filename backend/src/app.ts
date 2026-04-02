import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import authRoutes from './modules/auth/auth.routes'
import trackingRoutes from './modules/tracking/tracking.routes'
import analyticsRoutes from './modules/analytics/analytics.routes'
import { FRONTEND_URL } from './config/env'

const app = express()

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (!allowedOrigins.length || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.options('*', cors())
app.use(json())

app.use('/api/auth', authRoutes)
app.use('/api/track', trackingRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/healthz', (req, res) => res.status(200).send('OK'))
app.get('/api/health', (req, res) => res.json({ ok: true }))

export default app
