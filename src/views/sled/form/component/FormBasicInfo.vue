<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
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
  materialType: null,
  materialNo: null,
  materialName: null,
  materialDescription: null,
  isSharedFab: null,
  delayType: null,
  vendorCode: null,
  vendorName: null,
  makerName: null,
  delayReason: null,
  delayMonths: null,
  delayTotalQty: null,
  materialTableData: [
    {
      id: 1,
      vendorBatch: null,
      internalBatch: null,
      currentStock: null,
      unit: null,
      productionDate: null,
      validityMonths: null,
      currentExpiryDate: null,
      expectedDelayDate: null,
      delayQty: null,
    },
  ],
  principalTableData: [
    {
      id: 1,
      location: null,
      user: null,
      sectionManager: null,
      departmentManager: null,
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

const locationOptions = [
  { label: '磐石', value: 'G1' },
  { label: '司南', value: 'G2' },
]

// 表格列定义（使用 JSX）
const materialTableColumns = [
  {
    title: '序号',
    key: 'index',
    align: 'center',
    width: 80,
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应商批次</span>
      </div>
    ),
    key: 'vendorBatch',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].vendorBatch`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.vendorBatch}
          onUpdateValue={(value) => {
            row.vendorBatch = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>厂内批次号</span>
      </div>
    ),
    key: 'internalBatch',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].internalBatch`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.internalBatch}
          onUpdateValue={(value) => {
            row.internalBatch = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>当前库存数量</span>
      </div>
    ),
    key: 'currentStock',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].currentStock`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.currentStock}
          onUpdateValue={(value) => {
            row.currentStock = value
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>生产日期</span>
      </div>
    ),
    key: 'productionDate',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].productionDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['change', 'blur'],
        }}
      >
        <NDatePicker
          value={row.productionDate}
          onUpdateValue={(value) => {
            row.productionDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>有效期/月</span>
      </div>
    ),
    key: 'validityMonths',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].validityMonths`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInputNumber
          value={row.validityMonths}
          onUpdateValue={(value) => {
            row.validityMonths = value
          }}
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>当前过期日期</span>
      </div>
    ),
    key: 'currentExpiryDate',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].currentExpiryDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['change', 'blur'],
        }}
      >
        <NDatePicker
          value={row.currentExpiryDate}
          onUpdateValue={(value) => {
            row.currentExpiryDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>预计延期日期</span>
      </div>
    ),
    key: 'expectedDelayDate',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].expectedDelayDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['change', 'blur'],
        }}
      >
        <NDatePicker
          value={row.expectedDelayDate}
          onUpdateValue={(value) => {
            row.expectedDelayDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>延期申请数量</span>
      </div>
    ),
    key: 'delayQty',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`materialTableData[${index}].delayQty`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInputNumber
          value={row.delayQty}
          onUpdateValue={(value) => {
            row.delayQty = value
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
          message: '请选择',
          trigger: ['change', 'blur'],
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
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用人</span>
      </div>
    ),
    key: 'user',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`principalTableData[${index}].user`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.user}
          onUpdateValue={(value) => {
            row.user = value
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
        <span>科长</span>
      </div>
    ),
    key: 'sectionManager',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`principalTableData[${index}].sectionManager`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.sectionManager}
          onUpdateValue={(value) => {
            row.sectionManager = value
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
        <span>部长</span>
      </div>
    ),
    key: 'departmentManager',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`principalTableData[${index}].departmentManager`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.departmentManager}
          onUpdateValue={(value) => {
            row.departmentManager = value
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
    key: 'materialType',
    label: '物料类型',
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
    key: 'isSharedFab',
    label: '是否共用Fab',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['change'] }],
    props: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'delayType',
    label: '延期类型',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['change'] }],
    props: {
      options: [
        {
          label: '单次延期(基于本流程申请的数量和批次维护延长期限)',
          value: '1',
        },
        { label: '长久延期(基于本流程申请的料号维护延长期限)', value: '2' },
      ],
    },
    listenChange: true,
    span: '3 m:1 l:1',
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
    key: 'delayReason',
    label: '延期必要性说明',
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
    key: 'delayMonths',
    label: '预计延长期限/月',
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
    key: 'delayTotalQty',
    label: '延期总数量',
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
    visibleWhen: (formData) => formData.delayType === '1',
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

const handleAddRow = (type) => {
  if (type === 'materialTableData') {
    formData.value.materialTableData.push({
      id: Date.now(),
      vendorBatch: '',
      internalBatch: '',
      currentStock: '',
      unit: '',
      productionDate: null,
      validityMonths: '',
      currentExpiryDate: null,
      expectedDelayDate: null,
      delayQty: '',
    })
    return
  }
  formData.value.principalTableData.push({
    id: Date.now(),
    location: '',
    user: '',
    sectionManager: '',
    departmentManager: '',
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
