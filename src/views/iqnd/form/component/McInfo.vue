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
  inventoryImpact: null,
  currentStock: null,
  unit: null,
  stockRemark: null,
  isReceive: null,
})

watch(
  () => props.formData,
  (newVal) => {
    if (newVal) {
      // 遍历 formData 的所有字段
      Object.keys(formData.value).forEach((key) => {
        // 如果 props.formData 中对应的字段有值，则更新
        if (newVal[key] !== undefined && newVal[key] !== null) {
          formData.value[key] = newVal[key]
        }
      })
    }
  },
  { deep: true, immediate: true }
)

// 表单字段配置
const formFields = ref([
  {
    key: 'inventoryImpact',
    label: '库存影响',
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
    key: 'currentStock',
    label: '当前库存',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'unit',
    label: '单位',
    type: 'select',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '选选择',
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
    key: 'stockRemark',
    label: '备注',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    props: {
      type: 'textarea',
      placeholder: '请输入',
      autosize: { minRows: 2, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:3 l:3',
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
