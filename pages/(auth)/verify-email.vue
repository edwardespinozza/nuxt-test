<script setup lang="ts">
  import AlertError from '~/components/MyUi/AlertError.vue';
  import { AuthService } from '~/services/api/authService';
  import { reactive, onMounted } from "vue";

  definePageMeta({
    layout: "clean",
  });

  const route = useRoute();
  
  const form = reactive({
    isSubmitting: false,
    email: null as string | null,
    token: null as string | null,
  });

  const { feedback, resetFeedback, setGlobalFeedback } = useFormFeedback({});
  
  form.email = route.query.email ? decodeURIComponent(route.query.email as string) : null;
  form.token = route.query.token ? decodeURIComponent(route.query.token as string) : null;
  
  onMounted(() => {
    // Extraer parámetros de la URL
  });

  const onSubmit = async () => {
    resetFeedback();
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      await AuthService.sendVerificationEmail(form.token as string);
      setGlobalFeedback("success", "¡Correo reenviado!", "Hemos enviado un nuevo enlace de activación a tu correo. Revisa tu bandeja de entrada o carpeta de spam.")
    } catch (error) {
      setGlobalFeedback("error", "No pudimos reenviar el correo.", "Hubo un problema al intentar reenviar el enlace de activación. Inténtalo nuevamente en unos minutos.")
    }
  }

</script>

<template>
  
  <div class="flex flex-col w-full max-w-[450px] max items-center justify-center py-8 px-4">
    <StatusMessage
      type="other"
      icon="i-hugeicons:mail-open"
      title="¡Por favor verifica tu correo!"
      :message="`Te enviamos un correo de verificación a: <span class='font-semibold'>${form.email}</span>. Por favor, haz clic en el enlace dentro del correo para activar tu cuenta.<br>
      <span class='font-semibold'>¿No encuentras el correo?</span> 
      Revisa tu carpeta de spam o correo no deseado y asegúrate de que la dirección de email es correcta. 
      Si no recibiste el correo, haz clic en el botón de abajo para reenviarlo.`"
      buttonText="Reenviar enlace de activación"
      :buttonAction=onSubmit
    />
    <AlertError v-if=feedback.global.isVisible :data="feedback.global"/>
  </div>
</template>
