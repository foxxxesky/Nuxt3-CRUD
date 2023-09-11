import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { getUserByEmail } from '~/server/db/users'

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: config.appSecret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret
    }),
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
      //   password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      // },
      async authorize (credentials: any) {
        const user = await getUserByEmail(credentials.email)
        // const user = {
        //   email: 'syariif@mail.com',
        //   password: '123456'
        // }

        if (credentials.email === user?.email && credentials.password === user?.password) {
          // Return the user object if credentials are valid
          return user
        } else {
          // Return null if credentials are invalid
          return null
        }
      }
    })
  ]
})
