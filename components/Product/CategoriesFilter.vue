<template>
  <nav>
    <ul>
      <!-- Link para mostrar todos -->
      <ULink
            active-class="text-primary"
            inactive-class="font-medium text-sm text-[#99cc33]-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            @click="selectCategory()"
          >
            Todos los cursos
      </ULink>
      <!-- Iterar sobre taxonomías -->
      <li v-for="tax in taxonomies" :key="tax.id">
        <UDivider class="mb-4 mt-4"/>
        <div @click="toggleShowAll(tax.slug)" class="cursor-pointer">
          <p class="font-medium mb-2 text-black"> {{ tax.name }} </p>
        </div>
        
        <ul>
          <li 
            v-for="cat in visibleCategories(tax)"
            :key="cat.id"
            class="my-3"
          >
            <button
              class="font-normal text-sm flex items-center gap-2"
              @click="selectCategory(tax.slug, cat.slug)"
            >
              <UCheckbox
                color="green"
                :label="cat.name"
                :model-value="currentCategory === cat.slug"
                :ui="{
                  base: 'h-5 w-5 cursor-pointer',
                  color: 'text-black dark:text-black-400',
                  label: 'text-base font-normal text-gray-700 dark:text-gray-200 cursor-pointer'
                }"
              />
            </button>
          </li>
        </ul>
        

        <div v-if="tax.categories.length > 5" class="mb-4">
          <ULink
            active-class="text-primary"
            inactive-class="font-medium text-sm text-[#99cc33]-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            @click="toggleShowAll(tax.slug)"
          >
            {{ showAllMap[tax.slug] ? '- Ver menos' : '+ Ver más' }}
          </ULink>
        </div>
      </li>
    </ul>
  </nav>
    
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Taxonomy } from '~/types/ProductList'
import { useLocalePath } from '#i18n'

const localePath = useLocalePath()
const router = useRouter()

const props = defineProps<{
  taxonomies: Taxonomy[]
  currentTaxonomy: string | null
  currentCategory: string | null
}>()


// Estado para controlar qué taxonomías están expandidas
const showAllMap = ref<Record<string, boolean>>({})


// 🔁 Detectar si currentCategory pertenece a alguna taxonomía
function expandTaxonomyForCurrentCategory() {
  if (!props.currentCategory) return

  const tax = props.taxonomies.find(t =>
    t.categories.some(c => c.slug === props.currentCategory)
  )

  if (tax) {
    showAllMap.value[tax.slug] = true
  }
}

// Llamar al montar
onMounted(() => {
  expandTaxonomyForCurrentCategory()
})

function visibleCategories(tax: Taxonomy) {
  return showAllMap.value[tax.slug]
    ? tax.categories
    : tax.categories.slice(0, 5)
}

// Cambia la URL sin recargar la página
function selectCategory(taxSlug?: string, catSlug?: string) {
  let path = ''
  if (!taxSlug || !catSlug) {
    // Si no hay parámetros, ir al catálogo general
    path = localePath('/catalogo/')
  } else {
    path = localePath(`/catalogo/${taxSlug}/${catSlug}`)
  }
  router.push({ path })
}

function toggleShowAll(slug: string) {
  showAllMap.value[slug] = !showAllMap.value[slug]
}

</script>
