<script setup lang="ts">
interface loginForm {
  email: string
  password: string
}

const data = reactive<loginForm>({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log(JSON.stringify(data))
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
