<script setup lang="ts">
defineProps({
  footerMessage: String,
  footerLinkText: String,
  footerLinkUrl: String,
});
</script>

<template>
  <p class="mt-6 text-sm text-muted-foreground">
    {{ footerMessage }}
    <LocLink
      :to="footerLinkUrl"
      class="font-semibold text-primary underline-offset-2 hover:underline"
    >
      {{ footerLinkText }}
    </LocLink>
  </p>
</template>