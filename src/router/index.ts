import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const icon = (name: string) => h(SvgIcon, { name });

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: { title: '首页', icon: icon('launch') },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    meta: { title: '示例', icon: icon('launch') },
    children: [
      {
        path: 'page1',
        name: 'Page1',
        meta: { title: '页面一' },
        component: () => import('@/views/example/page1/index.vue')
      },
      {
        path: 'page2',
        name: 'Page2',
        meta: { title: '页面二' },
        component: () => import('@/views/example/page2/index.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/Error.vue'),
    hidden: true
  },

  {
    path: '/401',
    name: '401',
    component: () => import('@/views/Error.vue'),
    hidden: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
