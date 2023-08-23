import prisma from '~/server/db'

export default defineEventHandler(async () => {
  try {
    const users = await prisma.user.findMany()
    return {
      statusCode: 200,
      body: {
        message: 'Users fetched successfully',
        users
      }
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      body: {
        message: error.message
      }
    }
  }
})
