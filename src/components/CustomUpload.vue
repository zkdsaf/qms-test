<!-- FileUpload.vue -->
<template>
  <n-upload
    v-bind="uploadProps"
    :file-list="localFileList"
    :custom-request="customRequest"
    :disabled="disabled"
    @update:file-list="handleFileListUpdate"
    @remove="handleRemove"
  >
    <slot name="default">
      <n-button type="primary">选择文件</n-button>
    </slot>
  </n-upload>
</template>

<script setup>
import { NUpload, NButton, useMessage } from 'naive-ui'

const message = useMessage()

const props = defineProps({
  action: { type: String, required: true },
  accept: { type: String, default: '.jpg,.png,.pdf' },
  max: { type: Number, default: 3 },
  listType: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'picture', 'picture-card'].includes(value),
  },
  multiple: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  value: { type: Array, default: () => [] },
})

const emit = defineEmits(['update:value', 'change'])

const localFileList = computed(() => props.value)

const uploadProps = computed(() => ({
  accept: props.accept,
  max: props.max,
  listType: props.listType,
  multiple: props.multiple,
}))

const customRequest = async ({ file, onFinish, onError, onProgress }) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.file.size > maxSize) {
    file.status = 'error'
    onError()
    message.error(`文件 ${file.name} 超过 5MB`)
    return
  }

  const formData = new FormData()
  formData.append('file', file.file)

  try {
    onProgress({ percent: 0 })
    const response = await fetch(props.action, {
      method: 'POST',
      body: formData,
    })
    onProgress({ percent: 100 })

    if (!response.ok) throw new Error('上传失败')
    const result = await response.json()
    file.url = result.url
    file.status = 'finished'
    onFinish()
  } catch (error) {
    file.status = 'error'
    onError()
    message.error(`上传失败: ${error.message}`)
  }
}

const handleFileListUpdate = (fileList) => {
  emit('update:value', fileList) // 更新 v-model
  emit('change', fileList) // 通知变化
}

const handleRemove = ({ file, fileList }) => {
  emit('update:value', fileList)
  emit('change', fileList)
}
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
