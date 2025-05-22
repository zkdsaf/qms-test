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
  materialType: {
    type: String,
    default: '',
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  crystalMethod: null, // 长晶方式
  crystalOrientation: null, // 晶向
  conductiveType: null, // 导电类型
  doping: null, // 掺杂
  edgeInvalidArea: null, // 边缘无效区域
  waferIdMark: null, // 硅片ID标记
  waferIdMarkSurface: null, // 硅片ID标记面
  annealing: null, // 退火
  slotDirection: null, // 开槽方向
  edgeShape: null, // 边缘形状
  edgeSurfaceTreatment: null, // 边缘表面处理方式
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
    key: 'crystalMethod',
    label: '长晶方式',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入长晶方式',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入长晶方式',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    divider: {
      title: '常规特性',
      'title-placement': 'left',
    },
  },
  {
    key: 'crystalOrientation',
    label: '晶向',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入晶向',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入晶向',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'conductiveType',
    label: '导电类型',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入导电类型',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入导电类型',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'doping',
    label: '掺杂',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入掺杂',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入掺杂',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'edgeInvalidArea',
    label: '边缘无效区域',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入边缘无效区域',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入边缘无效区域',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'waferIdMark',
    label: '硅片ID标记',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入硅片ID标记',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入硅片ID标记',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    divider: {
      title: '制备特性',
      'title-placement': 'left',
    },
  },
  {
    key: 'waferIdMarkSurface',
    label: '硅片ID标记面',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入硅片ID标记面',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入硅片ID标记面',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'annealing',
    label: '退火',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入退火',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入退火',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'slotDirection',
    label: '开槽方向',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入开槽方向',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入开槽方向',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    divider: {
      title: '机械特性',
      'title-placement': 'left',
    },
  },
  {
    key: 'edgeShape',
    label: '边缘形状',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入边缘形状',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入边缘形状',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'edgeSurfaceTreatment',
    label: '边缘表面处理方式',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入边缘表面处理方式',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入边缘表面处理方式',
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
