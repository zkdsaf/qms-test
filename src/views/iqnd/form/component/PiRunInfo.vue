<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #piRunTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
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
  piRunTableData: [
    {
      id: 1,
      location: '',
      moduleName: '',
      isPiRun: '',
      result: null,
      useCount: null,
      unit: null,
      batchNo: '',
      fileList: [],
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
const piRunTableColumns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>适用范围</span>
      </div>
    ),
    key: 'location',
    align: 'center',
    render: (row) => '磐石',
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门负责人</span>
      </div>
    ),
    key: 'moduleName',
    align: 'center',
    render: (row) => '使用部门负责人',
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>是否PI-Run</span>
      </div>
    ),
    key: 'isPiRun',
    align: 'center',
    width: 130,
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].isPiRun`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NRadioGroup
          value={row.isPiRun}
          onUpdateValue={(value) => {
            row.isPiRun = value
          }}
        >
          <NSpace>
            <NRadio value="是">是</NRadio>
            <NRadio value="否">否</NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>Pi-Run 结果</span>
      </div>
    ),
    key: 'result',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].result`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.result}
          onUpdateValue={(value) => {
            row.result = value
          }}
          options={[
            { label: 'Pass', value: 'Pass' },
            { label: 'Fail', value: 'Fail' },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料使用数量</span>
      </div>
    ),
    key: 'useCount',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].useCount`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          style={{ width: '100%' }}
          value={row.useCount}
          onUpdateValue={(value) => {
            row.useCount = value
          }}
          placeholder="请输入使用次数"
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
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].unit`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          options={[
            { label: '个', value: '个' },
            { label: '件', value: '件' },
            { label: '套', value: '套' },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>Pi-Run批量号</span>
      </div>
    ),
    key: 'batchNo',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].batchNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.batchNo}
          onUpdateValue={(value) => {
            row.batchNo = value
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
        <span>附件</span>
      </div>
    ),
    key: 'fileList',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`piRunTableData[${index}].fileList`}
        rule={{
          required: true,
          validator: (rule, value) => {
            if (!value || value.length === 0) {
              return new Error('请上传附件')
            }
            return true
          },
          trigger: ['change'],
        }}
      >
        <NUpload
          file-list={row.fileList}
          onChange={(value) => {
            row.fileList = value.fileList || []
          }}
          multiple
          max={5}
        >
          <NButton>上传文件</NButton>
        </NUpload>
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'piRunTableData',
    label: '',
    type: 'table',
    dataKey: 'piRunTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.piRunTableData),
      columns: piRunTableColumns, // 表格列定义
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
