<template>
  <n-card class="mb-2 shadow-lg rounded-lg" title="插槽化表单">
    <custom-form
      ref="formRef"
      :fields="formFields"
      :cols="formCols"
      :form-data="formData"
      :readonly="readonly"
      @field-change="handleFieldChange"
    >
      <template #keyword-suffix> 可以搜索 </template>
      <template #category-header> 头部插槽 </template>
      <template #category-action> 操作插槽 </template>
      <template #file="{ field }">
        <file-upload
          v-bind="field.props"
          @change="handleFileChange('file', $event)"
          v-model:value="formData.file"
        >
          <n-button type="primary">选择文件</n-button>
        </file-upload>
      </template>
    </custom-form>
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
  </n-card>
  <n-card class="shadow-lg rounded-lg" title="查询结果">
    <n-data-table
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :bordered="true"
      class="min-h-[400px]"
    />
  </n-card>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'

const message = useMessage()

const formData = ref({
  keyword: '',
  category: null,
  dateRange: null,
  description: '',
  file: [],
})

const formCols = 3
const readonly = ref(false)

const formFields = ref([
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
      { required: true, message: '请选择类别', trigger: ['blur', 'input'] },
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
    props: { type: 'daterange', clearable: true },
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
  // {
  //   key: 'file',
  //   label: '上传文件',
  //   type: 'input', // 插槽化不依赖 upload 类型
  //   rules: [
  //     {
  //       key: 'file',
  //       required: true,
  //       validator: (rule, value) => {
  //         if (!value || value.length === 0)
  //           return new Error('请至少上传一个文件')
  //         const maxSize = 5 * 1024 * 1024
  //         const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
  //         for (const file of value) {
  //           if (file.file && file.file.size > maxSize)
  //             return new Error(`文件 ${file.name} 超过 5MB`)
  //           if (file.file && !allowedTypes.includes(file.file.type))
  //             return new Error(
  //               `文件 ${file.name} 格式不支持，仅支持 JPG、PNG、PDF`
  //             )
  //         }
  //         return true
  //       },
  //       trigger: ['change'],
  //     },
  //   ],
  //   props: {
  //     action: '/api/upload',
  //     accept: '.jpg,.png,.pdf',
  //     max: 3,
  //     listType: 'text',
  //     multiple: true,
  //   },
  //   listenChange: true,
  //   span: '3 m:3 l:3 xl:3',
  // },
])

const columns = [
  { title: 'ID', key: 'id', width: 80, resizable: true, align: 'center' },
  { title: '标题', key: 'title', width: 120, resizable: true, align: 'center' },
  {
    title: '类别',
    key: 'category',
    width: 120,
    resizable: true,
    align: 'center',
    render: (row) =>
      row.category === 'tech'
        ? '技术'
        : row.category === 'life'
        ? '生活'
        : '教育',
  },
  {
    title: '描述',
    key: 'description',
    width: 200,
    resizable: true,
    align: 'center',
    ellipsis: { tooltip: true },
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

const originalTableData = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  title: `标题${index + 1}`,
  category: index % 2 === 0 ? 'tech' : index % 3 === 0 ? 'life' : 'edu',
  date: `2023-01-${index + 1}`,
  description: `描述${index + 1}`,
}))

const tableData = ref([...originalTableData])

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

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
}

const handleFileChange = (key, finishedFiles) => {
  console.log(`插槽化 - 上传完成的 ${key} fileList:`, finishedFiles)
  formData.value[key] = finishedFiles
  // 手动更新 file的校验状态
  formRef.value?.validate(
    (errors) => {
      if (errors) {
        console.error(errors)
      }
    },
    (rule) => {
      return rule?.key === 'file'
    }
  )
}

const handleSearch = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      tableData.value = [...originalTableData]
      if (formData.value.category) {
        tableData.value = tableData.value.filter(
          (item) => item.category === formData.value.category
        )
      }
      pagination.value.itemCount = tableData.value.length
      pagination.value.page = 1
    } else {
      console.log('校验失败:', errors)
    }
  })
}

const handleReset = () => {
  formData.value = {
    keyword: '',
    category: null,
    dateRange: null,
    description: '',
    file: [],
  }
  formRef.value?.restoreValidation()
  tableData.value = [...originalTableData]
  pagination.value.itemCount = tableData.value.length
  pagination.value.page = 1
}
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
```
