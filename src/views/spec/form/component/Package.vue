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
  containerMaterial: null,
  innerContainerMaterial: null,
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
    key: 'containerMaterial',
    label: '包装容器材质',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入包装容器材质',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入包装容器材质',
      clearable: true,
      type: 'text',
    },
    divider: {
      title: '包装要求',
      'title-placement': 'left',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'innerContainerMaterial',
    label: '包装容器内层材质',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入包装容器内层材质',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入包装容器内层材质',
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
