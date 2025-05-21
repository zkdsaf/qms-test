<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #qualityEngineer-suffix>
      <n-icon
        size="23"
        :component="UserOutlined"
        class="cursor-pointer"
        color="#0e7a0d"
        @click="message.info('可以搜索,还没开发')"
      />
    </template>
    <template #departmentManager-suffix>
      <n-icon
        size="23"
        :component="UserOutlined"
        class="cursor-pointer"
        color="#0e7a0d"
        @click="message.info('可以搜索,还没开发')"
      />
    </template>
    <template #departmentManagerLeader-suffix>
      <n-icon
        size="23"
        :component="UserOutlined"
        class="cursor-pointer"
        color="#0e7a0d"
        @click="message.info('可以搜索,还没开发')"
      />
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { UserOutlined } from '@vicons/antd'
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
  qualityEngineer: '李四',
  departmentManager: '周九',
  departmentManagerLeader: '吴十',
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
    key: 'qualityEngineer',
    label: '质量工程负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },

  {
    key: 'departmentManager',
    label: '使用部门负责人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'departmentManagerLeader',
    label: '使用部门负责人科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
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
