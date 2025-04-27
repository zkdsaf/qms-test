import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import i18n from './i18n'

import naive from 'naive-ui'
import './assets/tailwind.css'

import router from './router'


import { useAuthStore } from './stores/auth'

const app = createApp(App)
app.use(pinia)
app.use(i18n)
app.use(naive)
app.use(router)


// 在 Pinia 初始化后，设置 i18n 的初始语言
const authStore = useAuthStore()
i18n.global.locale.value = authStore.language || 'zh' // 设置初始语言


app.mount('#app')


