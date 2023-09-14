import { ref, unref } from 'vue'

export default function useFetch<T>(url: string | Ref<string>): {
  data: Ref<T | null>
  hasError?: Ref<boolean>
  isPending?: Ref<boolean>
} {
  const data = ref<Ref<T | null>>(null)
  const hasError = ref<boolean>(false)
  const isPending = ref<boolean>(true)

  makeRequest()

  function makeRequest() {
    fetch(unref(url))
      .then(async rawResponse => {
        const jsonResult = await rawResponse.json()

        return { jsonResult, rawResponse }
      })
      .then(({ jsonResult, rawResponse }) => {
        if (!rawResponse.ok) {
          data.value = null
          hasError.value = true
          isPending.value = false

          return
        }

        data.value = jsonResult
        isPending.value = false
      })
      .catch(err => {
        data.value = null
        hasError.value = true
        isPending.value = false

        console.error(err)
      })
  }
  return { data, hasError, isPending }
}
