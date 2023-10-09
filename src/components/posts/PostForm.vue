<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input :value="title" type="text" class="form-control" id="title" @input="updateTitle" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        class="form-control"
        id="content"
        rows="3"
        @input="updateContent"
      ></textarea>
    </div>
    <div class="pt-4">
      <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">취소</button>
      <button class="btn btn-primary">수정</button>
    </div>
    <!-- <slot name="actions"> </slot> -->
  </form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()
const id = route.params.id

defineProps({
  title: String,
  content: String
})
const emit = defineEmits(['update:title', 'update:content'])

const updateTitle = (e: Event) => {
  emit('update:title', (e.target as HTMLInputElement).value)
}

const updateContent = (e: Event) => {
  emit('update:content', (e.target as HTMLInputElement).value)
}

const goDetailPage = () => {
  return router.push({ name: 'PostDetail', params: { id } })
}
</script>

<style scoped></style>
