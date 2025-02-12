<script setup>
  definePageMeta({
    layout: "clean"
  })

  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'

  const route = useRoute()

  // Función para verificar el token
  const verifyToken = async (token) => {
    try {
      const { $api } = useNuxtApp()
      const response = await $api.get(`/auth/verify_email/${token}`)
      if (response.status === 200) {
        navigateTo(useLocalePath()("/confirm-email/success"))
      }
    } catch (error) {
      // Asegúrate de que 'error.data' y 'error.errorCode' existen
      const errorCode = error?.errorCode || "unknown-error";
      navigateTo(useLocalePath()(`/confirm-email/error?token=${token}&error=${errorCode}`));
    }
  }
  
  onMounted(async () => {
    const token = route.query.token
    if (!token) {      
      navigateTo(useLocalePath()("/confirm-email/error"));
      return;
    } 
    await verifyToken(token)    
  })

</script>

<template>
  <StatusMessage
    type="loading"
    title="Verificación de Email..."
    message="Por favor espere mientras realizamos la verificación."
  />
</template>
