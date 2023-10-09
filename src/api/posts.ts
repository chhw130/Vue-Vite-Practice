import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
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
  return res
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
