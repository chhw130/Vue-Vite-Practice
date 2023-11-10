<script setup lang="ts">
import TheHeader from './layouts/TheHeader.vue'
import TheFooter from './layouts/TheFooter.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <TheHeader />
  <div class="container py-4">
    <RouterView />
  </div>
  <TheFooter />
  <VueQueryDevtools />
</template>

<style></style>
