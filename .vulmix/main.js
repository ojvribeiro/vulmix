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
  .map(key =>
    app.component(key.split('/').pop().split('.')[0], nativeComponents(key).default)
  )

/**
 * Components
 */
const componentFiles = require.context('@components/', true, /\.(vue|js)$/i)
componentFiles
  .keys()
  .map(key =>
    app.component(key.split('/').pop().split('.')[0], componentFiles(key).default)
  )


let routes = []

/**
 * Built-in pages
 */
const nativePageComponents = require.context('@/pages/', true, /\.(vue|js)$/i)
nativePageComponents.keys().map(key => {
  let slugName = key
    .split('/')
    .pop()
    .split('.')[0]
    .replace(/([A-Z])/g, '-$1')
    .replace(/(^-)/g, '')
    .toLowerCase()

  routes.push({
    path: slugName === 'index' ? '/' : `/${slugName}`,
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
      .split('/')
      .pop()
      .split('.')[0]
      .replace(/([A-Z])/g, '-$1')
      .replace(/(^-)/g, '')
      .toLowerCase()

      routes.push({
        path: slugName === 'index' ? '/' : `/${slugName}`,
        component: pageComponents(key).default,
      })
    }
  )

routes.push({
  path: '/:pathMatch(.*)*',
  component: require('@/pages/404.vue').default,
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

app.use(router)
app.use(head)

app.mount('#app')
