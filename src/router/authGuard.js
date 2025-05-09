import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 导入 NProgress 样式
import { setupDynamicRoutes } from './index'
import router from '@/router'

const whiteList = ['/login', '/404']

export const authGuard = async (to, from) => {
  const authStore = useAuthStore()
  NProgress.start()

  if (whiteList.includes(to.path)) {
    return true
  }

  if (!authStore.isLoggedIn) {
    return `/login?redirect=${to.path}`
  }

  if (authStore.isLoggedIn && to.path === '/login') {
    return '/'
  }

  // 如果路由中定义了 systemCode，则设置系统名称 处理用户使用浏览器前进后退按钮时，系统名称不正确的问题
  const systemCode = to.meta.system
  if (systemCode) {
    authStore.setSystemName(systemCode)
  }

  // 检查是否已经添加了动态路由

  const hasDynamicRoutes = router.getRoutes().length > 4

  // 如果没有动态路由，则添加
  if (!hasDynamicRoutes && authStore.user) {
    // 添加动态路由
    await setupDynamicRoutes(authStore.user.username)

    return to.fullPath
  }

  return true
}

export const progressGuard = (to, from) => {
  NProgress.done()
}
