import {
  type RouteRecordRaw,
  type RouterOptions,
  createRouter,
  createWebHistory,
} from 'vue-router';

import useUserStore from './stores/user';

const pages = import.meta.glob('./views/*.vue');

const pageMeta = {
  applications: {
    alias: '/',
  },
  application: {
    path: '/applications/:applicationId',
    props: true,
  },
};

const isPageMetaKey = (fileName: string): fileName is keyof typeof pageMeta =>
  fileName in pageMeta;

const routes = Object.entries(pages)
  .map(([path, loader]) => {
    const fileName = path.match(/\.\/views\/(.*)\.vue$/)?.[1];

    if (!fileName) {
      return null;
    }

    return {
      path: `/${fileName}`,
      name: fileName,
      ...(isPageMetaKey(fileName) ? pageMeta[fileName] : {}),
      component: loader,
    };
  })
  .filter(Boolean);

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    ...(routes as RouteRecordRaw[]),
    { path: '/:notFound(.*)', redirect: '/' },
  ],
};

const router = createRouter(options);

const AUTH_NOT_REQUIRED_ROUTES = ['auth'];

router.beforeEach((to) => {
  const store = useUserStore();

  const name = (to?.name ?? '').toString();

  if (!store.isLoggedIn && !AUTH_NOT_REQUIRED_ROUTES.includes(name)) {
    return { name: 'auth' };
  }

  return undefined;
});

export default router;
