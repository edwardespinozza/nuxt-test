// composables/useCategories.ts
import { computed } from 'vue'
import type { TaxonomyResponse } from '~/types/ProductList'

export function useCategories() {
  const { data, status, error, refresh } = useFetch<TaxonomyResponse>('http://127.0.0.1:8000/api/taxonomies/categories')

  const loading = computed(() => status.value === 'pending')
  const taxonomies = computed(() => data.value?.results || [])

  return {
    taxonomies,
    loading,
    error,
    refresh,
  }
}
