<script setup lang="ts">
  definePageMeta({
    layout: "clean",
  });

  import { getForgotPasswordSchema } from '~/schemas/forgotPasswordSchema';
  import type { FormSubmitEvent, FormErrorEvent } from '#ui/types';
  import * as v from 'valibot';
  import { useI18n } from 'vue-i18n';
  import AlertError from '~/components/MyUi/AlertError.vue';
  import { AuthService } from '~/services/api/authService';

  const { t } = useI18n();
  const forgotPasswordSchema = getForgotPasswordSchema();
  type ForgotPasswordSchemaType = v.InferOutput<typeof forgotPasswordSchema>;
  

  const { feedback, resetFeedback, setGlobalFeedback } = useFormFeedback({
    email: "",
  });

  const form = reactive({
    email: "",
    isSubmitting: false,  
  });

  async function onSubmit(event: FormSubmitEvent<ForgotPasswordSchemaType>) {
    resetFeedback();
    form.isSubmitting = true;
    try {

      await AuthService.request_password_reset(form.email);
      setGlobalFeedback("success", "Correo de recuperación enviado", "Hemos enviado un enlace para restablecer tu contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones.");
    } catch (error: any) {
      setGlobalFeedback("error", "Algo salio mal", "Verifica que el correo ingresado sea correcto e inténtalo nuevamente.");
      const errorField = "email"
      if (errorField) {
        const element = document.getElementById(errorField);
        element?.focus();
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      form.isSubmitting = false;
    }
  }

  async function onError(event: FormErrorEvent) {
    console.log("disparado de de onError, el event es: ", event);
    
    const errorField = event?.errors?.[0]?.id;
    if (errorField) {
      const element = document.getElementById(errorField);
      element?.focus();
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

</script>

<template>  
  <div class="w-full max-w-[450px] flex-initial py-8">
    <div class="px-5">
      <h1 class="text-2xl font-bold tracking-tight text-center">
        Recupera tu contraseña
      </h1>
      <!-- Formulario de solicitud de restablecimiento de contraseña -->
      <UForm
        :schema="v.safeParser(forgotPasswordSchema)"
        :state="form"
        class="space-y-4 mt-8 light"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Campo de Email -->
        <UFormGroup 
          :label="t('auth.labels.email')" 
          name="email" 
          size="xl" 
          required
          :error="feedback.field.email || undefined"
        >
          <UInput
            v-model="form.email"
            class="w-full"
            @keydown.space.prevent 
            auto
            autocomplete="email"
            placeholder="Ingresa tu correo electrónico"
            id="email"
          />
        </UFormGroup>
    
        <!-- Botón de enviar instrucciones -->
        <UButton type="submit" size="xl" block :loading="form.isSubmitting">
          Enviar instrucciones
        </UButton>
      </UForm>
    
      <!-- Mensaje de error global -->
      <AlertError v-if="feedback.global.isVisible" :data="feedback.global"/>
    </div>
  </div>
</template>
