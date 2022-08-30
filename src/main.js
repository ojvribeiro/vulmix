import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const app = createApp(App)

const files = require.context('./', true, /\.vue$/i)
files
  .keys()
  .map(key =>
    app.component(key.split('/').pop().split('.')[0], files(key).default)
  )

let routes = []

const pageFiles = require.context('./pages/', true, /\.(vue|js)$/i)

pageFiles
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
        component: pageFiles(key).default,
      })
    }
  )

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

app.use(router)

app.mount('#app')
