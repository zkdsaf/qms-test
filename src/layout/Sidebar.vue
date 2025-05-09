<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    :native-scrollbar="false"
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
      ref="menuInstRef"
      :value="defaultPath"
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

const defaultPath = ref('')

// 所有系统路由
const rawMenuOptions = ref(allRoutes)

// 菜单状态
const collapsed = ref(false)

const menuInstRef = ref(null)

// 获取当前用户角色
const authStore = useAuthStore()
const currentSystem = computed(() => authStore.systemName || 'SPEC')
const userRole = computed(() => authStore.user?.username)

// 过滤菜单选项
const filteredMenuOptions = computed(() =>
  filterMenuOptions(rawMenuOptions.value, userRole.value, currentSystem.value)
)

const handleUpdateValue = (path) => {
  router.push(path)
}

//选中菜单
watch(
  () => route,
  (route) => {
    const { meta, path } = route
    defaultPath.value = meta.activeMenu || path
    menuInstRef.value?.showOption(meta.activeMenu || path)
  },
  { immediate: true, deep: true }
)
</script>

<style scoped></style>
