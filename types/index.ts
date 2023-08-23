export interface userData {
    id: string
    name: string
    email: string
    createdAt?: Date
    updatedAt?: Date
}

export interface createUserPayload {
  name: string
  email: string
  password: string
}

export interface createRefreshTokenPayload {
  userId: string
  token: string
}
