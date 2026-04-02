import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import authRoutes from './modules/auth/auth.routes'
import trackingRoutes from './modules/tracking/tracking.routes'
import analyticsRoutes from './modules/analytics/analytics.routes'

const app = express()
app.use(cors())
app.use(json())

app.use('/api/auth', authRoutes)
app.use('/api/track', trackingRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true }))

export default app
