import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // 用户信息
    const user = ref(null)
    const isLoggedIn = ref(false)
    const systemName = ref('')

    // 登录方法
    const login = async (username, password) => {
      // 校验用户名和密码
      if ((username === 'admin' && password === 'admin') || (username === 'user' && password === 'user')) {
        // 登录成功
        user.value = { username }
        isLoggedIn.value = true
        return Promise.resolve()
      } else {
        // 登录失败
        return Promise.reject(new Error('用户名或密码错误'))
      }
    }

    // 退出登录
    const logout = () => {
      user.value = null
      isLoggedIn.value = false
    }

    // 设置系统名称
    const setSystemName = (name) => {
      systemName.value = name
    }

    return { user, isLoggedIn, login, logout, systemName, setSystemName }
  },
  {
    // 添加持久化配置
    persist: {
      // 存储的 key 名
      key: 'auth-store',
      // 使用 localStorage 存储
      storage: localStorage,
    },
  }
)
