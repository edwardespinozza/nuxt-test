<script setup lang="ts">
  definePageMeta({
    layout: "clean",
  });

  const onSubmit = async () => {
    try {
      navigateTo(useLocalePath()("/login"))
    } catch (error) {
      console.log('Ocurrio un error', error)
    }
  }

</script>

<template>
  <StatusMessage
      :isSuccess="true"
      title="¡Contraseña actualizada con éxito!"
      message="Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva clave de acceso."
      buttonText="Ingresar"
      :buttonAction=onSubmit
  />
</template>