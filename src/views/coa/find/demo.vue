```vue
<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-6">
    <n-card class="mb-6 shadow-lg rounded-lg" title="封装的表单校验">
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
            :value="formData.file"
          >
            <n-button type="primary">选择文件</n-button>
          </file-upload>
        </template>

        <template #tableData="{ field }">
          <n-space vertical class="w-full">
            <n-data-table v-bind="field.props"> </n-data-table>
            <n-button type="primary" @click="handleAddRow">添加</n-button>
          </n-space>
        </template>
      </custom-form>
      <div class="flex justify-end mt-6 space-x-2">
        <n-button
          type="primary"
          @click="handleSearch"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6"
        >
          校验
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
  </div>
</template>

<script setup lang="jsx">
import { computed, ref } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'

const message = useMessage()

// 表单数据
const formData = ref({
  category: null,
  file: [],
  tableData: [
    { id: 1, name: '', role: '' },
    { id: 2, name: '', role: '' },
  ],
})

const formCols = 3
const readonly = ref(false)

// 下拉框选项
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' },
]

// 表格列定义（使用 JSX）
const tableColumns = [
  {
    title: '姓名',
    key: 'name',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].name`}
        rule={{
          required: true,
          message: '请输入姓名',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.name}
          onUpdateValue={(value) => {
            row.name = value
          }}
        >
          {{
            suffix: () => <div class="text-red-500">*</div>,
          }}
        </NInput>
      </NFormItem>
    ),
  },
  {
    title: '角色',
    key: 'role',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].role`}
        rule={{
          required: true,
          message: '请选择角色',
          trigger: ['change', 'blur'],
        }}
      >
        <NSelect
          value={row.role}
          options={roleOptions}
          onUpdateValue={(value) => {
            row.role = value
          }}
        />
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'category',
    label: '类别',
    type: 'select',
    rules: [
      { required: true, message: '请选择类别', trigger: ['blur', 'change'] },
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
    key: 'file',
    label: '上传文件',
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
    key: 'tableData',
    label: '表格数据',
    type: 'table',
    dataKey: 'tableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: tableColumns, // 表格列定义
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
  formData.value.tableData.push({
    id: Date.now(),
    name: '新行',
    age: 18,
  })
}

const handleSearch = () => {
  console.log('搜索', formData.value)

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log('表单校验通过', formData.value)
    } else {
      console.log('校验失败:', errors)
    }
  })
}

const handleReset = () => {
  formData.value = {
    category: null,
    file: [],
    tableData: [
      { id: 1, name: '', role: '' },
      { id: 2, name: '', role: '' },
    ],
  }
  formRef.value?.restoreValidation()
}
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
```
