import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 导入 NProgress 样式
const whiteList = ['/login', '/404']

export const authGuard = (to, from) => {
  const authStore = useAuthStore()
  NProgress.start()

  console.log('beforeEach', authStore.isLoggedIn, to.path)

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

  return true
}

export const progressGuard = (to, from) => {
  NProgress.done()
}
