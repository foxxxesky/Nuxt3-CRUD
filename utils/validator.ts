import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const userRegisterSchema = toTypedSchema(z.object({
  name: z.string({
    required_error: 'Name is required'
  })
    .min(3, 'Name must be at least 3 characters long'),
  email: z.string({
    required_error: 'Email is required'
  })
    .email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required'
  })
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirmation: z.string({
    required_error: 'Password confirmation is required'
  })
    .min(6, 'Password confirmation must be at least 6 characters long')
}))
