<script setup>
const { useAuthUser } = useAuth()
const user = useAuthUser()

</script>

<template>
  <div>
    <div v-if="user">
      Home Page
    </div>
    <MoleculesAuthPage v-else />
  </div>
</template>
