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

const pluginFiles = require.context('@plugins/', true, /\.(js|ts)$/i)

pluginFiles.keys().map((key: string) => {
  const { plugin, options } = pluginFiles(key).default

  app.use(plugin, options)
})

const routerFile = require.context('@pages/', true, /index\.(vue|js|ts)$/i)

// only use router if /pages folder exists
if (routerFile.keys().length > 0) {
  app.use(router)
}

app.mount('[data-vulmix-app]')
