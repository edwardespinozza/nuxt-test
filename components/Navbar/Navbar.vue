<template>
  <header class="w-full p-6 flex items-center justify-center bg-white">
    <div class="w-full flex justify-between items-center max-w-[1600px]">
      <NavLogo />
      <NavLinks />
    </div>
    
  </header>
</template>

<script setup>
import NavLogo from '~/components/Navbar/NavLogo.vue';
import NavLinks from '~/components/Navbar/NavLinks.vue';
//import NavUserMenu from '~/components/Navbar/NavUserMenu.vue';
</script>
