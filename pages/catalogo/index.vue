<script setup lang="ts">
  import { useCatalog } from '~/composables/useCatalog'
  import CatalogPage from '~/components/Product/CatalogPage.vue'

  const {
    taxonomy,
    category,
    searchTerm,
    page,
    taxonomiesData,
    productsData,
    isLoading,
    error
  } = useCatalog()
</script>
<!-- title="Catálogo completo"
description="Todos los productos de nuestro catálogo"-->
<template>
  <div class="h-full w-full max-w-[1600px]">
    <CatalogPage
      :taxonomy="taxonomy"
      :category="category"
      :searchTerm="searchTerm"
      :page="page"
      :taxonomiesData="taxonomiesData"
      :productsData="productsData"
      :isLoading="isLoading"
      :error="error"
    />
  </div>
</template>
