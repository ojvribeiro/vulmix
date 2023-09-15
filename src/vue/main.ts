import { createApp, App as VueApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { createHead, HeadClient } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from '~/app.vue'

const app: VueApp<Element> = createApp(App)
const head: HeadClient<{}> = createHead()

const pinia = createPinia()

/**
 * Built-in components
 */
const nativeComponents = require.context(
  '@@/vue/components/',
  true,
  /\.(vue|js|ts)$/i
)
nativeComponents.keys().map((key: string) => {
  let nativeComponentName: string = key.split('.')[1].replace(/\//g, '')

  if (nativeComponentName.match(/index$/)) {
    nativeComponentName = nativeComponentName.replace('index', '')
  }

  app.component(nativeComponentName, nativeComponents(key).default)
})

let routes: Array<{
  path: string
  component: any
  meta?: any
}> = []

/**
 * Built-in pages
 */
const nativePageComponents = require.context(
  '@@/vue/pages/',
  true,
  /\.(vue|js|ts)$/i
)
nativePageComponents.keys().map((key: string) => {
  let slugName: string = key
    .split('.')[1]
    .replace(/([A-Z])/g, '-$1')
    .replace(/(^-)/g, '')
    .toLowerCase()

  if (slugName.match(/\/index$/)) {
    slugName = slugName.replace('/index', '/')
  }

  routes.push({
    path: slugName === '/index' ? '/' : `/${slugName}`,
    component: nativePageComponents(key).default,
  })
})

/**
 * Pages
 */
const pageComponents = require.context('@pages/', true, /\.(vue|js|ts)$/i)
pageComponents.keys().map((key: string) => {
  let slugName: string = key
    .split('.')[1]
    .replace(/([A-Z])/g, '-$1')
    .replace(/(^-)/g, '')
    .toLowerCase()

  if (slugName.match(/\/index$/)) {
    slugName = slugName.replace('/index', '/')
  }

  routes.push({
    path: slugName === '/index' ? '/' : `/${slugName}`,
    component: pageComponents(key).default,
    meta: {
      transition: require('~/.vulmix/vulmix.config.js')?.default?.transition
        ? require('~/.vulmix/vulmix.config.js')?.default?.transition?.name
        : '',
    },
  })
})

/**
 * Dynamic Pages
 */
const dynamicPageComponents = require.context(
  '@pages/',
  true,
  /\[(.*)\]\.(vue|js|ts)$/i
)
dynamicPageComponents.keys().map((key: string) => {
  let slugName: string = key
    .split('.')[1]
    .replace(/([A-Z])/g, '-$1')
    .replace(/(^-)/g, '')
    .toLowerCase()

  if (slugName.match(/\/index$/)) {
    slugName = slugName.replace('/index', '/')
  } else {
    slugName = slugName.replace(/\/\[(.*)\]/, '/:$1')
  }

  routes.push({
    path: slugName === '/index' ? '/' : `/${slugName}`,
    component: dynamicPageComponents(key).default,
  })
})

routes.push({
  path: '/:pathMatch(.*)*',
  component: require('@@/vue/pages/404.vue').default,
})

const router: Router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

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

app.use(router)
app.use(head)
app.use(pinia)

const pluginFiles = require.context('@/plugins/', true, /\.(js|ts)$/i)

pluginFiles.keys().map((key: string) => {
  const { plugin, options } = pluginFiles(key).default

  app.use(plugin, options)
})

app.mount('[data-vulmix-app]')
