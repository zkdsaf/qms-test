import { useAuthStore } from '@/stores/auth'

const whiteList = ['/login', '/404']

export const authGuard = (to, from) => {
    const authStore = useAuthStore()

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
