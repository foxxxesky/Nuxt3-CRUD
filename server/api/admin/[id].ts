// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export default defineEventHandler((event) => {
  const query = event.context.params
  return {
    query
  }
})
