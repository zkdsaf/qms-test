<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
  </custom-form>
</template>

<script setup lang="jsx">
import { useMessage } from 'naive-ui'

import CustomForm from '@/components/CustomForm.vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  safeImpact: null,
  safeComment: null,
})

// 表单字段配置
const formFields = ref([
  {
    key: 'safeImpact',
    label: '是否影响正常供给',
    type: 'select',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '有影响',
          value: 'Y',
        },
        {
          label: '无影响',
          value: 'N',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },

  {
    key: 'safeComment',
    label: '备注',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    props: {
      type: 'textarea',
      placeholder: '请输入',
      autosize: { minRows: 1, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
  },
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
}

const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

// 暴露方法给父组件
defineExpose({
  validateForm,
  getFormData: () => formData.value,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
