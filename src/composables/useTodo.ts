import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export const useTodo = () => {
  const {
    data = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['todo'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data)
  })

  return { data, isLoading, refetch }
}
