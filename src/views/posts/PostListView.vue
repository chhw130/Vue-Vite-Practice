<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent="">
      <div class="row g-3">
        <div class="col">
          <input type="text" v-model="params.title_like" class="form-control" />
        </div>
        <div class="col-3">
          <select class="form-select" v-model="params._limit">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" class="col-5" :key="post.id">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createdAt="post.createdAt"
          @click="goPage(post.id)"
        />
      </div>
    </div>
    <nav class="mt-5 justify-content-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: params._page === 1 }">
          <a class="page-link" @click="--params._page" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in totalPage"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
          @click="params._page = page"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: params._page >= totalPage }">
          <a class="page-link" href="#" @click="++params._page" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { PostData, getPosts } from '@/api/posts'
import PostItem from '@/components/posts/PostItem.vue'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref<Array<PostData>>([])

interface ParamsRefType {
  _sort: string
  _order: string
  _page: number
  _limit: number
  title_like: string
}

/**pagination */
const params = ref<ParamsRefType>({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: ''
})

const totalPost = ref(0)
const totalPage = computed(() => Math.ceil(totalPost.value / params.value._limit))

const router = useRouter()
const fetchPosts = async () => {
  const { data: postsData, headers } = await getPosts(params.value)
  totalPost.value = headers['x-total-count']
  posts.value = postsData
}

const { data } = useQuery({
  queryKey: ['post'],
  queryFn: () => getPosts(params.value)
})

const goPage = (id: number) => {
  return router.push({ name: 'PostDetail', params: { id } })
}

watchEffect(fetchPosts)

watch(
  () => params.value._limit,
  () => {
    return (params.value._page = 1)
  }
)
</script>

<style lang="scss" scoped></style>
