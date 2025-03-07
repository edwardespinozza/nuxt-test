<script setup lang="ts">
  definePageMeta({
    layout: "clean",
  });
  
  import { getResetPasswordSchema } from '~/schemas/forgotPasswordSchema';
  import type { FormSubmitEvent, FormErrorEvent } from '#ui/types';
  import * as v from 'valibot';
  import { useI18n } from 'vue-i18n';
  import AlertError from '~/components/MyUi/AlertError.vue';
  import { AuthService } from '~/services/api/authService';
  import { useRoute, useRouter } from 'vue-router'

  const { t } = useI18n();
  const resetPasswordSchema = getResetPasswordSchema();
  type ResetPasswordSchemaType = v.InferOutput<typeof resetPasswordSchema>;
  
  const { feedback, resetFeedback, setGlobalFeedback } = useFormFeedback({
    password: "",
    confirmPassword: "",
  });

  const form = reactive({
    password: "",
    confirmPassword: "",
    isSubmitting: false,  
  });

  const route = useRoute()

  async function onSubmit(event: FormSubmitEvent<ResetPasswordSchemaType>) {
    resetFeedback();
    form.isSubmitting = true;
    try {
      if (form.password !== form.confirmPassword) {
        /* feedback.field.password = t('error_codes.password_mismatch');
        feedback.field.confirmPassword = t('error_codes.password_mismatch'); */
        throw new Error('password_mismatch');
      }
      const token = route.query.token as string;
      console.log(token);
      
      await AuthService.reset_password({ token: token, password: form.password });
      navigateTo(useLocalePath()("/reset-password/success"))
      // Si hay un error, lanzar una excepción
    } catch (error: any) {
      console.log("Error en la solicitud de restablecimiento de contraseña", error);
      
      if (error.data) {
        console.log("error en new.vue : ", error);  
        // Si el error es de validacion
        if (error.data.password) {
          feedback.field.password = t(`error_codes.${error.data.password?.[0].code}`);
        } else {
          setGlobalFeedback("error", t('error_codes.global_error_title'), t('error_codes.link_expired_or_invalid'))
        }
      } else if (error.message == 'password_mismatch') {
        setGlobalFeedback("error", t('error_codes.global_error_title'), t('error_codes.password_mismatch'))
      } else {
        setGlobalFeedback("error", t('error_codes.global_error_title'), t('error_codes.password_mismatch'))
        /* setGlobalFeedback("error", t('auth.errors.reset_failed'), error.message || t('auth.errors.unknown_error')) */
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
  <div class="w-[600] flex-initial py-8">
    <div class="px-5">
      <h1 class="text-2xl font-bold tracking-tight text-center">
        Establecer nueva contraseña
      </h1>
      <!-- Formulario de solicitud de restablecimiento de contraseña -->
      <UForm
        :schema="v.safeParser(resetPasswordSchema)"
        :state="form"
        class="space-y-4 mt-8 light"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Campo de Email -->
        <UFormGroup
          :label="t('auth.labels.new_password')"
          name="password"
          size="xl"
          required
          :error="feedback.field.password || undefined"
        >
          <UInput
            v-model="form.password"
            type="password"
            class="w-full"
            @keydown.space.prevent
            autocomplete="new-password"/>
        </UFormGroup>
        <UFormGroup
          :label="t('auth.labels.confirm_password')"
          name="confirmPassword"
          size="xl"
          required
          :error="feedback.field.confirmPassword || undefined"
        >
          <UInput
          v-model="form.confirmPassword"
            type="password"
            class="w-full"
            @keydown.space.prevent
            autocomplete="new-password"/>
        </UFormGroup>
    
        <!-- Botón de enviar instrucciones -->
        <UButton type="submit" size="xl" block :loading="form.isSubmitting">
          {{t('auth.labels.save_password')}}
        </UButton>
      </UForm>
    
      <!-- Mensaje de error global -->
      <AlertError v-if="feedback.global.isVisible" :data="feedback.global"/>
    </div>
  </div>
</template>
