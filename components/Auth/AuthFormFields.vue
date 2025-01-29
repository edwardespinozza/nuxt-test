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
    errorField: {
      email: null as string | null,
      password: null as string | null,
    },
    errorGlobal: {
      isVisible: false as boolean,
      title: null as string | null,
      description: null as string | null,
    }
  });
  
  const authStore = useAuthStore();

  function resetErrors() {
    Object.assign(form.errorField, {
      email: null,
      password: null,
    });
    Object.assign(form.errorGlobal, {
      isVisible: false,
      title: null,
      description: null
    });
  }

  async function onSubmit(event: FormSubmitEvent<AuthSchemaType>) {
    resetErrors();
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
      console.log("Entre al catch de error")
      console.log(error);
      
      if (error instanceof ApiError && error.data) {
        console.log("Entre a la instancia de ApiError")
        form.errorField.email = error.data.email ? t(`auth.errors.${error.errorCode}`) : null;
        form.errorField.password = error.data.password?.[0] || null;
        if (error.data.detail) {
          Object.assign(form.errorGlobal, {
            isVisible: true,
            title: "Ocurrió un problema.",
            description: "El correo electrónico o la contraseña son incorrectos."
          });
        }
      } else {
        console.log("Entre al else de error")
        Object.assign(form.errorGlobal, {
          isVisible: true,
          title: t('auth.errors.global_error_title'),
          description: t('auth.errors.try_again_later')
        });
      }
    } finally {
      // Rehabilitar el botón de submit después de que la solicitud haya terminado
      form.isSubmitting = false;
    }
  }

  /* function handleClose() {
    console.log("desde handle close");
    
    errors.global = false;
  } */

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
      :error="form.errorField.email || undefined"
    >
      <UInput
        v-model="form.email"
        class="w-full"
        @keydown.space.prevent 
        auto
        autocomplete="email"
      />
    </UFormGroup>

    <UFormGroup
      :label="t('auth.labels.password')"
      name="password"
      size="xl"
      required
      :error="form.errorField.password || undefined"
    >
      <UInput
        v-model="form.password"
        type="password"
        class="w-full"
        @keydown.space.prevent
        autocomplete="current-password"/>
    </UFormGroup>

    <UButton type="submit" size="xl" block :loading="form.isSubmitting">
      {{ buttonText }}
    </UButton>
  </UForm>
  <AlertError v-if=form.errorGlobal.isVisible :data="form.errorGlobal"/>
</template>