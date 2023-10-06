<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPostById } from '@/api/posts'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { PostData } from '@/api/posts'

const route = useRoute()
const router = useRouter()
const post = ref<PostData>({
  title: '',
  content: '',
  createdAt: ''
})

const id = route.params.id

const fetchPost = async () => {
  const fetchData = await getPostById(id)
  return setPost(fetchData)
}

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}
fetchPost()

const goListPage = () => {
  return router.push({ name: 'PostList' })
}

const goEditPage = () => {
  return router.push({ name: 'PostEdit', params: { id: id } })
}
</script>

<style lang="scss" scoped></style>
