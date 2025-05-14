<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
    label-width="160"
  >
    <!-- <template #department-suffix> 可以搜索 </template> -->

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
  materialType: null,
  materialName: null,
  department: null,
  departmentHead: null,
  projectTime: null,
  tableData: [
    {
      id: 1,
      vendorName: null,
      manufacturerName: null,
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

// 表格列定义（使用 JSX）
const columns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应商名称</span>
      </div>
    ),
    key: 'vendorName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].vendorName`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.vendorName}
          onUpdateValue={(value) => {
            row.vendorName = value
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
        <span>生产商名称</span>
      </div>
    ),
    key: 'manufacturerName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].manufacturerName`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.manufacturerName}
          onUpdateValue={(value) => {
            row.manufacturerName = value
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
    key: 'department',
    label: '主要使用部门/科室',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    slots: { suffix: true },
  },
  {
    key: 'departmentHead',
    label: '主要使用部门负责人',
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
    key: 'projectTime',
    label: '立项时间',
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
      type: 'date',
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'tableData',
    label: '',
    type: 'table',
    dataKey: 'tableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: computed(() =>
        !props.readonly
          ? columns
          : columns.filter((item) => item.key !== 'action')
      ),
      rowKey: (row) => row.id,
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
    vendorName: null,
    manufacturerName: null,
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
