<template>
  <div class="flex gap-8 p-8">
    <aside class="w-1/4">
      <CategoryFilter @select="updateCategory" />
    </aside>
    <main class="w-3/4">
      <ProductList :selectedCategoryId="selectedCategoryId" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CategoryFilter from '~/components/Product/CategoryFilter.vue'
import ProductList from '~/components/Product/ProductList.vue'

const selectedCategoryId = ref<number | null>(null)

const updateCategory = (id: number) => {
  selectedCategoryId.value = id
}
</script>
