import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import i18n from './i18n'

import naive from 'naive-ui'
import './styles/index.css'

import router from './router'

import { useAuthStore } from './stores/auth'

async function bootstrap() {
  const app = createApp(App)

  // 调用 setupApp 函数，注册插件、状态管理等
  setupApp(app)

  // 设置 i18n 初始语言
  setI18nLanguage()

  app.mount('#app')
}

function setupApp(app) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  app.use(i18n)
  app.use(naive)
  app.use(router)
}

function setI18nLanguage() {
  const authStore = useAuthStore()
  i18n.global.locale.value = authStore.language || zh // 设置初始语言
}

bootstrap()
