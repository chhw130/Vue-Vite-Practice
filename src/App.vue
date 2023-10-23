<script setup lang="ts">
import TheHeader from './layouts/TheHeader.vue'
import TheFooter from './layouts/TheFooter.vue'
</script>

<template>
  <TheHeader />
  <div class="container py-4">
    <RouterView />
  </div>
  <TheFooter />
</template>

<style></style>
