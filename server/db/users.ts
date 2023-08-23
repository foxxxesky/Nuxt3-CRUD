/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/default */

import bcrypt from 'bcrypt'
import prisma from '~/server/db'
import { createUserPayload } from '~/types'

export const createUser = (userData: createUserPayload) => {
  // encrypt password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userData.password, salt)

  const finalUserData = {
    ...userData,
    email: userData.email.toLowerCase(),
    password: hash
  }

  return prisma.user.create({
    data: finalUserData
  })
}

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}
