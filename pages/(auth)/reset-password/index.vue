<script setup lang="ts">
  definePageMeta({
    layout: "clean",
  });

  const onSubmit = async () => {
    try {
    } catch (error) {
      console.log('Error al enviar el correo de verificación', error)
    }
  }

</script>

<template>
  <StatusMessage
    type="loading"
    title="Verificando enlace..."
    message="Por favor espere mientras verificamos el enlace para restablecer contraseña."
  />
</template>