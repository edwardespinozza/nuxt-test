  /* const search = computed(() => route.query.q || "")
  // Llamada a la API (se ejecuta automáticamente cuando cambian los parámetros)
  const { data } = useFetch(() => `/api/cursos?page=${page.value}&search=${search.value}&category=${category.value}`)
  return { cursos: data, page, hasMore: computed(() => data.value?.hasMore || false), categories: ["Desarrollo", "Diseño", "Marketing"] }
} */

import { ref } from "vue";
import axios, { AxiosError } from "axios";

/* interface Producto {
  id: number;
  nombre: string;
  precio: number;
} */

interface Filters {
  category?: string;
  level?: string;
  price?: number;
  paged?: number;
  perPage?: number;
  dataType?: string;
}

interface ErrorResponse {
  message: string;
}


export function useProductos() {
  /* const productos = ref<Producto[]>([]); */
  const productos = ref<any>([]);
  const loading = ref<boolean>(false);
  const total = ref<number>(0);
  const error = ref<string | null>(null);

  const fetchProductos = async (filters: Filters): Promise<void> => {
    loading.value = true;
    error.value = null;
    
    try {
      const paged2 = filters.paged ?? 1;
      const response = await fetch(`https://arcux.net/api/v1/pages/courses/?paged=${paged2}&perPage=20&dataType=course`);
      const data = await response.json()
      productos.value = data.data.data;
      console.log("data.data.data desde el composable: ", data.data.data);
      console.log("productos desde el composable: ", productos.value);
      total.value = data.data.total;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      console.error("Error al obtener productos:", axiosError);
      
      error.value = axiosError.response?.data?.message || "No se pudieron cargar los productos.";
    } finally {
      loading.value = false;
    }
  };
  console.log(productos);
  
  return { productos, fetchProductos, total, loading, error };
}
