<script setup lang="ts">
import { userRegisterSchema } from '~/utils/validator'

const { meta } = useForm()
const { $toast } = useNuxtApp()

interface regForm {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  loading?: boolean
}

const user = ref<regForm>({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  loading: false
})

async function register () {
  const { password, passwordConfirmation } = user.value

  try {
    user.value.loading = true

    if (password !== passwordConfirmation) {
      throw new Error('Password and Password Confirmation must be the same')
    }

    await useFetch('/api/user/register', {
      method: 'POST',
      body: user.value
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
    user.value.loading = false
  }
}
</script>

<template>
  <VeeForm
    :validation-schema="userRegisterSchema"
    class="pt-5 space-y-6"
    @submit="register"
  >
    <AtomicUIInput
      v-model="user.name"
      name="name"
      label="Name"
      type="text"
      placeholder="your name"
    />

    <AtomicUIInput
      v-model="user.email"
      name="email"
      label="Email address"
      type="email"
      placeholder="your email"
    />

    <AtomicUIInput
      v-model="user.password"
      name="password"
      label="Passwords"
      type="password"
      placeholder="********"
    />

    <AtomicUIInput
      v-model="user.passwordConfirmation"
      name="passwordConfirmation"
      label="Password Confirmation"
      type="password"
      placeholder="********"
    />

    <div class="flex">
      <button :disabled="meta.touched || user.loading === true" class="p-2 rounded-md border border-slate-300 text-sm w-full hover:bg-slate-400 hover:cursor-pointer hover:text-white">
        Submit
      </button>
    </div>
  </VeeForm>
</template>
