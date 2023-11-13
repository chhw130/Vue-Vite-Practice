<template>
  <section>
    <p v-if="isFetching">...Loading</p>
    <template v-else>
      <div v-for="data in peopleData?.pages" :key="data.name">
        <div class="people" v-for="mainData in data.results">
          <span>{{ mainData.name }} / {{ mainData.height }} / {{ mainData.hair_color }}</span>
        </div>
      </div>
    </template>
    <button @click="getNextData()">New Data</button>
  </section>
</template>

<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios'

interface PeopleType {
  name: string
  height: string
  mass: string
  hair_color: string
}

interface PeopleApiType {
  count: number
  next: string
  previous: boolean
  results: PeopleType[]
}

const INIT_BASE_URL = `https://swapi.dev/api/people/`

const getData = async (pageParamUrl: any) => {
  const res = await axios.get(pageParamUrl)
  const data: PeopleApiType = await res.data
  return data
}

const {
  data: peopleData,
  isFetching,
  fetchNextPage,
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
const getNextData = () => {
  fetchNextPage()
  console.log(peopleData)
}
</script>

<style scoped>
.people {
  height: 100px;
  border: 1px solid salmon;
}
</style>
