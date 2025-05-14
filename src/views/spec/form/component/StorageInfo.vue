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
import { CloudUploadOutline } from '@vicons/ionicons5'

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
  roomTemp: null,
  tempUpperLimit: null,
  tempLowerLimit: null,
  storageTempRequirementUnit: null,
  humidityUpperLimit: null,
  humidityLowerLimit: null,
  humidityUnit: null,
  avoidLight: null,
  humidityRequirement: null,
  other: null,
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
    key: 'roomTemp',
    label: '室温',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入室温',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入室温',
      clearable: true,
      type: 'text',
    },
    divider: {
      title: '存储温度要求',
      'title-placement': 'left',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'tempUpperLimit',
    label: '温度规格上限',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入温度规格上限',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入温度规格上限',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'tempLowerLimit',
    label: '温度规格下限',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入温度规格下限',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入温度规格下限',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'storageTempRequirementUnit',
    label: '存储温度单位',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入存储温度单位',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入存储温度单位',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'humidityUpperLimit',
    label: '湿度规格上限',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入湿度规格上限',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入湿度规格上限',
      clearable: true,
      type: 'text',
    },
    divider: {
      title: '存储湿度要求',
      'title-placement': 'left',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'humidityLowerLimit',
    label: '湿度规格下限',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入湿度规格下限',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入湿度规格下限',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'humidityUnit',
    label: '湿度单位',
    type: 'select',
    rules: [
      {
        required: true,
        message: '请选择湿度单位',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      options: [
        { label: '%RH', value: '%RH' },
        { label: 'ppm', value: 'ppm' },
      ],
      placeholder: '请选择湿度单位',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'avoidLight',
    label: '避免光照',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入避免光照',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入避免光照',
      clearable: true,
      type: 'text',
    },
    divider: {
      title: '其它',
      'title-placement': 'left',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'humidityRequirement',
    label: '湿度要求',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入湿度要求',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入湿度要求',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'other',
    label: '其它',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入其它',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入其它',
      clearable: true,
      type: 'text',
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
