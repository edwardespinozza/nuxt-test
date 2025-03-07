<template>

  <!-- <div class="w-full rounded-large bg-white ring-1 ring-gray-200 shadow-sm divide-y divide-gray-200"> -->
  <!-- <div class="w-full rounded-2xl bg-white divide-y divide-gray-200 border border-gray-300 p-3 drop-shadow-lg"> -->
  <div class="w-full rounded-2xl bg-white">
    <div class="aspect-w-16 aspect-h-9 border border-gray-100 rounded-t-xl bg-gray-100">
      <img 
        :src="cover" 
        :alt="title"
        class="w-full object-cover"
      />
    </div>

    <!-- card body -->
    <div class="py-2 px-3 space-y-3">
      <div>
        <span class="text-sm text-gray-500">Juan Perez Diaz</span>
        <p class="font-medium text-md text-gray-900 line-clamp-2 leading-5">{{ title }}</p>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex">
          <UIcon
            v-for="star in 5"
            :key="`rating-${star}`"
            name="i-heroicons-solid:star"
            class="w-4 h-4 text-[#99CC33]"
          />
        </div>
        <span class="text-sm text-gray-500">4,9 (500)</span>
      </div>

      <p class="text-md">
        <span class="font-medium text-lg">S/39.00</span>
        <span class="text-gray-400 ml-2 line-through">S/179.00</span>
      </p>

      <!-- <UButton type="submit" size="xl" block color="black">
        Comprar ahora
      </UButton> -->
      
    </div>
  </div>


</template>

<script setup lang="ts">
  defineProps<{
    title: string;
    cover: string;
  }>();
</script>
