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
                @click="goToForm(item.path, item.title)"
              >
                创建表单
              </n-button>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
    <n-modal
      v-model:show="showModal"
      @positive-click="submitForm"
      @negative-click="showModal = false"
      title="新建COA模版"
      v-bind="modalProps"
      :style="{ width: '600px' }"
    >
      <n-form :model="formData" :rules="rules" ref="formRef">
        <n-form-item label="物料类型" path="materialType">
          <n-select
            v-model:value="formData.materialType"
            :options="materialTypes"
          />
        </n-form-item>
        <n-form-item label="物料编号" path="materialNumber">
          <n-input v-model:value="formData.materialNumber" />
        </n-form-item>
      </n-form>
    </n-modal>
    <n-modal
      v-model:show="showDownloadModal"
      @positive-click="handleDownloadConfirm"
      @negative-click="showDownloadModal = false"
      title="下载COA信息"
      v-bind="modalProps"
    >
      <DownloadCoaModal ref="downloadCoaModalRef" />
    </n-modal>
    <n-modal
      v-model:show="showCancelModal"
      @positive-click="handleCancelConfirm"
      @negative-click="showCancelModal = false"
      title="作废上传信息"
      v-bind="modalProps"
    >
      <CancelUploadModal ref="cancelUploadModalRef" />
    </n-modal>
  </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  CreateOutline,
  CloudUploadOutline,
  AddCircleOutline,
  CloudDownloadOutline,
} from '@vicons/ionicons5'
import { EditOutlined, DeleteOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
import CancelUploadModal from '@/views/coa/component/CancelUploadModal.vue'
import DownloadCoaModal from '@/views/coa/component/DownloadCoaModal.vue'
const message = useMessage()
// 列表数据
const list = shallowRef([
  {
    id: 1,
    title: '新建COA模版',
    icon: AddCircleOutline,
    description: '(新建COA模版)',
    bgColor: 'bg-blue-100',
  },
  {
    id: 1,
    title: '上传COA数据',
    icon: CloudUploadOutline,
    description: '(上传COA数据)',
    bgColor: 'bg-green-100',
    path: '/pages/coa/infoUpload',
  },
  {
    id: 1,
    title: '作废上传信息',
    icon: DeleteOutlined,
    description: '(作废上传信息)',
    bgColor: 'bg-red-100',
  },
  {
    id: 1,
    title: '下载COA信息',
    icon: CloudDownloadOutline,
    description: '(下载COA信息)',
    bgColor: 'bg-yellow-100',
  },
])

const modalProps = {
  draggable: true,
  positiveText: '确认',
  negativeText: '算了',
  preset: 'dialog',
  style: { width: '1200px' },
}
// 路由跳转
const router = useRouter()
const showModal = ref(false)
const showDownloadModal = ref(false)
const showCancelModal = ref(false)
const formData = ref({
  materialType: null,
  materialNumber: '',
})
const materialTypes = [
  { label: '类型1', value: '类型1' },
  { label: '类型2', value: '类型2' },
]
const rules = {
  materialType: {
    required: true,
    message: '请选择物料类型',
    trigger: ['change'],
  },
  materialNumber: {
    required: true,
    message: '请输入物料编号',
    trigger: ['blur', 'input'],
  },
}
const formRef = ref(null)

const cancelUploadModalRef = ref(null)
const handleCancelConfirm = () => {
  const selected = cancelUploadModalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条作废记录')
    return false
  }
  showCancelModal.value = false
  // 继续处理逻辑
  router.push({
    path: '/pages/coa/infoCancel',
  })
}

const downloadCoaModalRef = ref(null)
const handleDownloadConfirm = () => {
  const selected = downloadCoaModalRef.value?.getSelectedRows?.() || []
  if (!selected.length) {
    message.warning('请至少选择一条下载记录')
    return false
  }
  showDownloadModal.value = false
  // 继续处理逻辑
  router.push({
    path: '/pages/coa/infoDownload',
    query: { dataLength: selected.length },
  })
}

const goToForm = (path, title) => {
  if (title === '新建COA模版') {
    showModal.value = true
  } else if (title === '下载COA信息') {
    showDownloadModal.value = true
  } else if (title === '作废上传信息') {
    showCancelModal.value = true
  } else if (!path) {
    message.info('暂未开发，敬请期待')
  } else {
    router.push(path)
  }
}

const submitForm = async () => {
  try {
    await formRef.value.validate()
    router.push({
      path: '/pages/coa/form',
      query: {
        ...formData.value,
      },
    })
    showModal.value = false
    return true
  } catch (errors) {
    message.error('校验未通过，请检查表单项')
    return false
  }
}
</script>

<style scoped></style>
