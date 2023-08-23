import { userData } from '~/types'

export const userTransformer = (user: userData) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}
