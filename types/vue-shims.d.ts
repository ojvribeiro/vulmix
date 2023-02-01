declare module '*.vue' {
  import type { DefineComponent } from '@vue/runtime-core'
  const VulmixComponent: DefineComponent<{}, {}, any>
  export default VulmixComponent
}
