<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form @submit.prevent @submit="submitHandler">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" v-model="form.title" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea class="form-control" id="content" rows="3" v-model="form.content"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary" type="submit">저장</button>

        <div v-if="isPending">is Loadng...</div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PostData, createPost } from '@/api/posts'
import { useAlert } from '@/composables/alert'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import AppAlert from '@/components/design/AppAlert.vue'
import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

const { alerts, vAlert, vSuccess } = useAlert()

const router = useRouter()

const form = reactive<PostData>({
  title: null,
  content: null,
  createdAt: Date.now()
})

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

const createPost = (data: PostData) => {
  return instance.post('/posts', data)
}

const { mutateAsync: mutateCreatePost, isPending } = useMutation({
  mutationFn: (formData: any) => createPost(formData),
  onSuccess: () => {
    console.log('성공')
  },
  onError: () => {
    console.log('err')
  }
})

const submitHandler = () => {
  mutateCreatePost(form)
}

// const submitHandler = () => {
//   try {
//     createPost(form)
//     router.push({ name: 'PostList' })

//     vSuccess('등록이 완료되었습니다.')
//   } catch (err) {
//     console.log(err)
//     vAlert(err.message)
//   }
// }

const goListPage = () => {
  return router.push({ name: 'PostList' })
}
</script>

<style lang="scss" scoped></style>
