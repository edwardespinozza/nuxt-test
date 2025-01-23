<template>
  <div>
    <h1 class="text-2xl font-bold">Bienvenido al Home de Arcux</h1>
    <p class="text-lg">"En construccion"</p>
    <h1>{{ $t("app_title", { name: "Edward" }) }}</h1>
  </div>
</template>

<script setup>
  useHead({
    title: "index",
  });
</script>
