<template>
  <div class="flex h-screen w-screen justify-center">
    <div class="hidden md:flex w-2/3">
      <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1682687218147-9806132dc697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1975&q=80">
    </div>
    <div class="flex justify-center md:w-1/3 px-4 py-12">
      <div class="flex justify-center items-center w-full h-full">
        <slot />
      </div>
    </div>
  </div>
</template>
