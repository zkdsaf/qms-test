<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  />
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

// 表单数据
const formData = ref({
  applicantRiskConfirm: null,
  applicantRiskRemark: '',
  mainDeptRiskConfirm: null,
  mainDeptRiskRemark: '',
  crossFabRiskConfirm: null,
  crossFabRiskRemark: '',
})

watch(
  () => props.formData,
  (newVal) => {
    if (newVal) {
      Object.keys(formData.value).forEach((key) => {
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
    key: 'applicantRiskConfirm',
    label: '申请人部长风险确认',
    type: 'radio',
    props: {
      options: [
        { label: '同意让步接受', value: 'agree' },
        { label: '不同意让步接受', value: 'disagree' },
      ],
    },
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'applicantRiskRemark',
    label: '备注',
    type: 'textarea',
    required: true,
    props: {
      type: 'textarea',
      placeholder: '请输入',
      clearable: true,
      autosize: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
  },
  {
    key: 'mainDeptRiskConfirm',
    label: '主要部门负责人部长风险确认',
    type: 'radio',
    required: true,
    props: {
      options: [
        { label: '同意让步接受', value: 'agree' },
        { label: '不同意让步接受', value: 'disagree' },
      ],
    },
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'mainDeptRiskRemark',
    label: '备注',
    type: 'textarea',
    required: true,
    props: {
      type: 'textarea',
      placeholder: '请输入',
      clearable: true,
      autosize: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
  },
  {
    key: 'crossFabRiskConfirm',
    label: 'Cross Fab主要负责人部长风险确认',
    type: 'radio',
    required: true,
    props: {
      options: [
        { label: '同意让步接受', value: 'agree' },
        { label: '不同意让步接受', value: 'disagree' },
      ],
    },
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'crossFabRiskRemark',
    label: '备注',
    type: 'textarea',
    required: true,
    props: {
      type: 'textarea',
      placeholder: '请输入',
      clearable: true,
      autosize: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
  },
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
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

defineExpose({
  validateForm,
  getFormData: () => formData.value,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
