<script setup lang="ts">
import { useTodo } from '@/composables/useTodo'

const { data, isLoading, refetch } = useTodo()

</script>

<template>
  <main>home</main>
  <button @click="refetch()">다시 불러오기</button>

  <div v-if="isLoading">is Loading...</div>
  <section>
    <div v-for="(ele, index) in data" :key="index">
      <div class="card m-4">
        <div class="card-body">
          <span>name : {{ ele.name }}</span>
          <p>height : {{ ele.email }}</p>
          <p>gender : {{ ele.phone }}</p>
        </div>
      </div>
    </div>
  </section>
</template>