<template>
  <section class="mb-12">
    <!-- <div class="mb-6" id="product-listing-top">
      <USelectMenu v-model="selected" :options="people" />
    </div> -->

    <!-- <div class="grid gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"> -->
    <div class="grid gap-y-8 gap-x-2 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
      <ProductCard
        v-for="product in props.productos"
        :key="product.id"
        :title="product.title"
        :cover="product.thumbnail_url"
        />
        <!-- :cover="product.thumbnail_url" -->
    </div>

    <div v-if="total/12 > 1" class="flex items-center justify-center py-12">
      <UPagination
        v-model="props.page"
        size="xl"
        :page-count="12"
        :total="total"
        :to="(page: number) => ({
          query: { ...$route.query, page },
          /* hash: '#container', */
        })"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue'

type Product = {
  id: number;
  title: string;
  thumbnail_url: string;
};

const props = defineProps<{
  productos: Product[];
  total: number;
  page: number;
}>();

const people = [
  'Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 
  'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 
  'Caroline Schultz', 'Mason Heaney', 
  'Claudie Smitham', 'Emil Schaefer'
];

const selected = ref(people[0]);
const route = useRoute();


function scrollToCatalogTop() {
  const el = document.getElementById('container')
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 20, // puedes ajustar el offset si tienes header fijo
      behavior: 'smooth'
    })
  }
}
watch(() => route.query.page, () => {
  scrollToCatalogTop()
})

</script>
