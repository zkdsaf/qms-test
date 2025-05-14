<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
    :label-width="155"
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

// 表单数据
const formData = ref({
  purpisesion: null, // 用途
  materialFormula: null, // 物料分子式
  purityLevel: null, // 纯度等级
  validityPeriod: null, // 有效期(月)
  remainingValidityPeriod: null, // 剩余有效期(月)
  arrivalType: null, // 到厂/到港
  storageRequirements: null, // 存储要求
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

// 到厂/到港选项
const arrivalTypeOptions = [
  { label: '到厂', value: 'factory' },
  { label: '到港', value: 'port' },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'purpisesion',
    label: '目的',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入目的',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      autosize: true,
      placeholder: '请输入目的',
      clearable: true,
      type: 'textarea',
    },
    listenChange: true,
    span: '3 m:3 l:3',
  },
  {
    key: 'materialFormula',
    label: '物料分子式',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入物料分子式',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入物料分子式',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'purityLevel',
    label: '纯度等级',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入纯度等级',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入纯度等级',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'validityPeriod',
    label: '有效期(月)',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入有效期',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入有效期',
      min: 0,
      precision: 0,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'remainingValidityPeriod',
    label: '剩余有效期(月)',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入剩余有效期',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入剩余有效期',
      min: 0,
      precision: 0,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'arrivalType',
    label: ' ',
    type: 'radio',
    rules: [
      {
        required: true,
        message: '请选择到厂/到港',
        trigger: ['change'],
      },
    ],
    props: {
      options: arrivalTypeOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'storageRequirements',
    label: '存储要求',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入存储要求',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入存储要求',
      clearable: true,
      type: 'textarea',
      autosize: true,
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
