import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ]
});

export default router;
