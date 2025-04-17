<template>
  <div>
    <input
      v-model="searchTerm"
      placeholder="Buscar productos..."
      class="border p-2 rounded mb-4 w-full"
    />

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="products.length === 0">No hay productos disponibles.<div>{{ apiBase }}</div></div>
    
    <ul v-else class="grid grid-cols-3 gap-4">
      <li v-for="product in products" :key="product.id" class="border p-4 rounded shadow">
        <img :src="product.thumbnail_url" :alt="product.title" class="w-full mb-2 rounded" />
        <h4 class="font-semibold">{{ product.title }}</h4>
        <div>Tipo: {{ product.product_type }}</div>
        <div>Rating: {{ product.rating_average }} ({{ product.reviews_count }} reseñas)</div>
        <div>Participantes: {{ product.participants_count }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

console.log('Valor actual de apiBase:', apiBase)

import { ref, toRef } from 'vue'
import { useProducts2 } from '~/composables/useProductList2'

const props = defineProps<{ selectedCategoryId: number | null }>()

const searchTerm = ref('')
const categoryId = toRef(props, 'selectedCategoryId')

const { products, loading } = useProducts2(searchTerm, categoryId)
</script>
