import prisma from '~/server/db'
import { createRefreshTokenPayload } from '~/types'

export const createRefreshToken = (refreshToken: createRefreshTokenPayload) => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}
