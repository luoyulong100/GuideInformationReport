import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'InformationReporting',
      component: () => import('@/view/InformationReporting/InformationReportingIndex.vue')
    }
    // {
    //   path: '/',
    //   name: 'AppLayout',
    //   component: () => import('../components/layout/appLayout.vue'),
    //   meta: { requiresAuth: true },
    //   children: [
    //     {
    //       path: '',
    //       name: 'IndexView',
    //       component: () => import('../views/indexView.vue')
    //     },
    //     {
    //       path: '/about',
    //       name: 'About',
    //       component: () => import('../views/AboutView.vue')
    //     },
    //     {
    //       path: '/menus',
    //       name: 'Menus',
    //       component: () => import('@/views/menu/menuIndex.vue')
    //     },
    //     {
    //       path: '/:xxx(.*)*',
    //       name: 'ErrorPage',
    //       component: () => import('@/components/layout/errorPage.vue')
    //     }
    //   ]
    // }
  ]
})

export default router
