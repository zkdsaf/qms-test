<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #moduleInfoTableData="{ field }">
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
  moduleInfoTableData: [
    {
      id: 1,
      location: '',
      moduleName: '',
      isImpact: null,
      comment: null,
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
const moduleColumns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>适用范围</span>
      </div>
    ),
    width: 100,
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
    width: 150,
    align: 'center',
    render: (row) => '使用部门负责人',
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>是否对产品有影响</span>
      </div>
    ),
    key: 'isImpact',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`moduleInfoTableData[${index}].isImpact`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.isImpact}
          onUpdateValue={(value) => {
            row.isImpact = value
          }}
          options={[
            { label: '有影响', value: 'Pass' },
            { label: '无影响', value: 'Fail' },
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
        <span>备注</span>
      </div>
    ),
    key: 'comment',
    align: 'center',
    width: 400,
    render: (row, index) => (
      <NFormItem
        path={`moduleInfoTableData[${index}].comment`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.comment}
          type="textarea"
          autosize={true}
          onUpdateValue={(value) => {
            row.comment = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'moduleInfoTableData',
    label: '',
    type: 'table',
    dataKey: 'moduleInfoTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.moduleInfoTableData),
      columns: moduleColumns, // 表格列定义
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
