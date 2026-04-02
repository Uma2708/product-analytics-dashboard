import { Router } from 'express'
import prisma from '../../config/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env'

const router = Router()

router.post('/register', async (req, res) => {
  const { username, password, age, gender } = req.body
  if (!username || !password) return res.status(400).json({ message: 'username and password required' })
  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) return res.status(400).json({ message: 'username exists' })
  const hashed = await bcrypt.hash(password, 8)
  const user = await prisma.user.create({ data: { username, password: hashed, age: Number(age) || 0, gender } })
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET)
  res.json({ token, user: { id: user.id, username: user.username, age: user.age, gender: user.gender } })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.status(400).json({ message: 'invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(400).json({ message: 'invalid credentials' })
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET)
  res.json({ token, user: { id: user.id, username: user.username, age: user.age, gender: user.gender } })
})

export default router
