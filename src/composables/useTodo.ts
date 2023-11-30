import { useQuery } from '@tanstack/vue-query'
import { computed } from '@vue/reactivity'
import axios from 'axios'
import { ref, watch } from 'vue'

export const useTodo = () => {
  const {
    data = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then((res) => res.data)
  })

  return { data, isLoading, refetch }
}
