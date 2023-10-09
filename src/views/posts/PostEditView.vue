<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm :title="formData.title" :content="formData.content" @submit="editPost"></PostForm>
  </div>
</template>

<script setup lang="ts">
import { PostData, getPostById, updatePost } from '@/api/posts'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostForm from '@/components/posts/PostForm.vue'

const router = useRouter()
const route = useRoute()
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
  console.log(formData.value)
  await updatePost(id, formData.value)
}

fetchPost()

</script>

<style lang="scss" scoped></style>
