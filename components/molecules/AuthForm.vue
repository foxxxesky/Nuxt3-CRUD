<script setup lang="ts">
import { userRegisterSchema, userLoginSchema } from '~/utils/validator'

const form = ref('login')
const { signIn } = useAuth()
const { meta } = useForm()
const { $toast } = useNuxtApp()

interface loginForm {
  email: string
  password: string
  loading?: boolean
}

interface registrationForm {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  loading?: boolean
}

const userLogin = ref<loginForm>({
  email: '',
  password: '',
  loading: false
})

const userRegister = ref<registrationForm>({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  loading: false
})

async function login () {
  try {
    userLogin.value.loading = true

    await useFetch('/api/user/register', {
      method: 'POST',
      body: userLogin.value
    }).then((res) => {
      const data = res.data.value

      if (data?.statusCode !== 201) {
        throw new Error(data?.message)
      }

      useNuxtApp().$toast.success('Registration success, please login')
    })
  } catch (error: any) {
    $toast.error(error.message)
  } finally {
    userLogin.value.loading = false
  }
}

async function register () {
  const { password, passwordConfirmation } = userRegister.value

  try {
    userRegister.value.loading = true

    if (password !== passwordConfirmation) {
      throw new Error('Password and Password Confirmation must be the same')
    }

    await useFetch('/api/user/register', {
      method: 'POST',
      body: userRegister.value
    }).then((res) => {
      const data = res.data.value

      if (data?.statusCode !== 201) {
        throw new Error(data?.message)
      }

      useNuxtApp().$toast.success('Registration success, please login')
      form.value = 'login'
    })
  } catch (error: any) {
    $toast.error(error.message)
  } finally {
    userRegister.value.loading = false
  }
}
</script>

<template>
  <div v-if="form === 'login'">
    <h1 class="font-semibold text-2xl border-b border-rose-400 pb-2">
      Login
    </h1>
    <VeeForm
      :validation-schema="userLoginSchema"
      class="pt-5 space-y-6"
      @submit="signIn('credentials', userLogin)"
    >
      <AtomicUIInput
        v-model="userLogin.email"
        name="email"
        label="Email"
        type="email"
        placeholder="your email"
      />

      <AtomicUIInput
        v-model="userLogin.password"
        name="password"
        label="Password"
        type="password"
        placeholder="********"
      />

      <div class="flex">
        <button :disabled="meta.touched || userLogin.loading === true" class="p-2 rounded-md border border-slate-300 text-sm w-full hover:bg-slate-400 hover:cursor-pointer hover:text-white">
          Login
        </button>
      </div>

      <button class="flex text-sm text-slate-400 hover:text-slate-500 hover:underline" @click="form = 'register'">
        Don't have an account?
      </button>
    </VeeForm>
  </div>
  <div v-else>
    <h1 class="font-semibold text-2xl border-b border-rose-400 pb-2">
      Register
    </h1>
    <VeeForm
      :validation-schema="userRegisterSchema"
      class="pt-5 space-y-6"
      @submit="register"
    >
      <AtomicUIInput
        v-model="userRegister.name"
        name="name"
        label="Name"
        type="text"
        placeholder="your name"
      />

      <AtomicUIInput
        v-model="userRegister.email"
        name="email"
        label="Email"
        type="email"
        placeholder="your email"
      />

      <AtomicUIInput
        v-model="userRegister.password"
        name="password"
        label="Password"
        type="password"
        placeholder="********"
      />

      <AtomicUIInput
        v-model="userRegister.passwordConfirmation"
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        placeholder="********"
      />

      <div class="flex">
        <button :disabled="meta.touched || userRegister.loading === true" class="p-2 rounded-md border border-slate-300 text-sm w-full hover:bg-slate-400 hover:cursor-pointer hover:text-white">
          Register
        </button>
      </div>
      <button class="flex text-sm text-slate-400 hover:text-slate-500 hover:underline" @click="form = 'login'">
        Already have an account?
      </button>
    </VeeForm>
  </div>
</template>
