<script setup lang="ts">
import TheHeader from './layouts/TheHeader.vue'
import TheFooter from './layouts/TheFooter.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <TheHeader />
  <main class="container py-4 main">
    <RouterView />
  </main>
  <!-- <TheFooter /> -->
  <VueQueryDevtools />
</template>

<style>
.main {
  height: 90vh;
}
</style>
