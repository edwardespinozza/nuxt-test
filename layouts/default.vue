<template>
    <!-- <div class="flex flex-col min-h-screen bg-[#F2F2F2]"> -->
    <div id="container" class="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main class="flex-1 p-6 flex justify-center mx-10">
        <slot />
      </main>      
      <footer class="bg-primary text-white p-4 text-center">
        &copy {{ new Date().getFullYear() }} Mi App | Todos los derechos reservados
      </footer>
      <UNotifications />
    </div>
</template>

<script setup>
  const currentYear = new Date().getFullYear();
  useHead({
    titleTemplate: "%s - Intro Nuxt",
  });
</script>

<style>
html {
    overflow-y: scroll;
}
</style>