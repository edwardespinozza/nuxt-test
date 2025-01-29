<template>
  <UAlert
    icon="heroicons:exclamation-circle"
    color="red"
    variant="outline"
    :title="data.title || undefined"
    :description="data.description || undefined"
    class="mt-6"
    />
    <!-- @close="handleCloseAlert"
    :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'red', variant: 'link', padded: false }" -->
  </template>

<script setup lang="ts">

// Definir props
const props = defineProps({
  data: { type: Object, required: true },
});

// Función para cerrar el alerta y borrar `data`
/* const handleCloseAlert = () => {
  props.data.title = ""; // Borra título
  props.data.description = ""; // Borra descripción
}; */
</script>
