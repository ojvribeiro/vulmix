import { ref } from 'vue'

  error: Error | null
  pending: boolean | Ref<boolean>
export default function useFetch<T>(url: string | Ref<string>): {
  data: Ref<T | null>
} {
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
  const data = ref<Ref<T | null>>(null)
}
