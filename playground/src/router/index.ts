import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/native-demo',
    name: 'native-demo',
    component: () => import('@/views/NativeDemo/index.vue'),
  },
  {
    path: '/vue-demo',
    name: 'vue-demo',
    component: () => import('@/views/VueDemo/index.vue'),
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/DocsView/index.vue'),
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('@/views/ApiView/index.vue'),
  },
];

const router = createRouter({
  // Use hash mode for subdirectory deployment compatibility
  history: createWebHashHistory(),
  routes,
});

export default router;
