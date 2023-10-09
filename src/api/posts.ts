import axios from 'axios'
import { Ref } from 'vue'

export const posts = [
  {
    id: 1,
    title: '제목1',
    createdAt: '2020-01-01',
    content: '내용1'
  },
  {
    id: 2,
    title: '제목2',
    createdAt: '2020-01-02',
    content: '내용2'
  },
  {
    id: 3,
    title: '제목3',
    content: '내용3',

    createdAt: '2020-01-03'
  },
  {
    id: 4,
    title: '제목4',
    content: '내용4',
    createdAt: '2020-01-04'
  },
  {
    id: 5,
    title: '제목5',
    content: '내용5',
    createdAt: '2020-01-05'
  }
]

const instance = axios.create({
  baseURL: 'http://localhost:5000'
})

export interface PostData {
  id?: number
  title: string
  content: string
  createdAt?: any
}

export interface PostParamsType {
  _sort: string
  _order: string
  _limit: number
}

export const getPosts = async (params: PostParamsType) => {
  const res = await instance.get('posts', {
    params
  })
  return res.data
}

export const getPostById = async (id: string | string[]) => {
  const res = await instance.get(`posts/${id}`)
  return res.data
}

export const createPost = (data: PostData) => {
  return instance.post('posts', data)
}

export const updatePost = (id: string | string[], data: PostData) => {
  return instance.put(`/posts/${id}`, data)
}

export const deletePost = (id: string | string[]) => {
  return instance.delete(`/posts/${id}`)
}
