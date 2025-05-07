<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #qeName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择质量工程科负责人')"
      />
    </template>
    <template #qeManagerName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择质量工程科科长')"
      />
    </template>
    <template #productName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择物料控制科负责人')"
      />
    </template>
    <template #productManagerName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择物料控制科科长')"
      />
    </template>
    <template #safeName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择安全环境科负责人')"
      />
    </template>
    <template #safeManagerName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择安全环境科科长')"
      />
    </template>
    <template #gasName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择气化科负责人')"
      />
    </template>
    <template #gasManagerName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择气化科科长')"
      />
    </template>
    <template #purchaseManagerName-suffix>
      <n-icon
        :component="UserAddOutlined"
        size="24"
        class="cursor-pointer"
        @click="message.info('选择物料采购科科长')"
      />
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'

import { UserAddOutlined } from '@vicons/antd'

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
  qeName: null,
  qeManagerName: null,
  productName: null,
  productManagerName: null,
  safeName: null,
  safeManagerName: null,
  gasName: null,
  gasManagerName: null,
  purchaseManagerName: null,
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
    key: 'qeName',
    label: '质量工程科负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'qeManagerName',
    label: '质量工程科科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'productName',
    label: '物料控制科负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'productManagerName',
    label: '物料控制科科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'safeName',
    label: '安全环境科负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'safeManagerName',
    label: '安全环境科科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'gasName',
    label: '气化科负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'gasManagerName',
    label: '气化科科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'purchaseManagerName',
    label: '物料采购科科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
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
