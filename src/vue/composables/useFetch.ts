import { ref, unref, toRef, watch, type Ref } from 'vue'
import type { UseFetchOptions, UseFetchReturn } from './types'

export default function useFetch<T>(
  url: string | Ref<string>,
  options?: UseFetchOptions
): UseFetchReturn<T> {
  const data = ref<Ref<T | null> | null>(null)
  const hasError = ref<boolean>(false)
  const isPending = ref<boolean>(true)
  const response = ref<Response | null>(null)

  makeRequest()

  function makeRequest() {
    fetch(unref(url), options)
      .then(async rawResponse => {
        const jsonResult = await rawResponse.json()

        return { jsonResult, rawResponse }
      })
      .then(({ jsonResult, rawResponse }) => {
        response.value = rawResponse

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
        response.value = null
        hasError.value = true
        isPending.value = false

        console.error(err)
      })
  }

  function refresh() {
    isPending.value = true

    makeRequest()
  }

  watch(toRef(url), () => {
    refresh()
  })

  return { data, hasError, isPending, response, refresh }
}
