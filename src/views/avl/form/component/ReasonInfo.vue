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
const route = useRoute()
// 表单数据
const formData = ref({
  reasonType: route.query.formType,
  firstLevelReason: '1',
  secondLevelReason: '2',
  thirdLevelReason: '2',
  remarks: '',
  remarksDetail: '',
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
    key: 'reasonType',
    label: '原因类型',
    type: 'input',
    props: {
      placeholder: '请输入',
      clearable: true,
      disabled: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'firstLevelReason',
    label: '一级申请原因',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '一级申请原因1',
          value: '1',
        },
        {
          label: '一级申请原因2',
          value: '2',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: () =>
      ['冻结', '取消资格', '多物料冻结', '多物料取消资格'].includes(
        route.query.formType
      ),
  },
  {
    key: 'secondLevelReason',
    label: '二级申请原因',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '二级申请原因1',
          value: '1',
        },
        {
          label: '二级申请原因2',
          value: '2',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: () =>
      ['冻结', '取消资格', '多物料冻结', '多物料取消资格'].includes(
        route.query.formType
      ),
  },
  {
    key: 'thirdLevelReason',
    label: '三级申请原因',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '三级申请原因1',
          value: '1',
        },
        {
          label: '三级申请原因2',
          value: '2',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: () =>
      ['冻结', '取消资格', '多物料冻结', '多物料取消资格'].includes(
        route.query.formType
      ),
  },
  {
    key: 'remarksDetail',
    label: '详细原因',
    type: 'textarea',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
      type: 'textarea',
      autosize: true,
    },
    listenChange: true,
    span: '3 m:2 l:2',
    visibleWhen: () => ['解冻', '重获资格'].includes(route.query.formType),
  },
  {
    key: 'remarks',
    label: '备注',
    type: 'textarea',
    rules: [{ required: false, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
      type: 'textarea',
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
