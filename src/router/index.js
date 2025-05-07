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

// 暴露切换系统的方法（仅更新系统状态并跳转）
export const switchSystem = (system) => {
  // 跳转到新系统的默认页面
  const defaultRoute = `/pages/${system.toLowerCase()}/todo`

  console.log('🚀 ~ defaultRoute:', defaultRoute)
  console.log(router.getRoutes())

  router.isReady().then(() => {
    router.push(defaultRoute).catch((err) => {
      console.log('🚀 ~ err:', err)
    })
  })
}

router.beforeEach(authGuard)
router.afterEach(progressGuard)
export default router
