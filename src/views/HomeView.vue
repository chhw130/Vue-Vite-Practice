<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

const { data, isLoading, refetch, error, isSuccess } = useQuery({
  queryKey: ['todo'],
  queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data)
})
</script>

<template>
  <main>home</main>
  <button @click="refetch()">다시 불러오기</button>

  <div v-if="isLoading">is Loading...</div>
  <section>{{ data }}</section>
</template>
