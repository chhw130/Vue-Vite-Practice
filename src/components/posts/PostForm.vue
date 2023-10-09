<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        class="form-control"
        id="title"
        @input="$emit('update:title', $event.target.value)"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        class="form-control"
        id="content"
        rows="3"
        @input="$emit('update:content', $event.target.value)"
      ></textarea>
    </div>
    <div class="pt-4">
      <button type="button" class="btn btn-outline-danger me-2">취소</button>
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
defineEmits(['update:title', 'update:content'])

const goDetailPage = () => {
  return router.push({ name: 'PostDetail', params: { id } })
}
</script>

<style scoped></style>
