import { createApp } from 'vue'
import router from '@router'

import App from './App.vue'

const app = createApp(App)

const files = require.context('./', true, /\.vue$/i)
files
  .keys()
  .map(key =>
    app.component(key.split('/').pop().split('.')[0], files(key).default)
  )

app.use(router)

app.mount('#app')
