<script setup lang="ts">
  import type { FormSubmitEvent, FormErrorEvent } from '#ui/types';
  /* import type { FormError, FormSubmitEvent } from '#ui/types' */
  import * as v from 'valibot';
  import { useAuthStore } from '~/stores/auth';
  import { ApiError, NetworkError } from "~/services/errors";
  const localePath = useLocalePath()

  const props = defineProps({
    type: String,
    title: String,
    description: String,
    buttonText: String,
    footerMessage: String,
    footerLinkText: String,
    footerLinkUrl: String,
  });

  const { t } = useI18n();

  //Esquema de validacion de los campos del formulario
  const schema = v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty(t('auth.errors.email_is_required')),
      v.email(t('auth.errors.please_enter_a_valid_email_address'))
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty(t('auth.errors.password_is_required')),
      v.minLength(8, t('auth.errors.please_enter_a_password_with_at_least_8_characters'))
    ),
  });
  type Schema = v.InferOutput<typeof schema>;

  //Estado del formulario
  const state = reactive({
    email: '',
    password: '',
  });

  const errors = reactive<{
    email: string | null
    password: string | null
    global: boolean
    global_title: string | null
    global_description: string | null
  }>({
    email: null,
    password: null,
    global: false,
    global_title: null,
    global_description: null
  })

const isSubmitting = ref(false);
const authStore = useAuthStore();
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  errors.email = null
  errors.password = null
  errors.global = false
  errors.global_title = null
  errors.global_description = null
  // Deshabilitar el botón de submit para evitar clics repetidos
  isSubmitting.value = true;
  
  try {
    if (props.type === 'signup') {
      console.log("entre al if register");
      await authStore.register({
        email: event.data.email,
        password: event.data.password,
        password2: event.data.password
      });
/*       toast.add({
        title: "t('auth.success.login')",
        description: "t('auth.success.login_description')",
        color: 'success',
      }); */
    } else if (props.type === 'login') {
      console.log("props desde if login:", props);
      console.log("even data desde if login:", event.data);
      await authStore.login({
        email: event.data.email,
        password: event.data.password,
      });
      errors.global = true
      errors.global_title = "Bienvenido"
      errors.global_description = "Has iniciado sesión correctamente. ¡Listo para continuar!"
    }
  } catch (error: any) {
    console.log("error desde catch:", error);
    if (error instanceof ApiError) {
      if (error.data) {
        if (error.data.email) {
          console.log("entre al error de email:::  ", error.data.email);
          errors.email = error.data.email[0] 
        }
        if (error.data.password) {
          errors.password = error.data.password[0]
        }
        if (error.data.detail) {
          errors.global = true
          errors.global_title = "Ocurrio un problema."
          errors.global_description = "El correo electrónico o la contraseña son incorrectos."
        }
      }
      console.log("mando ApiError:", error); // ya sabes que existe error.data
      console.log("mando ApiError data:", error.data); // ya sabes que existe error.data
    } else {
      errors.global = true
      errors.global_title = t('auth.errors.global_error_title')
      errors.global_description = t('auth.errors.try_again_later')
    }
  } finally {
    // Rehabilitar el botón de submit después de que la solicitud haya terminado
    isSubmitting.value = false;
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
  <div class="flex items-center justify-center py-8 w-full">
    <div class="w-full max-w-[360px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl text-center">
        {{ title }}
      </h1>
      <p class="mt-1 text-muted-foreground text-center">
        {{ description }}
      </p>

      <UForm
        :schema="v.safeParser(schema)"
        :state="state"
        class="space-y-4 mt-8 light"
        @submit="onSubmit"
        @error="onError"
      >
        <UFormGroup 
          :label="t('auth.labels.email')" 
          name="email" 
          size="xl" 
          required 
          :error="errors.email || undefined"
        >
          <UInput v-model="state.email" class="w-full" @keydown.space.prevent auto autocomplete="email"/>
        </UFormGroup>
        <UFormGroup :label="t('auth.labels.password')" name="password" size="xl" required :error="errors.password || undefined">
          <UInput v-model="state.password" type="password" class="w-full" @keydown.space.prevent autocomplete="current-password"/>
        </UFormGroup>
        <UButton type="submit" size="xl" block :loading="isSubmitting">
          {{ buttonText }}
        </UButton>
      </UForm>

<!--       :close="{color: 'neutral', type: 'button', class: 'cursor-pointer'}"  -->
<!-- @update:open="handleClose" -->
      <UAlert
        v-if="errors.global"
        icon="heroicons:exclamation-circle"
        color="red"
        variant="outline"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false}"
        :title="errors.global_title || undefined"
        :description="errors.global_description || undefined"
        class="mt-6"
      />
      
      
      <p class="mt-6 text-sm text-muted-foreground">
        {{ footerMessage }}
        <LocLink
          :to=footerLinkUrl
          class="font-semibold text-primary underline-offset-2 hover:underline"
        >{{ footerLinkText }}
        </LocLink>
      </p>
    </div>
  </div>
</template>
