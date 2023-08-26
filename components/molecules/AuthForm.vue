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
        <button>
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
