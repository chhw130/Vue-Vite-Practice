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
	</div>
</template>
<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const posts = ref([]);

const router = useRouter();

const fetchPosts = () => {
	posts.value = getPosts();
};

const goPage = id => {
	router.push(`/posts/${id}`);
};

fetchPosts();
</script>

<style lang="scss" scoped></style>
