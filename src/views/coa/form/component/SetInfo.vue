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
      source: 'COA',
      name: 'Material Type',
      previousName: 'Material Type',
      specValue: 'Type A: Raw Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 2,
      source: 'SPEC',
      name: 'Material No',
      previousName: 'Material No',
      specValue: 'M001: 12345',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 3,
      source: 'COA',
      name: 'Material Name',
      previousName: 'Material Name',
      specValue: 'Product X: Chemical Compound',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 4,
      source: 'SPEC',
      name: 'Po No',
      previousName: 'Po No',
      specValue: 'Type B: Processed Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 5,
      source: 'COA',
      name: 'Invoice No',
      previousName: 'Invoice No',
      specValue: 'M002: 67890',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 6,
      source: 'SPEC',
      name: 'Delivery Name',
      previousName: 'Delivery Name',
      specValue: 'Product Y: Industrial Chemical',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 7,
      source: 'COA',
      name: 'Vendor Code',
      previousName: 'Vendor Code',
      specValue: 'Type C: Finished Product',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 8,
      source: 'SPEC',
      name: 'Vendor Name',
      previousName: 'Vendor Name',
      specValue: 'M003: 54321',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 9,
      source: 'COA',
      name: 'Maker Code',
      previousName: 'Maker Code',
      specValue: 'Product Z: Special Compound',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 10,
      source: 'SPEC',
      name: 'Maker Name',
      previousName: 'Maker Name',
      specValue: 'Type D: Custom Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 11,
      source: 'COA',
      name: 'Maker Brand',
      previousName: 'Maker Brand',
      specValue: 'M004: 98765',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 12,
      source: 'SPEC',
      name: 'Maker Plant',
      previousName: 'Maker Plant',
      specValue: 'Product W: Advanced Material',
      history: '初始数据',
      isNew: false,
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
    title: '来源',
    key: 'source',
    align: 'center',
    width: 100,
    render: (row) => <span>{row.source}</span>,
  },
  {
    title: '名称',
    key: 'name',
    align: 'center',
    width: 150,
    render: (row, index) =>
      row.isNew ? (
        <NFormItem
          path={`tableData[${index}].name`}
          rule={{
            required: true,
            message: '请选择',
            trigger: ['blur', 'change'],
          }}
        >
          <NInput
            value={row.name}
            onUpdateValue={(value) => {
              row.name = value
            }}
            placeholder="请输入"
          />
        </NFormItem>
      ) : (
        <span>{row.name}</span>
      ),
  },
  {
    title: '前版本名称',
    key: 'previousName',
    align: 'center',
    width: 150,
    render: (row) => <span>{row.previousName}</span>,
  },
  {
    title: 'SPEC Value',
    key: 'specValue',
    align: 'center',
    width: 200,
    render: (row) => <span>{row.specValue}</span>,
  },
  {
    title: '操作历史',
    key: 'history',
    align: 'center',
    width: 200,
    render: (row) => <span>{row.history}</span>,
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
            !props.readonly && row.isNew ? (
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
    source: '',
    name: '',
    previousName: '',
    specValue: '',
    history: '新增数据',
    isNew: true,
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
