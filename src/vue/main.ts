import { createApp, type App as VueApp } from 'vue'
import { createHead, type VueHeadClient } from '@unhead/vue'
import router from './router'

const App = require('@appFile').default

const app: VueApp<Element> = createApp(App)
const head: VueHeadClient<{}> = createHead()

/**
 * Layouts
 */
const layoutFiles = require.context('@layouts/', true, /\.(vue|js|ts)$/i)

layoutFiles.keys().map((key: string) => {
  const layoutName: string =
    'layout-' +
    key
      .split('.')[1]
      .replace(/\//g, '')
      .replace(/([A-Z])/g, '-$1')
      .replace(/(^-)/g, '')
      .toLowerCase()

  app.component(layoutName, layoutFiles(key).default)
})

app.use(head)
app.use(router)

const pluginFiles = require.context('@plugins/', true, /\.(js|ts)$/i)

pluginFiles.keys().map((key: string) => {
  const { plugin, options } = pluginFiles(key).default

  app.use(plugin, options)
})

app.mount('[data-vulmix-app]')
