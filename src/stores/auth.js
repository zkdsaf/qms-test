import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // 用户信息
    const user = ref(null)
    const isLoggedIn = ref(false)
    const systemName = ref('')
    const language = ref('zh')
    const collapsed = ref(false)
    const selectedSystem = ref('')
    const selectedMaterial = ref('')

    // 登录方法
    const login = async (username, password, options = {}) => {
      // 校验用户名和密码
      if (
        (username === 'admin' && password === 'admin') ||
        (username === 'user' && password === 'user')
      ) {
        // 登录成功
        user.value = {
          username,
          system: options.system,
          material: options.material,
        }
        isLoggedIn.value = true
        selectedSystem.value = options.system
        selectedMaterial.value = options.material

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
      collapsed.value = false
      language.value = 'zh'
      systemName.value = ''
      selectedSystem.value = ''
      selectedMaterial.value = ''
      // 重置路由
      resetRouter()
    }

    // 重置路由
    const resetRouter = () => {
      const baseRoutesName = ['Pages', 'Home', 'Login', 'NotFound']
      // 移除所有动态添加的路由
      router.getRoutes().forEach((route) => {
        if (route.name && !baseRoutesName.includes(route.name)) {
          router.removeRoute(route.name)
        }
      })
    }

    // 设置系统名称
    const setSystemName = (name) => {
      systemName.value = name
    }

    // 设置语言
    const setLanguage = (lang) => {
      language.value = lang
    }

    const setCollapsed = (value) => {
      collapsed.value = value
    }

    return {
      user,
      isLoggedIn,
      login,
      logout,
      systemName,
      setSystemName,
      language,
      setLanguage,
      resetRouter,
      collapsed,
      setCollapsed,
      selectedSystem,
      selectedMaterial,
    }
  },
  {
    // 添加持久化配置
    persist: {
      // 存储的 key 名
      key: 'auth-store',
      // 使用 localStorage 存储
      storage: localStorage,
      paths: [
        'isLoggedIn',
        'user',
        'systemName',
        'language',
        'collapsed',
        'selectedSystem',
        'selectedMaterial',
      ],
    },
  }
)
