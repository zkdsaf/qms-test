<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
    :label-width="155"
  >
    <template #labelTags="{ field }">
      <n-space>
        <n-tag
          closable
          v-for="tag in field.props.tagsList"
          :key="tag"
          :type="tag.type"
          @close="message.warning('删除标签')"
        >
          {{ tag.label }}
        </n-tag>
      </n-space>
    </template>
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
  labelPosition: null, // 用途
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
    key: 'labelPosition',
    label: '标签位置',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入标签位置',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入标签位置',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:3 l:3',
  },
  {
    key: 'labelTags',
    label: '产品标签',
    listenChange: true,
    span: '3 m:3 l:3',
    props: {
      tagsList: [
        {
          type: 'success',
          label: '标签1',
        },
        {
          type: 'info',
          label: '标签2',
        },
        {
          type: 'warning',
          label: '标签3',
        },
        {
          type: 'error',
          label: '标签4',
        },
      ],
    },
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
