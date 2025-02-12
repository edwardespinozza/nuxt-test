<template>
  <!-- icon="heroicons:exclamation-circle" -->
  <!-- variant="outline" -->
  <div v-if="isVisible" class="w-full">
    <UAlert
      :icon="alertConfig.icon"
      variant="subtle"
      :color="alertConfig.color"
      :title="data.title || undefined"
      :description="data.description || undefined"
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'link', padded: false }"
      class="mt-6"
      @close="handleCloseAlert"
    />
  </div>

</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { PropType } from "vue";

  const isVisible = ref(true);

  // Definir props
  /* type: { type: String as PropType<"success" | "error">, default: "success" }, // Tipo de estado
  data: { type: Object, required: true }, */
  const props = defineProps({
    data: { type: Object as PropType<{ 
      type: "success" | "error";
      title?: string;
      description?: string 
    }>, required: true },

  });

  // Computed para color e icono en un solo lugar
  const alertConfig = computed(() => {
    const config = {
      success: { color: "green" as const, icon: "heroicons:check-circle" },
      error: { color: "red" as const, icon: "heroicons:x-circle" },
    };
    return config[props.data.type] || config.success; // Fallback a "success" si `type` es inválido
  });

  // Método para cerrar la alerta
  const handleCloseAlert = () => {
    isVisible.value = false;
  };
  
</script>
