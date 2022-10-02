import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

import App from '../app.vue'

const app = createApp(App)
const head = createHead()

app.component('App', require('@/App.vue').default)

/**
 * Built-in components
 */
const nativeComponents = require.context('@/components/', true, /\.(vue|js)$/i)
nativeComponents
  .keys()
  .map(key => {
    const nativeComponentName = key.split('.')[1].replace(/\//g, '')

    app.component(nativeComponentName, nativeComponents(key).default)
  })

/**
 * Components
 */
const componentFiles = require.context('@components/', true, /\.(vue|js)$/i)
componentFiles
  .keys()
  .map(key => {
    const componentName = key.split('.')[1].replace(/\//g, '')

    app.component(componentName, componentFiles(key).default)
  })


let routes = []

/**
 * Built-in pages
 */
const nativePageComponents = require.context('@/pages/', true, /\.(vue|js)$/i)
nativePageComponents.keys().map(key => {
  let slugName = key
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
const pageComponents = require.context('@pages/', true, /\.(vue|js)$/i)
pageComponents
  .keys()
  .map(key => {
    let slugName = key
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
    })
  })

/**
 * Dynamic Pages
 */
const dynamicPageComponents = require.context('@pages/', true, /\[(.*)\]\.(vue|js)$/i)
dynamicPageComponents
  .keys()
  .map(key => {
    let slugName = key
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
  component: require('@/pages/404.vue').default,
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})


/**
 * Layouts
 */
const layoutFiles = require.context('@layouts/', true, /\.(vue|js)$/i)

layoutFiles
  .keys()
  .map(key => {
    const layoutName =
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

app.mount('[data-app]')
