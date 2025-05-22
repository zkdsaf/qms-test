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
      v-model:show="showCertModal"
      @positive-click="handleCertConfirm"
      @negative-click="showCertModal = false"
      v-bind="modalProps"
    >
      <CertInfoModal ref="certModalRef" />
    </n-modal>

    <n-modal
      v-model:show="showMaterialModal"
      @positive-click="handleMaterialConfirm"
      @negative-click="showMaterialModal = false"
      v-bind="modalProps"
    >
      <MaterialModal ref="materialModalRef" />
    </n-modal>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import CertInfoModal from '../component/CertInfoModal.vue'
import MaterialModal from '../component/MaterialModal.vue'
import {
  CreateOutline,
  CloudUploadOutline,
  AddCircleOutline,
} from '@vicons/ionicons5'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
const message = useMessage()

const modalProps = {
  title: '请选择',
  draggable: true,
  positiveText: '确认',
  negativeText: '算了',
  preset: 'dialog',
  style: { width: '1200px' },
}

const router = useRouter()
const currentTitle = ref('')

const showCertModal = ref(false)
const showMaterialModal = ref(false)

const certModalRef = ref(null)
const materialModalRef = ref(null)

const handleCertConfirm = () => {
  const selected = certModalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条数据')
    return false
  }

  showCertModal.value = false

  if (currentTitle.value === '修订供应商信息') {
    showMaterialModal.value = true
  } else {
    router.push({
      path: '/pages/vendor/form',
      query: {
        id: Math.random(),
        formType: 'edit',
      },
    })
  }
}

const handleMaterialConfirm = () => {
  const selected = materialModalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条数据')
    return false
  }
  router.push({
    path: '/pages/vendor/form',
    query: {
      id: Math.random(),
      formType: 'edit',
    },
  })
}
// 列表数据
const list = shallowRef([
  {
    id: 1,
    title: '修订供应商信息',
    icon: EditOutlined,
    description: '(修订供应商信息)',
    bgColor: 'bg-blue-100',
  },
  {
    id: 1,
    title: '修订供应商信息(无料号)',
    icon: EditOutlined,
    description: '(修订供应商信息(无料号))',
    bgColor: 'bg-green-100',
  },
])

// 路由跳转
const goToForm = (item) => {
  currentTitle.value = item.title
  if (
    item.title === '修订供应商信息' ||
    item.title === '修订供应商信息(无料号)'
  ) {
    showCertModal.value = true
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
