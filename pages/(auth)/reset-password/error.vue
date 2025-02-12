<script setup lang="ts">
  import { definePageMeta } from '#imports';
  import { navigateTo } from '#app';
  import { useLocalePath } from '#imports';
  
  definePageMeta({
    layout: "clean",
  });

  const onSubmit = async () => {
    try {
      navigateTo(useLocalePath()("/confirm-email/success"))
    } catch (error) {
      console.log('Error al enviar el correo de verificación', error)
    }
  }

</script>

<template>
  <StatusMessage
      type="error"
      title="Ocurrio un error"
      message="Ocurrió un problema. Por favor intentalo nuevamente."
      buttonText="Reintentar"
      :buttonAction=onSubmit
  />
</template>