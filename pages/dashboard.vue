<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold">Bienvenido al Dashboard</h1>
    <p class="text-lg">Usuario: {{ authStore.user?.email }}</p>

    <UButton size="xl" class="mt-4 cursor-pointer" @click="logout">
          Cerrar Sesión
    </UButton>
  </div>
</template>

<script setup lang="js">
  import { navigateTo } from "#app";
  import { useAuthStore } from "~/stores/authStore";

  // Configura los metadatos de la página para utilizar el middleware 'auth'
  definePageMeta({
    middleware: "auth",
  });

  const authStore = useAuthStore();
  const toast = useToast()

  // Método logout
  async function logout() {
    try {
      await authStore.logout();
      toast.add({
        title: 'Cerrando sesión',
        description: 'Tu sesión ha sido cerrada con éxito',
        color: 'success',
      });
      await navigateTo("/en/login");

    } catch (error) {
      toast.add({
        title: 'Error al cerrar sesión',
        description: error.message || 'No se pudo cerrar la sesión. Vuelve a intentarlo más tarde.',
        color: 'error',
      });
      console.error("Error al cerrar sesión:", error);
    }
  }
</script>
