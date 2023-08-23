/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/default */

import jwt from 'jsonwebtoken'
import { userData } from '~/types'

const generateAccessToken = (user: userData) => {
  const config = useRuntimeConfig()

  return jwt.sign({
    userId: user.id,
    email: user.email
  }, config.jwtAccessTokenSecret, {
    expiresIn: '15m'
  })
}

const generateRefreshToken = (user: userData) => {
  const config = useRuntimeConfig()

  return jwt.sign({
    userId: user.id,
    email: user.email
  }, config.jwtRefreshTokenSecret, {
    expiresIn: '6h'
  })
}

export const generateTokens = (user: userData) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken,
    refreshToken
  }
}

export const sendRefreshToken = (event: any, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}
