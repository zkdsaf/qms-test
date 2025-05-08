import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, progressGuard } from './authGuard'
import { allRoutes } from './systemRoutes'
const routes = [
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('@/layout/DefaultLayout.vue'),
    children: [...allRoutes],
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)
router.afterEach(progressGuard)
export default router
