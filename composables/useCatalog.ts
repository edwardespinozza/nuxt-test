// composables/useCatalog.ts
import { useRoute } from 'vue-router'
import { computed, watchEffect } from 'vue'
import { useAsyncData } from '#app'
import type { TaxonomyResponse, ProductListResponse } from '~/types/ProductList'

export function useCatalog() {
  const route = useRoute()

  const taxonomy = computed(() => route.params.taxonomia as string || null)
  const category = computed(() => route.params.categoria as string || null)
  const searchTerm = computed(() => (route.query.q as string) ?? '')
  const page = computed(() => Number(route.query.page) || 1)

  const hasSearch = computed(() => searchTerm.value.trim().length > 1)
  const cacheKey = computed(() =>
    hasSearch.value
      ? `products-search-${searchTerm.value.trim()}`
      : `products-${taxonomy.value ?? 'all'}-${category.value ?? 'all'}-page-${page.value}`
  )

  const apiParams = computed(() => {
    const p: Record<string, string | number> = {}
    if (category.value) p.categories__slug = category.value
    if (searchTerm.value) p.search = searchTerm.value
    if (page.value) p.page = page.value
    return p
  })

  const { data: taxonomiesData } = useAsyncData<TaxonomyResponse>('taxonomies', () =>
    $fetch('http://127.0.0.1:8000/api/taxonomies/categories')
  )

  const { data: productsData, status, error } = useAsyncData<ProductListResponse>(
    cacheKey.value,
    () => $fetch('http://127.0.0.1:8000/api/products', { params: apiParams.value }),
    { watch: [() => route.fullPath] }
  )

  const isLoading = computed(() => status.value === 'pending')

  /* watchEffect(() => {
    if (!isLoading.value) {
      console.log('→ Params:', apiParams.value)
      console.log('API response →', JSON.stringify(productsData.value, null, 2))
    }
  }) */

  return {
    taxonomy,
    category,
    searchTerm,
    page,
    taxonomiesData,
    productsData,
    isLoading,
    error
  }
}
