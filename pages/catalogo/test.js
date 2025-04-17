<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import { computed, watchEffect } from 'vue'
import CategoriesFilter from '~/components/Product/CategoriesFilter.vue'
import type { TaxonomyResponse } from '~/types/ProductList'


// Extraer ruta
const route = useRoute()
const params = (route.params.params as string[]) ?? []
const taxonomy = params[0] ?? null
const category = params[1] ?? null
const searchTerm = computed(() => (route.query.q as string) ?? '')


// Construir key dinámico para cache y refetch
const hasSearch = computed(() => searchTerm.value.trim().length > 1)
const cacheKey = computed(() =>
  hasSearch.value
    ? `products-search-${searchTerm.value.trim()}`
    : `products-${taxonomy ?? 'all'}-${category ?? 'all'}`
)


// Construir params para la petición
const apiParams = computed(() => {
  const p: Record<string, string | number> = {}
  if (category) p.categories__slug = category
  if (searchTerm.value) p.search = searchTerm.value
  return p
})


// Supongamos que ya tienes tu respuesta de la API de taxonomías
const { data: taxonomiesData } = await useAsyncData<TaxonomyResponse>('taxonomies', () =>
  $fetch('http://127.0.0.1:8000/api/taxonomies/categories')
)

// Traer datos cada vez que cambie taxonomy/category
const { data: products, status, error, refresh } = useAsyncData(
  cacheKey.value,
  () => $fetch('http://127.0.0.1:8000/api/products', { 
    params: apiParams.value, 
  }),
  { watch: [() => route.fullPath] }
)
const isLoading = computed(() => status.value === 'pending')

watchEffect(() => {
  if (!isLoading.value) {
    console.log('→ Request params:', apiParams.value)
    console.log('API response →', JSON.stringify(products.value, null, 2))
  }
})

</script>

<template>
  <main>
    <h1 v-if="!taxonomy">Catálogo completo</h1>
    <h1 v-else-if="error"> hay un error we</h1>
    <h1 v-else-if="taxonomy && !category">solo hay taxonomi {{ taxonomy }}</h1>
    <h1 v-else>{{ category }} ({{ taxonomy }})</h1>

    <!-- <section v-if="isLoading">Cargando…</section> -->
    <section>
      <!-- Aquí irá tu componente de listado de productos -->
      <!-- <ProductGrid :items="products" /> -->
      <p>Cursos sobre {{ category }}</p>
      <p>Resultados para "{{ searchTerm }}"</p>
      <CategoriesFilter
        :taxonomies="taxonomiesData?.results || []"
        :currentTaxonomy="taxonomy"
        :currentCategory="category"
      />
    </section>
  </main>
</template>
