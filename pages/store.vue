<template>
  <!-- container -->
  <div class="max-w-[1600px] px-12">
    
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      
      <!-- Filtros -->
      <aside class="md:col-span-1 space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="space-y-3">
            <label className="block">
              <input type="checkbox" className="mr-2" />
              En oferta
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Envío gratis
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Mejor valorados
            </label>
          </div>
        </div>
        
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Categorias</h2>
          <div className="space-y-3">
            <label className="block">
              <input type="checkbox" className="mr-2" />
              En oferta
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Envío gratis
            </label>
            <label className="block">
              <input type="checkbox" className="mr-2" />
              Mejor valorados
            </label>
          </div>
        </div>



      </aside>
      
      <!-- Lista de productos -->
      <section class="md:col-span-4">
        <div class="mb-6">
          <h2 className="text-2xl font-semibold">Todos los cursos</h2>
          <p className="text-lg font-normal text-gray-500">108 Resultados</p>
        </div>

        <div class="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard
            v-for="product in productos" 
            :key="product.id"
            :title="product.title"
            :cover="product.cover"
          /> 
        </div>

        <!-- pagination -->
        <div class="flex items-center justify-center py-12">
          <UPagination
            v-model="page"
            size="xl"
            :page-count="10"
            :total="items"
            :to="(page: number) => ({
              query: { ...$route.query, page },
              // Hash is specified here to prevent the page from scrolling to the top
              hash: '#links'
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

/*   import { useCursos } from "@/composables/useCursos" */

  const route = useRoute()
  const router = useRouter()
  const { productos, fetchProductos, loading, error } = useProductos();

  const filters = computed(() => ({
    category: route.query.category as string || '',
    level: route.query.level as string || '',
    price: route.query.price ? Number(route.query.price) : undefined,
    paged: route.query.page ? Number(route.query.page) : undefined,
    perPage: 20,
    dataType: 'course'
  }));
  const page = computed(() => Number(route.query.page) || 1) // ⬅️ Ahora obtenemos la página de la URL

  const items = ref(1200)

  // Llamar a la API cuando cambian los filtros
  watch(filters, async () => {
    console.log("Aplicando filtros:", filters.value);
    await fetchProductos(filters.value);
    console.log('ejecute fetchProducts');
    console.log("productos: ", productos.value);
  }, { immediate: true }); // `immediate: true` para ejecutar la primera vez al cargar la página

  console.log("error: ", error.value);
  watch(productos, (newVal) => {
    console.log("Productos actualizados en el page:", newVal);
  });

  // Variables reactivas para los filtros (se sincronizan con la URL)
  /* const searchQuery = ref(route.query.q || "")
  const category = ref(route.query.category || "")
  
  console.log(searchQuery.value);
  console.log(category.value);
  console.log(page.value); */

  // Función para actualizar la URL sin recargar la página
  /* const updateFilters = () => {
    router.push({ path: "/catalogo", query: { q: searchQuery.value, category: category.value, page: 1 } })
  } */

  // Cambiar de página modificando la URL
/*   const changePage = (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  } */

















const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    price: "$29.99",
    image: "https://via.placeholder.com/300x200?text=Auriculares",
  },
  {
    id: 2,
    name: "Teclado Mecánico",
    price: "$79.99",
    image: "https://via.placeholder.com/300x200?text=Teclado",
  },
];
</script>