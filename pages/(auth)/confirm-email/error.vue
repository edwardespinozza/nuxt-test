<script setup lang="ts">

  definePageMeta({
    layout: "clean",
  });

  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { AuthService } from '~/services/api/authService';
  import AlertError from '~/components/MyUi/AlertError.vue';

  const route = useRoute();
  const email = (route.query.email as string) || '';
  const errorCode = (route.query.error as string) || '';

  // Definimos las variables como `ref` para que sean reactivas
  const errorTitle = ref('');
  const errorMessage = ref('');
  const showButton = ref(false);

  const form = reactive({
    isSubmitting: false,
    errorGlobal: {
      isVisible: false as boolean,
      type: "success" as "success" | "error",
      title: null as string | null,
      description: null as string | null,
    }
  });

  function resetErrors() {
    Object.assign(form.errorGlobal, {
      isVisible: false,
      type: "success",
      title: null,
      description: null
    });
  }
  
  // Asignamos valores según el `errorCode`
  if (errorCode === 'expired_token') {
    errorTitle.value = 'Ocurrio un error'
    errorMessage.value = 'El enlace de verificación ha expirado. Por favor, solicita uno nuevo e inténtalo nuevamente.'
    showButton.value = true 

  } else if (errorCode === 'invalid_token') {
    errorTitle.value = 'Ocurrio un error'
    errorMessage.value = 'El enlace de verificación es invalido. Por favor, solicita uno nuevo e inténtalo nuevamente.'

  } else {
    errorTitle.value = 'Ocurrio un error'
    errorMessage.value = 'Por favor, inténtalo nuevamente.'
  }
  
  const onSubmit = async () => {
    resetErrors();
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      await AuthService.sendVerificationEmail(email)
      /* navigateTo(useLocalePath()("/verify-email")) */
      Object.assign(form.errorGlobal, {
        isVisible: true,
        type: "success",
        title: "¡Correo reenviado!",
        description: "Hemos enviado un nuevo enlace de activación a tu correo. Revisa tu bandeja de entrada o carpeta de spam."
      });
    } catch (error) {
      const toast = useToast()
      Object.assign(form.errorGlobal, {
        isVisible: true,
        type: "error",
        title: "No pudimos reenviar el correo.",
        description: "Hubo un problema al intentar reenviar el enlace de activación. Inténtalo nuevamente en unos minutos."
      });
    }
  }
  
</script>

<template>
  <div>
    <StatusMessage
      :type="'error'"
      :title="errorTitle"
      :message="errorMessage"
      buttonText="Reintentar Verificación"
      :buttonAction=onSubmit
      :showButton=showButton
    />
    <AlertError v-if=form.errorGlobal.isVisible :type="form.errorGlobal.type" :data="form.errorGlobal"/>
  </div>
</template>
