<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #file="{ field }">
      <file-upload
        v-bind="field.props"
        @change="handleFileChange('file', $event)"
        :value="formData.file"
        :disabled="readonly"
        show-download-button
      >
        <n-icon
          :component="CloudUploadOutline"
          size="28"
          class="cursor-pointer"
        ></n-icon>
      </file-upload>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { useMessage } from 'naive-ui'

import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'
import { SearchOutline, CloudUploadOutline } from '@vicons/ionicons5'

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
  responsible: null,
  responsibleDepartment: null,
  responsiblePerson: null,
  isLaunch: null,
  carType: null,
  carNo: null,
  carStartime: null,
  isVendorConfirmation: null,
  causeRemark: null,
  capa: null,
  carTime: null,
  carCycleTime: null,
  confirmContent: null,
  confirmTime: null,
  file: [],
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
    key: 'responsible',
    label: '责任方明确',
    type: 'select',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '供应商责任',
          value: '供应商责任',
        },
        {
          label: '内部责任',
          value: '内部责任',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'responsibleDepartment',
    label: '责任部门',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    listenChange: true,
    visibleWhen: (formModel) => formModel.responsible === '内部责任',
  },
  {
    key: 'responsiblePerson',
    label: '责任人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '内部责任',
  },
  {
    key: 'isLaunch',
    label: 'CAR是否发起',
    type: 'select',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请选择',
      clearable: true,
      options: [
        {
          label: '是',
          value: 'Y',
        },
        {
          label: '否',
          value: 'N',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'carType',
    label: 'CAR类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
      options: [
        {
          label: '5D',
          value: '5D',
        },
        {
          label: '8D',
          value: '8D',
        },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'carNo',
    label: 'CAR NO',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'carStartime',
    label: '供应商回复时间',
    type: 'datePicker',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      type: 'datetime',
      placeholder: '请选择',
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'causeRemark',
    label: '发生原因',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      type: 'textarea',
      placeholder: '请输入',
      autosize: { minRows: 1, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:3 l:3',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'capa',
    label: '改善措施',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      type: 'textarea',
      placeholder: '请输入',
      autosize: { minRows: 1, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:3 l:3',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'carTime',
    label: 'CAR时间',
    type: 'datePicker',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      type: 'datetime',
      placeholder: '请选择',
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'carCycleTime',
    label: 'CAR回复Cycle Time(天)',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'confirmContent',
    label: 'SQE确认',
    type: 'textarea',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'confirmTime',
    label: 'SQE确认时间',
    type: 'datePicker',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      type: 'datetime',
      placeholder: '请选择',
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'file',
    label: '异常附件',
    type: 'input',
    rules: [
      {
        key: 'file',
        required: true,
        validator: (rule, value) => {
          if (!value || value.length === 0) {
            return new Error('请至少上传一个文件')
          }
          return true
        },
        trigger: ['change'],
      },
    ],
    props: {
      action: '/api/upload',
      accept: '.jpg,.png,.pdf',
      max: 3,
      listType: 'text',
      multiple: true,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
}

const handleFileChange = (key, finishedFiles) => {
  console.log(`插槽化 - 上传完成的 ${key} fileList:`, finishedFiles)
  formData.value[key] = finishedFiles
  formRef.value?.validate(
    (errors) => {
      if (errors) {
        console.error(errors)
      }
    },
    (rule) => rule?.key === 'file'
  )
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
