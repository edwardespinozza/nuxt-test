<template>
  <div>
    <h1>{{ $t("app_title", { name: "Edward" }) }}</h1>
  </div>
</template>

<script setup>
  useHead({
    title: "index",
  });
</script>
