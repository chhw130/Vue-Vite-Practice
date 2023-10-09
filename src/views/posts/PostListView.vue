<template>
  <div>
    <h2>게시글 목록</h2>
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
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref<PostData[]>([])
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3
})

const router = useRouter()
const fetchPosts = async () => {
  const postsData = await getPosts(params.value)
  posts.value = postsData
}

const goPage = (id: number) => {
  router.push({ name: 'PostDetail', params: { id } })
}

fetchPosts()
</script>

<style lang="scss" scoped></style>
