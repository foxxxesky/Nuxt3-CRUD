import { H3Event } from 'h3'
import prisma from '~/server/db'

import { userRegisterSchema } from '~/server/validator/schema'
import { createUser } from '~/server/db/users'
import { userTransformer } from '~/server/transformers/users'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)

    // check validation errors
    const validation = userRegisterSchema.safeParse(body)

    if (!validation.success) {
      return {
        statusCode: 400,
        body: {
          message: validation
        }
      }
    }

    // check if email already exists
    if (await prisma.user.findUnique({ where: { email: body.email } })) {
      return {
        statusCode: 400,
        body: {
          message: 'Email already exists'
        }
      }
    }

    const userData = {
      name: body.name,
      email: body.email,
      password: body.password
    }

    const user = await createUser(userData)

    const fetchUser = userTransformer(user)

    return {
      statusCode: 201,
      body: {
        message: 'User created successfully',
        user: fetchUser
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
