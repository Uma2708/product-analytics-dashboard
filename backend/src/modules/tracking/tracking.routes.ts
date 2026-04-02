import { Router } from 'express'
import prisma from '../../config/db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env'

const router = Router()

router.post('/', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'missing token' })
  const token = auth.split(' ')[1]
  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    const userId = payload.userId
    const { feature_name } = req.body
    const click = await prisma.featureClick.create({ data: { userId, featureName: feature_name } })
    res.json({ ok: true, click })
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' })
  }
})

export default router
