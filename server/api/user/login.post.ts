/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/default */

import bcrypt from 'bcrypt'
import { createRefreshToken } from '~/server/db/refreshToken'

import { getUserByEmail } from '~/server/db/users'
import { userTransformer } from '~/server/transformers/users'
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt'
import { userLoginSchema } from '~/server/validator/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // check validation errors
    const validation = userLoginSchema.safeParse(body)

    if (!validation.success) {
      return {
        statusCode: 400,
        message: validation
      }
    }

    // is the user registered?
    const user = await getUserByEmail(body.email)

    if (!user) {
      return {
        statusCode: 400,
        message: 'User not found'
      }
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(body.password, user.password)

    if (!isPasswordValid) {
      return {
        statusCode: 400,
        message: 'Invalid password'
      }
    }

    // generate token
    const { accessToken, refreshToken } = generateTokens(user)

    // save token to db
    await createRefreshToken({
      token: refreshToken,
      userId: user.id
    })

    // add httpOnly cookie
    sendRefreshToken(event, refreshToken)

    return {
      statusCode: 200,
      body: {
        message: 'User logged in successfully',
        access_token: accessToken,
        refresh_token: refreshToken,
        user: userTransformer(user)
      }
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      body: {
        message: error.message || 'Internal server error'
      }
    }
  }
})
