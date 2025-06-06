<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #tableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
          <div class="flex justify-end">
            <n-button type="primary" @click="handleAddRow" v-if="!readonly">
              添加
            </n-button>
          </div>
        </n-scrollbar>
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
  tableData: [
    {
      id: 1,
      vendorBatchNo: null,
      containerNo: null,
      effectTime: null,
      arrivalTime: null,
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

// 表格列定义（使用 JSX）
const columns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应商批次号</span>
      </div>
    ),
    key: 'vendorBatchNo',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].vendorBatchNo`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.vendorBatchNo}
          onUpdateValue={(value) => {
            row.vendorBatchNo = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },

  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>槽车编号</span>
      </div>
    ),
    key: 'containerNo',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].containerNo`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.containerNo}
          onUpdateValue={(value) => {
            row.containerNo = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },

  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>有效日期</span>
      </div>
    ),
    key: 'effectTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].effectTime`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          type="date"
          format="yyyy.MM.dd"
          value={row.effectTime}
          onUpdateValue={(value) => {
            row.effectTime = value
          }}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },

  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>到厂时间</span>
      </div>
    ),
    key: 'arrivalTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].arrivalTime`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          type="datetime"
          value-format="yyyy.MM.dd HH:mm:ss"
          value={row.arrivalTime}
          onUpdateValue={(value) => {
            row.arrivalTime = value
          }}
          placeholder="请输入"
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
        onPositiveClick={() => formData.value.tableData.splice(index, 1)}
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
    key: 'tableData',
    label: '',
    type: 'table',
    dataKey: 'tableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: computed(() =>
        !props.readonly
          ? columns
          : columns.filter((item) => item.key !== 'action')
      ), // 表格列定义
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

const handleAddRow = () => {
  formData.value.tableData.push({
    id: Date.now(),
    vendorBatchNo: null,
    containerNo: null,
    effectTime: null,
    arrivalTime: null,
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
