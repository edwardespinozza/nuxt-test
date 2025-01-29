<script setup lang="ts">
  /* import type { FormError, FormSubmitEvent } from '#ui/types' */
  import AuthFormFields from './AuthFormFields.vue';

  const props = defineProps({
    type: String,
    title: String,
    description: String,
    buttonText: String,
    footerMessage: String,
    footerLinkText: String,
    footerLinkUrl: String,
  });
</script>

<template>
  <div class="flex items-center justify-center py-8 w-full">
    <div class="w-full max-w-[360px] px-5">
      <AuthFormHeader :title="title" :description="description" />
      <AuthFormFields :type="type" :button-text="buttonText"/>      
      <AuthFormFooter
        :footerMessage="footerMessage"
        :footerLinkText="footerLinkText"
        :footerLinkUrl="footerLinkUrl"
      />
    </div>
  </div>
</template>
