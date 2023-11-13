import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostCreateView from '@/views/posts/PostCreateView.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostEditView from '@/views/posts/PostEditView.vue'
import PostListView from '@/views/posts/PostListView.vue'
import NotFound from '@/views/NotFoundView.vue'
import NestedView from '@/views/nested/NestedView.vue'
import NestedOneView from '@/views/nested/NestedOneView.vue'
import NestedTwoView from '@/views/nested/NesetedTwoView.vue'
import MyPageView from '@/views/mypage/MyPageView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/posts',
      name: 'PostList',
      component: PostListView
    },
    {
      path: '/posts/create',
      name: 'PostCreate',
      component: PostCreateView
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: PostDetailView
    },
    {
      path: '/posts/:id/edit',
      name: 'PostEdit',
      component: PostEditView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/my',
      name: 'Mypage',
      component: MyPageView
    },
    {
      path: '/nested',
      name: 'Nested',
      component: NestedView,
      children: [
        {
          path: 'one',
          name: 'NestOne',
          component: NestedOneView
        },
        {
          path: 'two',
          name: 'NestTwo',
          component: NestedTwoView
        }
      ]
    }
  ]
})

export default router
