<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<div class="row g-3">
			<div class="col-5">
				<PostItem title="제목" content="내용" createdAt="2020.03.10" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';

const posts = ref([]);

const fetchPosts = () => {
	posts.value = getPosts();
};

fetchPosts();
</script>

<style lang="scss" scoped></style>
