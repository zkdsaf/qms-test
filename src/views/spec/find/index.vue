<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6">
    <!-- 查询部分 -->
    <n-card class="mb-6 shadow-lg rounded-lg" title="查询条件">
      <div>
        <custom-form
          ref="customFormRef"
          :fields="formFields"
          :cols="formCols"
          :form-data="formData"
          :readonly="readonly"
          @field-change="handleFieldChange"
        >
          <!-- 关键词输入框的 插槽 -->
          <template #keyword-suffix> 可以搜索 </template>
          <!-- 下拉框的 插槽 -->
          <template #category-header> 头部插槽 </template>
          <template #category-action> 操作插槽 </template>
        </custom-form>
        <!-- 搜索和重置按钮 -->
        <div class="flex justify-end mt-6 space-x-2">
          <n-button
            type="primary"
            @click="handleSearch"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6"
          >
            查询
          </n-button>
          <n-button
            type="default"
            @click="handleReset"
            class="bg-gray-200 hover:bg-gray-300 rounded-md px-6"
          >
            重置
          </n-button>
        </div>
      </div>
    </n-card>

    <!-- 表格部分 -->
    <n-card class="shadow-lg rounded-lg" title="查询结果">
      <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :bordered="true"
        class="min-h-[400px]"
      />
    </n-card>
  </div>
</template>

<script setup lang="jsx">
import CustomForm from '@/components/CustomForm.vue'

import { useMessage } from 'naive-ui'
import { ref } from 'vue'
const message = useMessage()
// 表单数据
const formData = ref({
  keyword: '',
  category: null,
  dateRange: null,
  description: '', // 新增文本域字段
})

// 表单布局
const formCols = 3

const readonly = ref(false)

// 表单字段配置
const formFields = [
  {
    key: 'keyword',
    label: '关键词',
    type: 'input',
    props: { placeholder: '请输入关键词', clearable: true },
    slots: { suffix: true },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'category',
    label: '类别',
    type: 'select',
    rules: [
      {
        required: true,
        message: '请选择类别',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      options: [
        { label: '技术', value: 'tech' },
        { label: '生活', value: 'life' },
        { label: '教育', value: 'education' },
      ],
      placeholder: '选择类别',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { header: true, action: true },
  },
  {
    key: 'dateRange',
    label: '日期范围',
    type: 'datePicker',
    props: {
      type: 'daterange',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'description',
    label: '描述',
    type: 'input',
    props: {
      type: 'textarea',
      placeholder: '请输入描述',
      autosize: { minRows: 3, maxRows: 5 },
      clearable: true,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
]

// 表格列定义
const columns = [
  { title: 'ID', key: 'id', width: 80, resizable: true, align: 'center' },
  { title: '标题', key: 'title', width: 120, resizable: true, align: 'center' },
  {
    title: '类别',
    key: 'category',
    width: 120,
    resizable: true,
    align: 'center',
    render: (row) => {
      return row.category === 'tech'
        ? '技术'
        : row.category === 'life'
        ? '生活'
        : '教育'
    },
  },
  {
    title: '描述',
    key: 'description',
    width: 200,
    resizable: true,
    align: 'center',
    ellipsis: {
      tooltip: true,
    },
  },
  { title: '日期', key: 'date', width: 150, resizable: true, align: 'center' },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    align: 'center',
    render: (row) => (
      <n-button
        size="small"
        type="info"
        onClick={() => message.info(`查看${row.title}`)}
      >
        查看
      </n-button>
    ),
  },
]

// 原始表格数据
const originalTableData = [
  {
    id: 1,
    title: 'Vue 3 新特性',
    category: 'tech',
    date: '2025-04-01',
    description: 'Vue 3 是 Vue.js 的最新版本，引入了许多新特性和改进。',
  },
  {
    id: 2,
    title: '健康生活方式',
    category: 'life',
    date: '2025-04-02',
    description: '健康生活方式对于保持身心健康至关重要。',
  },
  {
    id: 3,
    title: '在线教育趋势',
    category: 'education',
    date: '2025-04-03',
    description: '在线教育正在改变教育方式，提供更多的学习机会。',
  },
  {
    id: 4,
    title: '科技发展',
    category: 'tech',
    date: '2025-04-04',
    description: '科技发展日新月异，为我们的生活带来了许多便利。',
  },
  {
    id: 5,
    title: '心理健康',
    category: 'life',
    date: '2025-04-05',
    description: '心理健康对于个人和社会都至关重要。',
  },
  {
    id: 6,
    title: '人工智能',
    category: 'tech',
    date: '2025-04-06',
    description: '人工智能正在改变许多行业，为我们的生活带来更多可能性。',
  },
  {
    id: 7,
    title: '远程工作',
    category: 'life',
    date: '2025-04-07',
    description: '远程工作正在成为一种趋势，为人们提供了更多的灵活性。',
  },
  {
    id: 8,
    title: '在线教育',
    category: 'education',
    date: '2025-04-08',
    description: '在线教育正在改变教育方式，提供更多的学习机会。',
  },
  {
    id: 9,
    title: '科技趋势',
    category: 'tech',
    date: '2025-04-09',
    description: '科技发展日新月异，为我们的生活带来了许多便利。',
  },
  {
    id: 10,
    title: '心理健康',
    category: 'life',
    date: '2025-04-10',
    description: '心理健康对于个人和社会都至关重要。',
  },
  {
    id: 11,
    title: '在线教育',
    category: 'education',
    date: '2025-04-11',
    description: '在线教育正在改变教育方式，提供更多的学习机会。',
  },
  {
    id: 12,
    title: '科技发展',
    category: 'tech',
    date: '2025-04-12',
    description: '科技发展日新月异，为我们的生活带来了许多便利。',
  },
  {
    id: 13,
    title: '健康生活方式',
    category: 'life',
    date: '2025-04-13',
    description: '健康生活方式对于个人和社会都至关重要。',
  },
  {
    id: 14,
    title: '在线教育',
    category: 'education',
    date: '2025-04-14',
    description: '在线教育正在改变教育方式，提供更多的学习机会。',
  },
]

// 响应式表格数据
const tableData = ref([...originalTableData])

// 分页配置
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: tableData.value.length,
  showSizePicker: true,
  pageSizes: [10, 20, 30],
  onChange: (page) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  },
})

// 自定义表单引用
const customFormRef = ref(null)

// 字段变更处理
const handleFieldChange = ({ key, value }) => {
  console.log(`字段变更: ${key} =`, value)
  formData.value[key] = value
}

// 查询处理
const handleSearch = () => {
  customFormRef.value?.validate((errors) => {
    if (!errors) {
      // 重置表格数据为原始数据
      tableData.value = [...originalTableData]

      // 应用过滤
      tableData.value = tableData.value.filter(
        (item) => item.category === formData.value.category
      )
      // 更新分页
      pagination.value.itemCount = tableData.value.length
      pagination.value.page = 1
    } else {
      console.log('校验失败:', errors)
    }
  })
}

// 重置处理
const handleReset = () => {
  formData.value = {
    keyword: '',
    category: null,
    dateRange: null,
    description: '',
  }
  customFormRef.value?.restoreValidation()
  tableData.value = [...originalTableData]
  pagination.value.itemCount = tableData.value.length
  pagination.value.page = 1
}
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入，无需额外 scoped 样式 */
</style>
