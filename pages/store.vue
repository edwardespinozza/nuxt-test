<template>
  <!-- container -->
  <div class="max-w-[1600px] px-12">
    
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      
      <!-- Filtros -->
      <aside class="md:col-span-1 space-y-6">
        <div v-if="taxonomiesLoading">🔄 Cargando categorías...</div>

        <div v-else-if="taxonomiesError">❌ {{ taxonomiesError }}</div>
          <div v-else>
            <ul>
              <li v-for="taxonomy in taxonomies" :key="taxonomy.id">
                {{ taxonomy.name }}
                <ul>
                  <li v-for="category in taxonomy.categories" :key="category.id">
                    {{ category.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>


      </aside>
      
      <!-- Lista de productos -->
      <section class="md:col-span-4">
        <div class="mb-6" id="product-listing-top">
          <h2 className="text-2xl font-semibold">Todos los cursos</h2>
          <p className="text-lg font-normal text-gray-500">108 Resultados</p>
          <USelectMenu v-model="selected" :options="people" />
        </div>

        <div class="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard
            v-for="product in productos" 
            :key="product.id"
            :title="product.title"
            :cover="product.thumbnail_url"
          /> 
        </div>

        <!-- pagination -->
        <div class="flex items-center justify-center py-12">
          <UPagination
            v-model="page"
            size="xl"
            :page-count="10"
            :total="total"
            :to="(page: number) => ({
              query: { ...$route.query, page },
              // Hash is specified here to prevent the page from scrolling to the top
              hash: '#product-listing-top'
            })"
          />
        </div>

      </section>


    </div>
    
    
    <div>
      <h1 class="text-4xl font-bold mb-6">Catálogo de productos</h1>
    </div>

    <!-- Lista de cursos -->
    <div class="w-full">
      
    </div>

  </div>  

</template>

<script setup lang="ts">

  import { useRoute, useRouter } from "vue-router"


  type Taxonomy = {
    id: number;
    name: string;
    slug: string;
    categories: Array<{
      id: number;
      name: string;
      slug: string;
      parent: number | null;
    }>;
  };

  type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Taxonomy[];
  };

  const { data: rawTaxonomies, status, error: taxonomiesError } = await useAsyncData<ApiResponse>('taxonomies', () => 
    $fetch('http://127.0.0.1:8000/api/taxonomies/categories/')
  );

  const taxonomies = computed(() => rawTaxonomies.value?.results || []);
  const taxonomiesLoading = computed(() => status.value === 'pending' || status.value === 'idle');

  const route = useRoute()
  const router = useRouter()
  const { productos, fetchProductos, total, loading, error } = useProductos();

  const filters = computed(() => ({
    category: route.query.category as string || '',
    level: route.query.level as string || '',
    price: route.query.price ? Number(route.query.price) : undefined,
    page: route.query.page ? Number(route.query.page) : undefined,
    search : route.query.q as string || "",
    perPage: 20,
    dataType: 'course'
  }));
  const page = computed(() => Number(route.query.page) || 1) // ⬅️ Ahora obtenemos la página de la URL

  // Llamar a la API cuando cambian los filtros
  watch(filters, async () => {
    await fetchProductos(filters.value);
  }, { immediate: true }); // `immediate: true` para ejecutar la primera vez al cargar la página

  const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
  const selected = ref(people[0])

</script>


  // Variables reactivas para los filtros (se sincronizan con la URL)
  /* const searchQuery = ref(route.query.q || "")
  const category = ref(route.query.category || "")


  // Función para actualizar la URL sin recargar la página
  /* const updateFilters = () => {
    router.push({ path: "/catalogo", query: { q: searchQuery.value, category: category.value, page: 1 } })
  } */

  // Cambiar de página modificando la URL
/*   const changePage = (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  } */