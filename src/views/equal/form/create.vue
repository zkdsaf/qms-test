<template>
  <n-card class="h-full">
    <div class="p-6">
      <n-grid cols="1 m:3" :x-gap="12" :y-gap="12" responsive="screen">
        <n-gi v-for="item in list" :key="item.id">
          <div
            :class="`flex flex-col rounded-lg p-10 items-center  text-center ${item.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50`"
          >
            <n-icon size="45" :component="item.icon" />
            <div class="flex-1 mt-2">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ item.title }}
              </h2>
              <p class="text-gray-600 my-2">{{ item.description }}</p>
              <n-button
                type="primary"
                size="small"
                @click="goToForm(item.path)"
              >
                创建表单
              </n-button>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CreateOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
const message = useMessage()
// 列表数据
const list = shallowRef([
  {
    id: 1,
    title: '物料立项申请',
    icon: CreateOutline,
    path: '/pages/equal/form',
    description: '(物料立项申请)',
    bgColor: 'bg-blue-100',
  },
  {
    id: 1,
    title: 'Create Material Qualification Form',
    icon: CreateOutline,
    description: '(Create Material Qualification Form)',
    bgColor: 'bg-green-100',
    path: '/pages/equal/materialForm',
  },
])

// 路由跳转
const router = useRouter()
const goToForm = (path) => {
  if (!path) {
    message.info('暂未开发，敬请期待')
    return
  }
  router.push(path)
}
</script>

<style scoped></style>
