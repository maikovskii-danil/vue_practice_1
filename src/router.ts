import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedGeneric,
  type RouterOptions,
} from 'vue-router'
import AuthPage from './views/AuthPage.vue'
import ApplicationsPage from './views/ApplicationsPage.vue'
import HelpPage from './views/HelpPage.vue'
import useUserStore from './stores/user'
import ApplicationPage from './views/ApplicationPage.vue'

const navigationGuardCheckLogin = () => {
  const store = useUserStore()

  if (!store.isLoggedIn) {
    return { name: 'auth' }
  }
}

const navigationGuardCheckLogout = (to: RouteLocationNormalizedGeneric) => {
  const store = useUserStore()

  if (to.name === 'auth' && store.isLoggedIn) {
    return { name: 'applications' }
  }
}

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      beforeEnter: navigationGuardCheckLogout,
    },
    {
      path: '/applications',
      name: 'applications',
      alias: '/',
      component: ApplicationsPage,
      beforeEnter: navigationGuardCheckLogin,
    },
    {
      path: '/applications/:applicationId',
      name: 'application',
      component: ApplicationPage,
      beforeEnter: navigationGuardCheckLogin,
      props: true,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
      beforeEnter: navigationGuardCheckLogin,
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

export default router
