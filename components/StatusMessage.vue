<script setup lang="ts">
  import type { PropType } from "vue";

  const props = defineProps({
    type: { type: String as PropType<"success" | "error" | "loading" | "other">, default: "success" }, // Tipo de estado
    title: { type: String, default: "Tenemos un problema" }, // Título del mensaje
    message: { type: String, required: true }, // Mensaje principal
    buttonText: { type: String, default: "Reintentar" }, // Texto del botón
    buttonAction: { type: Function as PropType<() => void>, default: () => {} }, // Función vacía por defecto
    icon: { type: String, default: "" }, // Icono personalizado
    showButton: { type: Boolean, default: true }, // Controla si se muestra el botón
  });

  const isSubmitting = ref(false);

  const handleClick = async () => {
    if (isSubmitting.value) return; // Evita clics múltiples mientras está en loading

    isSubmitting.value = true;
    try {
      await props.buttonAction(); // Ejecuta la acción del botón
    } catch (error) {
      console.error("Error en buttonAction:", error);
    } finally {
      isSubmitting.value = false; // Restablece el estado después de completar
    }
  };

</script>

<template>
  <UCard class="w-full max-w-[450px] items-center justify-center">
    <template #header>
      <div class="flex items-center space-x-4">
        <UIcon v-if="type == 'success'" name="i-heroicons:check-circle-solid" class="text-green-500 w-[30px] h-[30px]" />
        <UIcon v-if="type == 'error'" name="i-heroicons:exclamation-circle" class="text-red-500 w-[30px] h-[30px]" />
        <UIcon v-if="type == 'loading'" name="i-heroicons:arrow-path" class="w-[30px] h-[30px] text-gray-500 animate-spin" />
        <UIcon v-if="type == 'other'" :name="icon" class="w-[30px] h-[30px] text-gray-500 animate-bounce" />
        <p class="text-xl font-semibold">{{ title }}</p>
      </div>
    </template>
    
    <p v-html="message" class="whitespace-pre-line"></p>
    
    <template #footer v-if="type !== 'loading' && showButton">
      <UButton v-if="type === 'success'" size="xl" block color="green" @click="handleClick" :loading="isSubmitting">
        {{ buttonText }}
      </UButton>
      <UButton v-if="type === 'error'" size="xl" block color="red" @click="handleClick" :loading="isSubmitting">
        {{ buttonText }}
      </UButton>
      <UButton v-if="type === 'other'" size="xl" block color="green" variant="soft" @click="handleClick" :loading="isSubmitting">
        {{ buttonText }}
      </UButton>
    </template>
  </UCard>
</template>
