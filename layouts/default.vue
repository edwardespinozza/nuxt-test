<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main class="flex-1 p-6 flex items-center justify-center">
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
