<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="editPost">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" v-model="formData.title" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea class="form-control" id="content" rows="3" v-model="formData.content"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PostData, getPostById, updatePost } from '@/api/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const formData = ref<PostData>({
  title: '',
  content: ''
})

const fetchPost = async () => {
  const data = await getPostById(id)
  return setForm(data)
}

const setForm = (data: PostData) => {
  formData.value.title = data.title
  formData.value.content = data.content
}

const editPost = async () => {
  console.log(formData.value)
  await updatePost(id, formData.value)
}

fetchPost()
const goDetailPage = () => {
  return router.push({ name: 'PostDetail', params: { id } })
}
</script>

<style lang="scss" scoped></style>
