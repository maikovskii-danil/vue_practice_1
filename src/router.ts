import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import AuthPage from './views/AuthPage.vue'
import ApplicationsPage from './views/ApplicationsPage.vue'
import HelpPage from './views/HelpPage.vue'
import useUserStore from './stores/user'
import ApplicationPage from './views/ApplicationPage.vue'

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
      path: '/applications/:applicationId',
      name: 'application',
      component: ApplicationPage,
      props: true,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
    },
    {
      path: '/:notFound(.*)',
      redirect: '/',
    },
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link',
}

const router = createRouter(options)

router.beforeEach((to) => {
  const store = useUserStore()

  const name = (to?.name ?? '').toString()

  if (!store.isLoggedIn && !['auth'].includes(name)) {
    return { name: 'auth' }
  }
})

export default router
