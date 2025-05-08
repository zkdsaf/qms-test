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
      >
        <n-icon
          :component="CloudUploadOutline"
          size="28"
          class="cursor-pointer"
        ></n-icon>
      </file-upload>
    </template>

    <template #materialTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
        </n-scrollbar>
        <div class="flex justify-end">
          <n-button
            type="primary"
            @click="handleAddRow('materialTableData')"
            v-if="!readonly"
          >
            添加
          </n-button>
        </div>
      </n-space>
    </template>

    <template #principalTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
        </n-scrollbar>
        <div class="flex justify-end">
          <n-button
            type="primary"
            @click="handleAddRow('principalTableData')"
            v-if="!readonly"
          >
            添加
          </n-button>
        </div>
      </n-space>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
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
  iqaNo: null,
  materialType: null,
  defectCategory: null,
  defectLevel: null,
  defectType: null,
  vendorCode: null,
  vendorName: null,
  makerCode: null,
  makerName: null,
  occurTime: null,
  incomingTime: null,
  responsibleParty: null,
  puchaseLocation: null,
  puchaseOrderNo: null,
  abnormalDesc: null,
  file: [],
  materialTableData: [
    {
      id: 1,
      materialNo: '',
      materialName: '',
      incomingMax: '',
      incomingMin: '',
      incomingMaxBatch: '',
      incomingMinBatch: '',
      abnormalBatch: '',
      abnormalBatchQty: '',
      abnormalQty: '',
      unit: '',
      materialDescription: '',
    },
  ],
  principalTableData: [
    {
      id: 1,
      module: '',
      moduleName: '',
      moduleManager: '',
      moduleManagerName: '',
      location: '',
    },
  ],
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

// 下拉框选项
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' },
]

const locationOptions = [
  { label: '磐石', value: 'G1' },
  { label: '司南', value: 'G2' },
]

// 表格列定义（使用 JSX）
const materialTableColumns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>料号</span>
      </div>
    ),
    key: 'materialNo',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].materialNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.materialNo}
          onUpdateValue={(value) => {
            row.materialNo = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料名称</span>
      </div>
    ),
    align: 'center',
    key: 'materialName',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].materialName`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.materialName}
          onUpdateValue={(value) => {
            row.materialName = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料描述</span>
      </div>
    ),
    align: 'center',
    key: 'materialDescription',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].materialDescription`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.materialDescription}
          onUpdateValue={(value) => {
            row.materialDescription = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>异常重复发生次数</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>来料批次数量</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>来料数量</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>异常批次号</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>槽车/钢瓶号</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>异常批次数量</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>异常数量</span>
      </div>
    ),
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>单位</span>
      </div>
    ),
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
    width: 80,
    key: 'action',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() =>
          formData.value.materialTableData.splice(index, 1)
        }
      >
        {{
          trigger: () =>
            !props.readonly ? (
              <NButton type="error" size="small">
                删除
              </NButton>
            ) : (
              <div></div>
            ),
          default: () => '确定删除吗？',
        }}
      </NPopconfirm>
    ),
  },
]

const principalColumns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门科长/部长</span>
      </div>
    ),
    key: 'moduleName',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`principalTableData[${index}].moduleName`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.moduleName}
          onUpdateValue={(value) => {
            row.moduleName = value
          }}
        >
          {{
            suffix: () => (
              <NIcon
                component={SearchOutline}
                size="24"
                class="cursor-pointer"
                onClick={() => {
                  message.info('搜索')
                }}
              />
            ),
          }}
        </NInput>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>适用范围</span>
      </div>
    ),
    key: 'location',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`principalTableData[${index}].location`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NSelect
          options={locationOptions}
          value={row.location}
          onUpdateValue={(value) => {
            row.location = value
          }}
          filterable
          clearable
        ></NSelect>
      </NFormItem>
    ),
  },
  {
    title: '操作',
    align: 'center',
    width: 80,
    key: 'action',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() =>
          formData.value.principalTableData.splice(index, 1)
        }
      >
        {{
          trigger: () =>
            !props.readonly ? (
              <NButton type="error" size="small">
                删除
              </NButton>
            ) : (
              <div></div>
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
    key: 'vendorCode',
    label: '供应商编号',
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
    key: 'defectCategory',
    label: '异常触发类型',
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
    key: 'defectLevel',
    label: '异常等级',
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
    key: 'defectType',
    label: '异常分类',
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
    label: '来料日期',
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
    key: 'puchaseLocation',
    label: '实物地点',
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
    key: 'puchaseOrderNo',
    label: '采购订单号',
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
      columns: computed(() => {
        return !props.readonly
          ? materialTableColumns
          : materialTableColumns.filter((item) => item.key !== 'action')
      }), // 表格列定义
      rowKey: (row) => row.id, // 表格行主键
      'scroll-x': 1000,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
  {
    key: 'principalTableData',
    label: '',
    type: 'table',
    dataKey: 'principalTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.principalTableData),
      columns: computed(() => {
        return !props.readonly
          ? principalColumns
          : principalColumns.filter((item) => item.key !== 'action')
      }), // 表格列定义
      rowKey: (row) => row.id, // 表格行主键
      'scroll-x': 1000,
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

const handleAddRow = (type) => {
  if (type === 'materialTableData') {
    formData.value.materialTableData.push({
      id: Date.now(),
      materialNo: '',
      materialName: '',
      incomingMax: '',
      incomingMin: '',
      incomingMaxBatch: '',
      incomingMinBatch: '',
      abnormalBatch: '',
      abnormalBatchQty: '',
      abnormalQty: '',
      unit: '',
      materialDescription: '',
    })
    return
  }
  formData.value.principalTableData.push({
    id: Date.now(),
    module: '',
    moduleName: '',
    moduleManager: '',
    moduleManagerName: '',
    location: '',
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
