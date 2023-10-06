<template>
  <div class="card">
    <div class="card-header"></div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <p class="text-muted">{{ createdAt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PostData } from '@/api/posts'

defineProps<PostData>()
</script>

<style scoped></style>
