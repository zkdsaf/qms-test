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

import { SearchOutline, CloudUploadOutline } from '@vicons/ionicons5'

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
  importMethod: null,
  requalifyType: null,
  isQualityEventTriggered: null,
  requalifyReason: null,
  originalQualNo: null,
  materialNumber: null,
  importType: null,
  importReason: null,
  addFabQualNo: null,
  addFabMaterialNumber: null,
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
    key: 'importMethod',
    label: '导入方式',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
      options: [
        { label: 'Add Fab', value: 'Add Fab' },
        { label: 'New Source导入', value: 'New Source导入' },
        { label: 'Re-qualify', value: 'Re-qualify' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'addFabQualNo',
    label: 'Add Fab Qual No',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Add Fab',
  },
  {
    key: 'addFabMaterialNumber',
    label: 'Add Fab料号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Add Fab',
  },
  {
    key: 'requalifyType',
    label: 'Re-qualify类型',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
      options: [
        { label: '冻结', value: '冻结' },
        { label: '废除', value: '废除' },
        { label: '验证失败物料', value: '验证失败物料' },
        { label: '取消', value: '取消' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Re-qualify',
  },
  {
    key: 'isQualityEventTriggered',
    label: '是否品质事件触发Re-qualify',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
      options: [
        { label: '是', value: '是' },
        { label: '否', value: '否' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Re-qualify',
  },
  {
    key: 'requalifyReason',
    label: 'Re-qualify原因',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Re-qualify',
  },
  {
    key: 'originalQualNo',
    label: '原Qual No',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Re-qualify',
  },
  {
    key: 'materialNumber',
    label: '原料号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.importMethod === 'Re-qualify',
  },
  {
    key: 'importType',
    label: '导入类型',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
      options: [
        { label: 'Baseline Source', value: 'Baseline Source' },
        { label: '2nd Source', value: '2nd Source' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'importReason',
    label: '导入原因',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
])

const formRef = ref(null)

const emit = defineEmits(['importTypeChange'])

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
  if (key === 'importType') {
    emit('importTypeChange', value)
  }
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
