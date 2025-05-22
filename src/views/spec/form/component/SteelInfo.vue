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
  changeValue: null, // 更换值
  changeUnit: null, // 更换单位
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
    key: 'changeValue',
    label: '更换值',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入更换值',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      autosize: true,
      placeholder: '请输入更换值',
      clearable: true,
      type: 'textarea',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'changeUnit',
    label: '更换单位',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入更换单位',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      autosize: true,
      placeholder: '请输入更换单位',
      clearable: true,
      type: 'textarea',
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
