<script setup>
  definePageMeta({
    layout: "clean",
  });
  
  const localePath = useLocalePath();
  const goToLogin = () => {
    navigateTo(localePath("/login")); // Redirige a la versión localizada de /login
  };
</script>

<template>

  <div>
    <StatusMessage
      type="success"
      title="Verificación exitosa"
      message="La verificacion del correo fue exitosas. ¡Ahora puedes ingresar a tu cuenta!"
      buttonText="Ingresar"
      :button-action="goToLogin"
    />
  </div>

</template>
