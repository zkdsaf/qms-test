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
      title="请选择"
      v-bind="modalProps"
    >
      <MakerInfoModal ref="makerInfoModalRef" />
    </n-modal>

    <n-modal
      v-model:show="showCancelModal"
      @positive-click="handleCancelConfirm"
      @negative-click="showCancelModal = false"
      title="请选择"
      v-bind="modalProps"
    >
      <CancelMakerModal />
    </n-modal>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MakerInfoModal from '../component/MakerInfoModal.vue'
import CancelMakerModal from '../component/CancelMakerModal.vue'
import {
  CreateOutline,
  CloudUploadOutline,
  AddCircleOutline,
} from '@vicons/ionicons5'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const router = useRouter()

const message = useMessage()

const modalProps = {
  draggable: true,
  positiveText: '确认',
  negativeText: '算了',
  preset: 'dialog',
  style: { width: '1200px' },
}

const showModal = ref(false)
const makerInfoModalRef = ref(null)

const showCancelModal = ref(false)

const currentTitle = ref('')

const handleConfirm = () => {
  const selected = makerInfoModalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条数据')
    return false
  }
  showModal.value = false
  router.push({
    path: '/pages/maker/form',
    query: {
      formType: currentTitle.value === '修订Maker Code' ? 'edit' : 'add',
      id: Math.random(),
    },
  })
}

const handleCancelConfirm = () => {
  showCancelModal.value = false
}
// 列表数据
const list = shallowRef([
  {
    id: 1,
    title: 'Maker Code导入',
    icon: CloudUploadOutline,
    description: '(Maker Code导入)',
    bgColor: 'bg-blue-100',
    path: '/pages/maker/uploadInfo',
  },
  {
    id: 1,
    title: 'Maker Code新增料号',
    icon: AddCircleOutline,
    description: '(Maker Code新增料号)',
    bgColor: 'bg-green-100',
  },
  {
    id: 1,
    title: '新建Maker Code(无料号)',
    icon: AddCircleOutline,
    path: '/pages/maker/form',
    description: '(新建Maker Code(无料号))',
    bgColor: 'bg-red-100',
  },
  {
    id: 1,
    title: '修订Maker Code',
    icon: CreateOutline,
    description: '(修订Maker Code)',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 1,
    title: 'Maker Code废除',
    icon: DeleteOutlined,
    description: '(Maker Code废除)',
    bgColor: 'bg-pink-100',
  },
])

// 路由跳转
const goToForm = (item) => {
  currentTitle.value = item.title
  if (item.title === 'Maker Code新增料号' || item.title === '修订Maker Code') {
    showModal.value = true
    return
  }

  if (item.title === 'Maker Code废除') {
    showCancelModal.value = true
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
