import app from './app'
import { PORT } from './config/env'
import prisma from './config/db'

const port = Number(PORT) || 4000

async function start() {
  await prisma.$connect()
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

start().catch((e) => { console.error(e); process.exit(1) })
