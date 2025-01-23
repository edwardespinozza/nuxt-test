<script setup lang="ts">
  defineProps(["to"])
  const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath(to)"><slot /></NuxtLink>

  <!-- ejemplo de uso -->
  <!-- <LocLink
    :to=to
    class="font-semibold text-primary underline-offset-2 hover:underline"
  >{{ footerLinkText }}
  </LocLink> -->
</template> 