<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :cols="formCols"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #file="{ field }">
      <file-upload
        v-bind="field.props"
        @change="handleFileChange('file', $event)"
        :value="formData.file"
      >
        <n-button type="primary">选择文件</n-button>
      </file-upload>
    </template>

    <template #materialTableData="{ field }">
      <n-space vertical class="w-full">
        <n-data-table v-bind="field.props"> </n-data-table>
        <n-button type="primary" @click="handleAddRow">添加</n-button>
      </n-space>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  iqaNo: null,
  materialType: null,
  materialNo: null,
  materialName: null,
  materialDescription: null,
  vendorCode: null,
  vendorName: null,
  makerCode: null,
  makerName: null,
  occurTime: null,
  incomingTime: null,
  responsibleParty: null,
  isLaunch: null,
  carType: null,
  carNo: null,
  carStartTime: null,
  abnormalCnt: null,
  incomingBatch: null,
  incomingQty: null,
  totalBatchQty: null,
  totalBatch: null,
  abnormalDesc: null,
  file: [],
  materialTableData: [
    {
      id: 1,
      parameter: '',
      parameterUnit: '',
      incomingMax: '',
      incomingMin: '',
      incomingMaxBatch: '',
      incomingMinBatch: '',
      abnormalBatch: '',
      abnormalBatchQty: '',
      abnormalQty: '',
      unit: '',
      compareResult: '',
    },
  ],
})

watch(
  () => props.formData,
  (newVal) => {
    formData.value = newVal
  },
  { deep: true, immediate: true }
)

const formCols = 3
const readonly = ref(false)

// 下拉框选项
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' },
]

// 表格列定义（使用 JSX）
const materialTableColumns = [
  {
    title: '参数',
    key: 'parameter',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].parameter`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.parameter}
          onUpdateValue={(value) => {
            row.parameter = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '单位',
    align: 'center',
    key: 'parameterUnit',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].parameterUnit`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.parameterUnit}
          onUpdateValue={(value) => {
            row.parameterUnit = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '对比结果',
    align: 'center',
    key: 'compareResult',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].compareResult`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.compareResult}
          onUpdateValue={(value) => {
            row.compareResult = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    title: '历史来料Max',
    key: 'incomingMax',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].incomingMax`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.incomingMax}
          onUpdateValue={(value) => {
            row.incomingMax = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '历史来料Max/对应批次',
    align: 'center',
    key: 'incomingMaxBatch',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].incomingMaxBatch`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.incomingMaxBatch}
          onUpdateValue={(value) => {
            row.incomingMaxBatch = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '历史来料Min',
    align: 'center',
    key: 'incomingMin',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].incomingMin`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.incomingMin}
          onUpdateValue={(value) => {
            row.incomingMin = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '历史来料Min/对应批次',
    key: 'incomingMinBatch',
    align: 'center',

    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].incomingMinBatch`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.incomingMinBatch}
          onUpdateValue={(value) => {
            row.incomingMinBatch = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '异常批次号',
    key: 'abnormalBatch',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].abnormalBatch`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.abnormalBatch}
          onUpdateValue={(value) => {
            row.abnormalBatch = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '异常批次数量',
    key: 'abnormalBatchQty',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].abnormalBatchQty`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.abnormalBatchQty}
          onUpdateValue={(value) => {
            row.abnormalBatchQty = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '异常数量',
    key: 'abnormalQty',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].abnormalQty`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.abnormalQty}
          onUpdateValue={(value) => {
            row.abnormalQty = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '异常数量单位',
    key: 'unit',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].unit`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: '操作',
    align: 'center',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() =>
          formData.value.materialTableData.splice(index, 1)
        }
      >
        {{
          trigger: () => (
            <NButton type="error" size="small">
              删除
            </NButton>
          ),
          default: () => '确定删除吗？',
        }}
      </NPopconfirm>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'iqaNo',
    label: 'IQA申请单编号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '选输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    // slots: { header: true, action: true },
  },
  {
    key: 'materialType',
    label: '物料类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: roleOptions,
      placeholder: '选择类别',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialNo',
    label: '料号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialName',
    label: '物料名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialDescription',
    label: '物料描述',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'vendorCode',
    label: '供应商代码',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'vendorName',
    label: '供应商名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'makerName',
    label: '生产商名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'occurTime',
    label: '异常发生日期',
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
  },
  {
    key: 'incomingTime',
    label: '来料时间',
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
  },
  {
    key: 'responsibleParty',
    label: '责任方明确',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: roleOptions,
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'isLaunch',
    label: 'CAR是否发起',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'carType',
    label: 'CAR类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: roleOptions,
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.isLaunch === 'Y',
  },
  {
    key: 'carNo',
    label: 'CAR NO',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formModel) => formModel.isLaunch === 'Y',
  },
  {
    key: 'carStartTime',
    label: 'CAR 发起时间',
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
    visibleWhen: (formModel) => formModel.isLaunch === 'Y',
  },
  {
    key: 'abnormalCnt',
    label: '异常OOW发生次数',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      min: 0,
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'incomingBatch',
    label: '来料批次数量',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'incomingQty',
    label: '来料数量',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      min: 0,
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'totalBatchQty',
    label: '总异常批次数',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      min: 0,
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'totalBatch',
    label: '总异常来料数量',
    type: 'input-number',
    rules: [
      {
        type: 'number',
        required: true,
        message: '请输入',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      placeholder: '请输入',
      min: 0,
      clearable: true,
      style: { width: '100%' },
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'abnormalDesc',
    label: '异常描述',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    props: {
      type: 'textarea',
      placeholder: '请输入',
      autosize: { minRows: 3, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:3 l:3',
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
  },
  {
    key: 'materialTableData',
    label: '',
    type: 'table',
    dataKey: 'materialTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.materialTableData),
      columns: materialTableColumns, // 表格列定义
      rowKey: (row) => row.id, // 表格行主键
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

const handleAddRow = () => {
  formData.value.materialTableData.push({
    id: Date.now(),
    parameter: '',
    parameterUnit: '',
    incomingMax: '',
    incomingMin: '',
    incomingMaxBatch: '',
    incomingMinBatch: '',
    abnormalBatch: '',
    abnormalBatchQty: '',
    abnormalQty: '',
    unit: '',
    compareResult: '',
  })
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
