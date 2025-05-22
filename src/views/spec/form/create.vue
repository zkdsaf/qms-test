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
              <n-button type="primary" size="small" @click="goToForm(item)">
                创建表单
              </n-button>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>

    <n-modal
      v-model:show="showModal"
      @positive-click="handleConfirm"
      @negative-click="showModal = false"
      title="规格书信息"
      v-bind="modalProps"
    >
      <DocInfoModal ref="modalRef" />
    </n-modal>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CreateOutline } from '@vicons/ionicons5'
import DocInfoModal from '../component/DocInfoModal.vue'

import { EditOutlined, DeleteOutlined, CloudUploadOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
const message = useMessage()

const modalProps = {
  draggable: true,
  positiveText: '确认',
  negativeText: '算了',
  preset: 'dialog',
  style: { width: '1200px' },
}
const showModal = ref(false)
const currentChangeTile = ref('新建规格书')

// 列表数据
const list = shallowRef([
  {
    id: 1,
    title: '导入规格书',
    icon: CloudUploadOutlined,
    path: '/pages/spec/uploadInfo',
    description: '导入规格书',
    bgColor: 'bg-orange-100',
  },
  {
    id: 1,
    title: '新建规格书',
    icon: CreateOutline,
    path: '/pages/spec/form',
    description: '(无规格书引用)',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    title: '新建规格书',
    icon: CreateOutline,
    description: '(有规格书引用)',
    bgColor: 'bg-green-100',
    path: '/pages/spec/referForm',
  },
  {
    id: 3,
    title: '修订规格书',
    icon: EditOutlined,
    description: '(修订规格书)',
    bgColor: 'bg-red-100',
  },
  {
    id: 4,
    title: '作废规格书',
    icon: DeleteOutlined,
    description: '(作废规格书)',
    bgColor: 'bg-yellow-100',
  },
])
const modalRef = ref(null)
const handleConfirm = () => {
  const selected = modalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条作废记录')
    return false
  }
  showModal.value = false

  router.push({
    path:
      currentChangeTile.value == '作废规格书'
        ? '/pages/spec/cancelForm'
        : '/pages/spec/editForm',
    query: {
      id: selected.toString(),
      formType: currentChangeTile.value == '作废规格书' ? 'cancel' : 'edit',
    },
  })
}
// 路由跳转
const router = useRouter()
const goToForm = (item) => {
  currentChangeTile.value = item.title
  if (['修订规格书', '作废规格书'].includes(item.title)) {
    showModal.value = true
    return
  }

  if (!item.path) {
    message.info('暂未开发，敬请期待')
    return
  }
  router.push(item.path)
}
</script>

<style scoped></style>
