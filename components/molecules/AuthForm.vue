<script setup lang="ts">
interface loginForm {
  email: string
  password: string
  loading?: boolean
}

const data = reactive<loginForm>({
  email: '',
  password: '',
  loading: false
})

const handleLogin = async () => {
  const { login } = useAuth()
  // console.log(JSON.stringify(data))

  try {
    data.loading = true

    await login({
      email: data.email,
      password: data.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }
}
</script>

<template>
  <div>
    <div class="pt-5 space-y-6">
      <AtomicUIInput
        v-model="data.email"
        label="Email address"
        type="email"
        placeholder="your email"
      />
      <AtomicUIInput
        v-model="data.password"
        label="Passwords"
        type="password"
        placeholder="********"
      />

      <div>
        <button @click="handleLogin">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
