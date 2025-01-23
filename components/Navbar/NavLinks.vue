<template>
  <nav>
    <ul class="flex space-x-4">
      <li v-for="link in links" :key="link.path">
        <LocLink
          :to="link.path"
          class="font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >{{ link.name }}
        </LocLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { navLinks } from '~/data/navLinks.js';

const links = navLinks;
</script>

<style scoped>
/* Estilo adicional si es necesario */
</style>
