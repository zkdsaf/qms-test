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
  responsible: '供应商责任',
  responsibleDepartment: '质量部',
  responsiblePerson: '张三',
  useDepartment: '生产部',
  usePerson: '李四',
  pcnNumber: 'PCN2024001',
  needModifySpec: 'N',
  modifySpecNo: 'SPEC2024001',
  completeModifySpec: 'N',
  isLaunch: 'N',
  carType: '5D',
  carNo: 'CAR2024001',
  carStartTime: Date.now(),
  causeRemark: '设备故障导致',
  capa: '更换新设备并加强维护',
  carCycleTime: '7',
  confirmContent: '已确认改善措施有效',
  hasPcn: 'N',
  confirmTime: Date.now(),
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
          label: '其他责任',
          value: '其他责任',
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
    visibleWhen: (formModel) => formModel.responsible === '其他责任',
  },
  {
    key: 'responsiblePerson',
    label: '责任人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '其他责任',
  },
  {
    key: 'useDepartment',
    label: '使用部门',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'usePerson',
    label: '使用人',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.responsible === '供应商责任',
  },
  {
    key: 'hasPcn',
    label: '是否有PCN',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
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
  },
  {
    key: 'pcnNumber',
    label: 'PCN Number',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.hasPcn === 'Y',
  },
  {
    key: 'needModifySpec',
    label: '是否需要修改规格书',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
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
  },
  {
    key: 'modifySpecNo',
    label: '修改规格书编号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
    },
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.needModifySpec === 'Y',
  },
  {
    key: 'completeModifySpec',
    label: '是否完成修改规格书',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
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
    visibleWhen: (formModel) => formModel.needModifySpec === 'Y',
  },
  {
    key: 'isLaunch',
    label: 'CAR是否发起',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'input'] }],
    props: {
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
    type: 'radio',
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
    label: 'CAR No',
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
    key: 'carStartTime',
    label: 'CAR发起时间',
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
    label: '附件',
    type: 'input',
    rules: [
      {
        key: 'file',
        required: false,
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
