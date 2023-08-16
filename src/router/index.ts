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
