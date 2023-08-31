<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true
  }
})
</script>

<template>
  <MoleculesAuthForm />
</template>
