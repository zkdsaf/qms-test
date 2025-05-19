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
import { computed, ref, defineExpose, reactive, watch } from 'vue'
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
const route = useRoute()

// 表单数据
const formData = ref({
  coaTemplateNo: null,
  materialType: route.query.materialType,
  materialName: null,
  materialNo: route.query.materialNumber,
  materialDescription: null,
  g1DocSpecNo: null,
  g1DocSpecVersion: null,
  g2DocSpecNo: null,
  g2DocSpecVersion: null,
  coaVersion: null,
  materialTemplateVersion: null,
  materialTemplateNo: null,
  pushToVendor: null,
  documentFormat: [],
  scope: [],
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

// 选项数据
const materialTypeOptions = [
  { label: '类型1', value: '类型1' },
  { label: '类型2', value: '类型2' },
]

const pushToVendorOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
]

const documentFormatOptions = [
  { label: 'TXT', value: 'TXT' },
  { label: 'XSL', value: 'XSL' },
  { label: 'CSV', value: 'CSV' },
  { label: 'XML', value: 'XML' },
  { label: 'PDF', value: 'PDF' },
]

const scopeOptions = [
  { label: '磐石', value: 'G1' },
  { label: '司南', value: 'G2' },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'coaTemplateNo',
    label: 'COA模版编号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialType',
    label: '物料类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: materialTypeOptions,
      placeholder: '请选择',
      clearable: true,
      disabled: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialName',
    label: '物料名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialNo',
    label: '料号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
      disabled: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialDescription',
    label: '物料描述',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'g1DocSpecNo',
    label: '磐石Document Spec No.',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'g1DocSpecVersion',
    label: '磐石Document Spec Version',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'g2DocSpecNo',
    label: '司南Document Spec No.',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'g2DocSpecVersion',
    label: '司南Document Spec Version',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'coaVersion',
    label: 'COA版本号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialTemplateVersion',
    label: '物料模版版本号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialTemplateNo',
    label: '物料模版编号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'pushToVendor',
    label: '推送供应商',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: pushToVendorOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'documentFormat',
    label: '文档格式',
    type: 'checkbox',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: documentFormatOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'scope',
    label: '适用范围',
    type: 'checkbox',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: scopeOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
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
