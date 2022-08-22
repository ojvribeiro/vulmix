import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@pages/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
  ],
})

export default router
