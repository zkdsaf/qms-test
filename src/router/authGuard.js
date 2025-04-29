import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 导入 NProgress 样式
const whiteList = ['/login', '/404']

export const authGuard = (to, from) => {
  const authStore = useAuthStore()
  NProgress.start()

  if (authStore.isLoggedIn && to.path === '/login') {
    return '/'
  }

  if (whiteList.includes(to.path)) {
    return true
  }

  if (!authStore.isLoggedIn) {
    return `/login?redirect=${to.path}`
  }

  return true
}

export const progressGuard = (to, from) => {
  NProgress.done()
}
