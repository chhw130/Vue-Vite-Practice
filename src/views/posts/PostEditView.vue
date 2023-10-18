<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="formData.title"
      v-model:content="formData.content"
      @submit.prevent="editPost"
    ></PostForm>
  </div>
</template>

<script setup lang="ts">
import { PostData, getPostById, updatePost } from '@/api/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const formData = ref<PostData>({
  title: '',
  content: '',
  createdAt: Date.now()
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
  await updatePost(id, formData.value)
  goDetailPage()
}
const goDetailPage = () => {
  return router.push({ name: 'PostDetail', params: { id } })
}

fetchPost()
</script>

<style lang="scss" scoped></style>
