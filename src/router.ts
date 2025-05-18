import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import AuthPage from './views/AuthPage.vue'
import ApplicationsPage from './views/ApplicationsPage.vue'
import HelpPage from './views/HelpPage.vue'

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
    {
      path: '/applications',
      name: 'applications',
      alias: '/',
      component: ApplicationsPage,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
    },
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
}

const router = createRouter(options)

export default router
