import { ref } from 'vue'

export default function useFetch(url: string): {
  data: any
  error: Error | null
  pending: boolean | Ref<boolean>
} {
  const data = ref(null)
  const error = ref(null)
  const pending = ref(true)

  fetch(url)
    .then(res => res.json())
    .then(res => {
      data.value = res
      pending.value = false
    })
    .catch(err => {
      error.value = err
      pending.value = false
    })

  return { data, error, pending }
}
