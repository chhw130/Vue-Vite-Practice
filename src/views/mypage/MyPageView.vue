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

      <span v-if="bottom">Loading...</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { onMounted, ref } from 'vue'

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

const INIT_BASE_URL = `https://swapi.dev/api/people/`

const getData = async (pageParamUrl: any) => {
  const res = await axios.get(pageParamUrl)
  const data: PeopleApiType = await res.data
  return data
}

const content = ref()
const bottom = ref(false)

const doScroll = (event) => {
  const scrollHeight = event.target.scrollHeight
  const scrollTop = event.target.scrollTop
  const clientHeight = event.target.clientHeight

  if (!hasNextPage) return (bottom.value = false)

  if (scrollTop + clientHeight > scrollHeight - 1) {
    fetchNextPage()
    bottom.value = true
  } else {
    bottom.value = false
  }
}

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

onMounted(() => {
  content.value.addEventListener('scroll', doScroll)
})
</script>

<style scoped>
.content {
  width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  height: 100%;
}
</style>
