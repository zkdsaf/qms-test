<!-- Header.vue -->
<template>
  <n-layout-header bordered class="px-6 py-2">
    <div class="flex items-center justify-between w-full">
      <!-- 左侧Logo -->
      <div class="text-nowrap text-xl font-bold cursor-pointer" @click="goHome">
        <n-gradient-text> {{ $t('common.systemName') }} </n-gradient-text>
      </div>

      <!-- 中间菜单 -->
      <n-menu
        :options="menuOptions"
        mode="horizontal"
        responsive
        class="font-bold text-xl"
        @update:value="handleUpdateValue"
        :value="currentPath"
      />

      <!-- 右侧操作 -->
      <div class="flex items-center space-x-2">
        <!-- 全屏 -->
        <n-tooltip placement="bottom" trigger="hover">
          <template #trigger>
            <n-button text @click="toggleFullscreen">
              <n-icon size="26" depth="1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                  />
                </svg>
              </n-icon>
            </n-button>
          </template>
          全屏
        </n-tooltip>

        <!-- 语言切换 -->
        <n-dropdown :options="languageOptions" @select="handleLanguageChange">
          <n-button text>
            <n-icon size="26">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M12 2a10 10 0 0 0-7 17.76M12 2a10 10 0 0 1 7 17.76M12 2v20"
                />
                <path d="M2 12h20" />
              </svg>
            </n-icon>
          </n-button>
        </n-dropdown>

        <!-- 退出登录 -->

        <n-popconfirm
          @positive-click="handleLogout"
          @negative-click="handleNegativeClick"
        >
          <template #trigger>
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <n-button text>
                  <n-icon size="26" depth="1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H11"
                      />
                    </svg>
                  </n-icon>
                </n-button>
              </template>
              退出登录
            </n-tooltip>
          </template>
          确认退出登录吗
        </n-popconfirm>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { useMessage } from 'naive-ui'
// 菜单选项
const menuOptions = ref([
  {
    label: '物料管理',
    key: 'home',
    children: [
      {
        label: 'EQUAL',
        key: '/pages/equal/todo',
        path: '/pages/equal/todo',
        systemCode: 'EQUAL',
      },
      {
        label: 'ECOA',
        key: '/pages/coa/todo',
        path: '/pages/coa/todo',
        systemCode: 'COA',
      },
      {
        label: 'SPC',
        key: '/pages/spc/todo',
        path: '/pages/spc/todo',
        systemCode: 'SPC',
      },
      { label: 'BarCode', key: 'barCode', isShow: false },
      {
        label: 'EIQA',
        key: '/pages/eiqa/todo',
        path: '/pages/eiqa/todo',
        systemCode: 'EIQA',
      },
    ],
  },
  {
    label: '规格管理',
    key: 'manage',
    children: [
      {
        label: 'SPEC',
        key: '/pages/spec/todo',
        path: '/pages/spec/todo',
        systemCode: 'SPEC',
      },
    ],
  },
  {
    label: '生产商管理',
    key: 'history',
    children: [
      {
        label: 'MAKERCODE',
        key: '/pages/maker/todo',
        path: '/pages/maker/todo',
        systemCode: 'MAKERCODE',
      },
      {
        label: 'VENDORINFO',
        key: '/pages/vendor/todo',
        path: '/pages/vendor/todo',
        systemCode: 'VENDOR',
      },
      {
        label: 'CERT',
        key: '/pages/cert/todo',
        path: '/pages/cert/todo',
        systemCode: 'CERT',
      },
    ],
  },
  {
    label: '资源池管理',
    key: 'analysis',
    children: [{ label: 'E-AVL', key: 'eAvl' }],
  },
  {
    label: '物料异常提醒',
    key: 'settings',
    children: [
      {
        label: 'OOW',
        key: '/pages/oow/todo',
        path: '/pages/oow/todo',
        systemCode: 'OOW',
      },
      {
        label: 'IQND',
        key: '/pages/iqnd/todo',
        path: '/pages/iqnd/todo',
        systemCode: 'IQND',
      },
      { label: 'PiRun', key: 'piRun', isShow: false },
      {
        label: 'SLED',
        key: '/pages/sled/todo',
        path: '/pages/sled/todo',
        systemCode: 'SLED',
      },
    ],
  },
  {
    label: '供应商管理',
    key: 'data',
    children: [
      { label: 'CAR', key: 'car', isShow: false },
      { label: 'CIP', key: 'cip', isShow: false },
      { label: 'QSA', key: 'qsa', isShow: false },
      { label: 'QCDSE', key: 'qcdse', isShow: false },
      { label: 'HQR', key: 'hqr', isShow: false },
    ],
  },
  {
    label: '变更管理',
    key: 'stats',
    children: [{ label: 'PCN', key: 'pcn', isShow: false }],
  },
  {
    label: '统计分析管理',
    key: 'stats1',
    children: [{ label: 'SCL', key: 'scl', isShow: false }],
  },
])

// 语言选项
const languageOptions = ref([
  { label: '中文', key: 'zh' },
  { label: 'English', key: 'en' },
])

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const message = useMessage()
const { t, locale } = useI18n()

const currentPath = computed(() => {
  const setSystemName = authStore.systemName
  return `/pages/${setSystemName.toLowerCase()}/todo`
})

const goHome = () => {
  router.push('/')
  authStore.setSystemName('')
}
//菜单选中
const handleUpdateValue = (key, item) => {
  if (item.isShow !== undefined && !item.isShow) {
    message.warning(`${item.label}开发中,敬请期待`)
    return
  }
  if (item.path) {
    authStore.setSystemName(item.systemCode)
    router.push({
      path: item.path,
      query: {
        t: new Date().getTime(),
      },
    })
  }
  message.success(item.label)
}

const handleNegativeClick = () => {
  message.info('再考虑一下吧')
}

// 处理退出登录
const handleLogout = () => {
  // 获取当前路径
  const currentPath = route.fullPath
  // 调用退出登录方法
  authStore.logout()
  message.success('已退出登录')
  // 跳转到登录页面，并带上 redirect 参数
  router.push({
    path: '/login',
    query: { redirect: currentPath },
  })
}

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 切换语言
const handleLanguageChange = (key) => {
  authStore.setLanguage(key)
  locale.value = key
  message.info(`语言切换为:${key === 'zh' ? '中文' : '英文'}`)
}
</script>

<style>
.v-overflow {
  justify-content: center !important;
}
</style>
