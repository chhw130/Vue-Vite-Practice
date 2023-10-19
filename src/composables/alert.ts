import { ref } from 'vue'

const useAlert = () => {
  const alerts = ref([])

  const vAlert = (mes: string, type = 'error') => {
    alerts.value.push({ mes, type })
    setTimeout(() => {
      alerts.value.shift()
    }, 2000)
  }

  const vSuccess = (mes: string) => vAlert(mes, 'success')
}
