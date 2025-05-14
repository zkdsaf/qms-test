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
  specName: null, // 规格书名称
  specNo: null, // 规格书编号
  specVersion: null, // 规格书版本号
  securityLevel: null, // 保密等级
  specType: null, // 规格书类型
  specStatus: null, // 规格书状态
  distributionUnit: null, // 分发单位
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

// 规格书类型选项
const specTypeOptions = [
  { label: '临时规格书', value: 'temporary' },
  { label: '正式规格书', value: 'formal' },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'specName',
    label: '规格书名称',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入规格书名称',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入规格书名称',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'specNo',
    label: '规格书编号',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入规格书编号',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入规格书编号',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'specVersion',
    label: '规格书版本号',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入规格书版本号',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入规格书版本号',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'securityLevel',
    label: '保密等级',
    type: 'input',
    rules: [
      { required: true, message: '请输入保密等级', trigger: ['blur', 'input'] },
    ],
    props: {
      placeholder: '请输入保密等级',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'specType',
    label: '规格书类型',
    type: 'select',
    rules: [
      {
        required: true,
        message: '请选择规格书类型',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      options: specTypeOptions,
      placeholder: '请选择规格书类型',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'specStatus',
    label: '规格书状态',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入规格书状态',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入规格书状态',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'distributionUnit',
    label: '分发单位',
    type: 'input',
    rules: [
      { required: true, message: '请输入分发单位', trigger: ['blur', 'input'] },
    ],
    props: {
      placeholder: '请输入分发单位',
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
