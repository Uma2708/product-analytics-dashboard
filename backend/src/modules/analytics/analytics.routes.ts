import { Router } from 'express'
import prisma from '../../config/db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config/env'

const router = Router()

router.get('/', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'missing token' })
  const token = auth.split(' ')[1]
  try {
    jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' })
  }

  const { startDate, endDate, ageGroup, gender, featureName } = req.query as any

  const filters: any = {}
  if (startDate || endDate) filters.timestamp = {}
  if (startDate) filters.timestamp.gte = new Date(`${startDate}T00:00:00.000Z`)
  if (endDate) filters.timestamp.lte = new Date(`${endDate}T23:59:59.999Z`)

  // Base filters apply to both charts.
  const baseAnd: any[] = []
  if (Object.keys(filters).length) baseAnd.push({ ...filters })
  if (gender && gender !== 'all') baseAnd.push({ user: { gender } })
  if (ageGroup && ageGroup !== 'all') {
    if (ageGroup === '<18') baseAnd.push({ user: { age: { lt: 18 } } })
    else if (ageGroup === '18-40') baseAnd.push({ user: { age: { gte: 18, lte: 40 } } })
    else if (ageGroup === '>40') baseAnd.push({ user: { age: { gt: 40 } } })
  }

  const where = baseAnd.length ? { AND: baseAnd } : undefined

  // Bar data: group by featureName using the shared filters only.
  const barRaw = await prisma.featureClick.groupBy({
    by: ['featureName'],
    where,
    _count: { _all: true },
  })
  const barData = barRaw.map((r: any) => ({ featureName: r.featureName, count: r._count._all }))

  // Line data: grouped by day for either the selected feature or the whole dashboard.
  const lineWhere = featureName ? { AND: [...baseAnd, { featureName }] } : where
  const clicks = await prisma.featureClick.findMany({
    where: lineWhere,
    select: { timestamp: true },
    orderBy: { timestamp: 'asc' },
  })

  const counts = new Map<string, number>()
  for (const click of clicks) {
    const day = click.timestamp.toISOString().slice(0, 10)
    counts.set(day, (counts.get(day) || 0) + 1)
  }

  let lineData: { day: string; count: number }[] = []
  if (startDate && endDate) {
    const start = new Date(`${startDate}T00:00:00.000Z`)
    const end = new Date(`${endDate}T00:00:00.000Z`)
    for (let cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const day = cursor.toISOString().slice(0, 10)
      lineData.push({ day, count: counts.get(day) || 0 })
    }
  } else {
    lineData = Array.from(counts.entries()).map(([day, count]) => ({ day, count }))
  }

  res.json({ filtersApplied: { startDate, endDate, ageGroup, gender, featureName }, barData, lineData })
})

export default router
