<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="true"
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
})
const message = useMessage()

// 表单数据
const formData = ref({
  calledSpecNo: 'G2-SPEC-CW-SL-XXXXXXXXXXXX', // 被调用规格书编号
  calledSpecVersion: 'V.O1', // 被调用文件规格书版本号
  calledSpecName: 'G2-SPEC-CW-SL-XXXXXXX', // 被调用规格书名称
  calledSpecDept: 'XXX部门,XXX部门', // 被调用文件所属部门
  calledSpecScope: '司南', // 被调用文件适用范围
})

// 规格书类型选项
const specTypeOptions = [
  { label: '临时规格书', value: 'temporary' },
  { label: '正式规格书', value: 'formal' },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'calledSpecName',
    label: '被调用规格书名称',
    type: 'input',
    rules: [
      {
        required: false,
        message: '请输入被调用规格书名称',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入被调用规格书名称',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'calledSpecNo',
    label: '被调用规格书编号',
    type: 'input',
    rules: [
      {
        required: false,
        message: '请输入被调用规格书编号',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入被调用规格书编号',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'calledSpecVersion',
    label: '被调用文件规格书版本号',
    type: 'input',
    rules: [
      {
        required: false,
        message: '请输入被调用文件规格书版本号',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入被调用文件规格书版本号',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'calledSpecDept',
    label: '被调用文件所属部门',
    type: 'input',
    rules: [
      {
        required: false,
        message: '请输入被调用文件所属部门',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入被调用文件所属部门',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
  },
  {
    key: 'calledSpecScope',
    label: '被调用文件适用范围',
    type: 'input',
    rules: [
      {
        required: false,
        message: '请输入被调用文件适用范围',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入被调用文件适用范围',
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
