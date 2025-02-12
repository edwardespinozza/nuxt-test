<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import * as v from 'valibot';
  import { getAuthSchema } from '~/schemas/authSchema';
  import type { FormSubmitEvent, FormErrorEvent } from '#ui/types';
  import { ApiError, NetworkError } from "~/services/errors";
  import AlertError from '../MyUi/AlertError.vue';

  const props = defineProps({
    type: String,
    buttonText: String
  });
  
  const { t } = useI18n();
  const authSchema = getAuthSchema();
  type AuthSchemaType = v.InferOutput<typeof authSchema>;

  //Estado del formulario y variables relacionadas
  const form = reactive({
    email: '',
    password: '',
    isSubmitting: false,
  });

  const { feedback, resetFeedback, setGlobalFeedback } = useFormFeedback({
    email: "",
    password: "",
  });
  
  const authStore = useAuthStore();


  async function onSubmit(event: FormSubmitEvent<AuthSchemaType>) {
    resetFeedback();
    // Deshabilitar el botón de submit para evitar clics repetidos
    form.isSubmitting = true;
    
    try {
      if (props.type === 'signup') {
        await authStore.register({
          email: event.data.email,
          password: event.data.password,
          password2: event.data.password
        });
      } else if (props.type === 'login') {
        await authStore.login({
          email: event.data.email,
          password: event.data.password,
        });
      }
    } catch (error: any) {
      if (error instanceof ApiError && error.data) {
        console.log("error data en catch de auth form: ", error.data);
        
        feedback.field.email = error.data.email ? t(`auth.errors.${error.errorCode}`) : undefined;
        feedback.field.password = error.data.password?.[0] || null;
        if (error.data.detail) {
          setGlobalFeedback("error", "Ocurrió un problema.", "El correo electrónico o la contraseña son incorrectos.")
        }
      } else {
        setGlobalFeedback("error", t('auth.errors.global_error_title'), t('auth.errors.try_again_later'))
      }
    } finally {
      // Rehabilitar el botón de submit después de que la solicitud haya terminado
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
  <UForm
    :schema="v.safeParser(authSchema)"
    :state="form"
    class="space-y-4 mt-8 light"
    @submit="onSubmit"
    @error="onError"
  >
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
        id="email"
      />
    </UFormGroup>

    <UFormGroup
      :label="t('auth.labels.password')"
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
        autocomplete="current-password"
        id="password"
      />
        
    </UFormGroup>

    <NuxtLink :to="useLocalePath()('/forgot-password')" >
      <p class="text-green-500 font-semibold hover:underline mt-4">¿Olvidaste tu Contraseña?</p>
    </NuxtLink>

    <UButton type="submit" size="xl" block :loading="form.isSubmitting">
      {{ buttonText }}
    </UButton>
  </UForm>
  <AlertError v-if=feedback.global.isVisible type="error" :data="feedback.global"/>
</template>