<script setup lang="ts">
  /* import { useCatalog } from '~/composables/useCatalog' */
  import CategoriesFilter from '~/components/Product/CategoriesFilter.vue'
  import ProductListing from '~/components/Product/ProductListing.vue'

  /* const {
    taxonomy,
    category,
    searchTerm,
    page,
    taxonomiesData,
    productsData,
    isLoading,
    error
  } = useCatalog() */

  const props = defineProps<{
    taxonomy: string | null
    category: string | null
    searchTerm: string
    page: number
    taxonomiesData: any
    productsData: any
    isLoading: boolean
    error: any
  }>()

  const dynamicWord = computed(() => {
    return props.searchTerm || props.category || null
  })

</script>

<template>
  <div class="w-full flex justify-between items-center max-w-[1600px]">
    <div class="flex gap-8 w-full">
      
      <aside class="min-w-[250px]">
        
        <!-- <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>-->
        <CategoriesFilter
          :taxonomies="taxonomiesData?.results || []"
          :currentTaxonomy="taxonomy"
          :currentCategory="category"
        />
        
    
      </aside>
      <main class="w-full">
        <!-- <h1 v-if="searchTerm">Resultados para "{{ searchTerm }}"</h1>
        <h1 v-if="category">Resultados para "{{ category }}"</h1>
        <h1 v-if="!taxonomy">Todos los cursos</h1>
        <h1 v-else-if="error">Hay un error we</h1>
        <h1 v-else-if="taxonomy && !category">Solo hay taxonomía: {{ taxonomy }}</h1> -->

        <!-- Header -->
        <div class="mb-6" id="product-listing-top">
          <h1 class="text-2xl font-semibold">
            <div v-if="dynamicWord">
              Resultados para 
              <span class="text-primary capitalize">"{{ dynamicWord }}"</span>
            </div>
            <p v-else>Todos los cursos</p>
          </h1>
          <p class="text-lg font-normal text-gray-500">
            {{ productsData ? productsData.count + ' Resultados' : 'Cargando resultados...' }}
          </p>
        </div>


        <ProductListing 
          :productos="productsData?.results || []"
          :total="productsData?.count || 0"
          :page="page"
        />
      </main>
  
    </div>
  </div>
</template>
<!-- products: any[] -->


<!-- 
<script setup lang="ts">


  import ProductListing from './ProductListing.vue' 
  import CategoriesFilter from './CategoriesFilter.vue'
  
  const route = useRoute()
  const page = computed(() => Number(route.query.page) || 1)
  
  defineProps<{
    title: string
    description?: string
    taxonomies: any[]
    currentTaxonomy: string | null
    currentCategory: string | null
  }>()
</script> -->