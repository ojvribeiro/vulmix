export type UseFetchOptions = {
  body: BodyInit | null
  headers: HeadersInit
  method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD'
    | 'CONNECT'
    | 'TRACE'
  cache: RequestCache
  mode: RequestMode
  credentials: RequestCredentials
  integrity: string
  keepalive: boolean
  redirect: RequestRedirect
  referrer: string
  referrerPolicy: ReferrerPolicy
  signal: AbortSignal | null
  window: any
}
