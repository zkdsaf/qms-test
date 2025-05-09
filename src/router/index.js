import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, progressGuard } from './authGuard'
import { allRoutes } from './systemRoutes'

// 基础路由
const baseRoutes = [
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('@/layout/DefaultLayout.vue'),
    children: [],
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
  routes: baseRoutes,
})

// 动态添加路由的方法
export const setupDynamicRoutes = async (userRole) => {
  // 递归过滤路由的方法
  const filterRoutes = (routes) => {
    return routes.filter((route) => {
      // 检查当前路由的权限
      const hasPermission =
        !route.meta?.role || route.meta.role.includes(userRole)

      // 如果有子路由，递归过滤子路由
      if (route.children && route.children.length > 0) {
        route.children = filterRoutes(route.children)
        // 如果子路由全部被过滤掉，且当前路由没有权限，则过滤掉当前路由
        return hasPermission && route.children.length > 0
      }

      return hasPermission
    })
  }

  // 根据用户角色过滤路由
  const filteredRoutes = filterRoutes(allRoutes)

  // 添加过滤后的路由
  for (const route of filteredRoutes) {
    router.addRoute('Pages', route)
  }

  return filteredRoutes
}

router.beforeEach(authGuard)
router.afterEach(progressGuard)

export default router
