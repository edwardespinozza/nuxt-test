<template>
  <div class="flex flex-col min-h-screen bg-gray-100 w-full">
    <div class="flex items-center justify-center py-8 px-4">
      <NavLogo/>
    </div>
    <!-- <main class="flex items-center justify-center"> -->
      <main class="flex-1 flex items-center justify-center pb-16 px-4">
      <slot />
      </main>
    <UNotifications />
  </div>
</template>

<script setup>
  import NavLogo from '~/components/Navbar/NavLogo.vue'
  /* useHead({
    titleTemplate: "%s - Intro Nuxt",
  }); */
</script>
