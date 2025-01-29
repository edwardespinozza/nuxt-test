<script setup lang="ts">
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold tracking-tight lg:text-3xl text-center">
      {{ title }}
    </h1>
    <p class="mt-1 text-muted-foreground text-center">
      {{ description }}
    </p>
  </div>
</template>