export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')

  const setToken = (newToken: string) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser: string) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const login = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            email,
            password
          }
        })

        setToken(data.body.access_token)
        setUser(data.body.user)

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login,
    useAuthUser
  }
}
