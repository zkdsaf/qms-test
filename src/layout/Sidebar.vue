<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :collapsed="collapsed"
      :options="filteredMenuOptions"
      @update:value="handleUpdateValue"
      :default-value="defaultPath"
      ref="menuInstRef"
    />
  </n-layout-sider>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { allRoutes } from '@/router/systemRoutes'
import { filterMenuOptions } from '@/utils/menuUtils'

const router = useRouter()
const route = useRoute()

const defaultPath = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) return meta.activeMenu
  return path
})

// 所有系统路由
const rawMenuOptions = ref(allRoutes)

// 菜单状态
const collapsed = ref(false)

const menuInstRef = ref(null)

// 获取当前用户角色
const authStore = useAuthStore()
const currentSystem = computed(() => authStore.systemName || 'SPEC')
const userRole = computed(() => authStore.user.username)

// 过滤菜单选项
const filteredMenuOptions = computed(() =>
  filterMenuOptions(rawMenuOptions.value, userRole.value, currentSystem.value)
)

const handleUpdateValue = (path) => {
  router.push(path)
}

// watch(
//   () => route.path,
//   (newPath) => {
//     defaultPath.value = newPath
//     menuInstRef.value?.showOption(newPath)
//   },
//   { immediate: true }
// )
</script>

<style scoped></style>
