<template>
  <div class="content" ref="content">
    <p v-if="isLoading">...Loading</p>
    <template v-else>
      <div v-for="(data, index) in peopleData?.pages" :key="index">
        <div class="card m-4 people" v-for="mainData in data.results" :key="mainData.name">
          <div class="card-body">
            <span>name : {{ mainData.name }}</span>
            <p>height : {{ mainData.height }}</p>
            <p>gender : {{ mainData.gender }}</p>
          </div>
        </div>
      </div>
      <div class="loader">
        <InfiniteLoading v-if="hasNextPage" target=".result" @infinite="fetchNextPage()" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { ref } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { useTodo } from '@/composables/useTodo'

interface PeopleType {
  name: string
  height: string
  mass: string
  gender: string
  hair_color: string
}

interface PeopleApiType {
  count: number
  next: string
  previous: boolean
  results: PeopleType[]
}

const { data } = useTodo()

const INIT_BASE_URL = `https://swapi.dev/api/people/`

const getData = async (pageParamUrl: string) => {
  const res = await axios.get(pageParamUrl)
  const data: PeopleApiType = await res.data
  return data
}

const content = ref()
const bottom = ref(false)

const {
  data: peopleData,
  fetchNextPage,
  isLoading,
  hasNextPage
} = useInfiniteQuery({
  queryKey: ['people'],
  initialPageParam: INIT_BASE_URL,
  queryFn: ({ pageParam }) => {
    return getData(pageParam)
  },
  getNextPageParam: (lastPage) => {
    return lastPage.next || undefined
  }
})
</script>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 400px;
  padding: 10px;
  text-align: center;
  background: #eceef0;
  border-radius: 10px;
  margin: 3px;
}

.loader {
  display: flex;
  justify-content: center;
  padding: 30px;
}
.container {
  overflow: visible;
}
/* .content {
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  height: 100%;
} */
</style>
