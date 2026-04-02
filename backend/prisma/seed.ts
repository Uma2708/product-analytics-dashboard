import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.featureClick.deleteMany()
  await prisma.user.deleteMany()

  const features = ['date_filter','age_filter','gender_filter','bar_chart_click','line_chart_focus','dashboard_load']

  const users = []
  for (let i = 1; i <= 10; i++) {
    const age = 16 + Math.floor(Math.random() * 50)
    const genders = ['Male', 'Female', 'Other']
    const gender = genders[Math.floor(Math.random() * genders.length)]
    const password = await bcrypt.hash('password', 8)
    const user = await prisma.user.create({ data: { username: `user${i}`, password, age, gender } })
    users.push(user)
  }

  const now = Date.now()
  const msInDay = 24 * 60 * 60 * 1000

  for (const u of users) {
    const clicksCount = 8 + Math.floor(Math.random() * 12)
    for (let j = 0; j < clicksCount; j++) {
      const daysAgo = Math.floor(Math.random() * 30)
      const timestamp = new Date(now - daysAgo * msInDay - Math.floor(Math.random() * msInDay))
      await prisma.featureClick.create({ data: { userId: u.id, featureName: features[Math.floor(Math.random() * features.length)], timestamp } })
    }
  }

  console.log('Seed complete')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
