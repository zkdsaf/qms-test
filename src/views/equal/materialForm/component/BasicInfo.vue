<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
    label-width="160"
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
  importTypeValue: {
    type: String,
    default: '',
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  materialType: null,
  hasSourcing: null,
  applicationNo: null,
  applicationVendor: null,
  applicationManufacturer: null,
  materialName: null,
  basekubeSource: null,
  otherSource: null,
  technicalSpec: null,
  applicableProcess: null,
  projectTime: null,
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
    key: 'materialType',
    label: '物料类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: '原材料', value: '原材料' },
        { label: '成品', value: '成品' },
      ],
      placeholder: '选择类别',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'hasSourcing',
    label: '是否有Sourcing前置流',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'applicationNo',
    label: '物料立项申请编号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.hasSourcing === 'Y',
  },
  {
    key: 'applicationVendor',
    label: '物料立项申请供应商',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.hasSourcing === 'Y',
  },
  {
    key: 'applicationManufacturer',
    label: '物料立项申请生产商',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.hasSourcing === 'Y',
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
    key: 'basekubeSource',
    label: 'Basekube Source',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => props.importTypeValue === '2nd Source',
  },
  {
    key: 'otherSource',
    label: 'Other Source',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => props.importTypeValue === '2nd Source',
  },
  {
    key: 'technicalSpec',
    label: '技术规格',
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
    key: 'applicableProcess',
    label: '适用流程',
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
    key: 'projectTime',
    label: '立项时间',
    type: 'datePicker',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      type: 'date',
      placeholder: '请选择',
      clearable: true,
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
