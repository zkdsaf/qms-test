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
        </n-scrollbar>
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
  tableData: [
    {
      id: 1,
      item: 'Aging Test',
      isProvideData: null,
      remark: '',
      provideData: [],
      evaluationConclusionProvided: null,
      evaluationConclusionNotProvided: null,
      riskDescription: '',
    },
    {
      id: 2,
      item: '验证污染性',
      isProvideData: null,
      remark: '',
      provideData: [],
      evaluationConclusionProvided: null,
      evaluationConclusionNotProvided: null,
      riskDescription: '',
    },
    {
      id: 3,
      item: '工艺参数影响',
      isProvideData: null,
      remark: '',
      provideData: [],
      evaluationConclusionProvided: null,
      evaluationConclusionNotProvided: null,
      riskDescription: '',
    },
    {
      id: 4,
      item: '产品特性影响',
      isProvideData: null,
      remark: '',
      provideData: [],
      evaluationConclusionProvided: null,
      evaluationConclusionNotProvided: null,
      riskDescription: '',
    },
    {
      id: 5,
      item: 'Others',
      isProvideData: null,
      remark: '',
      provideData: [],
      evaluationConclusionProvided: null,
      evaluationConclusionNotProvided: null,
      riskDescription: '',
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
const columns = [
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
        <span>Item</span>
      </div>
    ),
    key: 'item',
    align: 'center',
    width: 150,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>是否提供数据</span>
      </div>
    ),
    key: 'isProvideData',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].isProvideData`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['change'],
        }}
      >
        <NRadioGroup
          value={row.isProvideData}
          onUpdateValue={(value) => {
            row.isProvideData = value
          }}
        >
          <NSpace>
            <NRadio value="Y">是</NRadio>
            <NRadio value="N">否</NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>Remark</span>
      </div>
    ),
    key: 'remark',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].remark`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.remark}
          onUpdateValue={(value) => {
            row.remark = value
          }}
          type="textarea"
          autosize
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>提供数据佐证</span>
      </div>
    ),
    key: 'provideData',
    align: 'center',
    width: 320,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].provideData`}
        rule={{
          required: true,
          message: '请上传',
          trigger: ['change'],
        }}
      >
        <NUpload
          file-list={row.provideData}
          onChange={(value) => {
            row.provideData = value.fileList || []
          }}
          max={1}
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          show-download-button
        >
          {{
            default: () => (
              <NIcon
                component={CloudUploadOutline}
                size="24"
                class="cursor-pointer"
              />
            ),
          }}
        </NUpload>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门评估结论-已提供</span>
      </div>
    ),
    key: 'evaluationConclusionProvided',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].evaluationConclusionProvided`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['change'],
        }}
      >
        <NRadioGroup
          value={row.evaluationConclusionProvided}
          onUpdateValue={(value) => {
            row.evaluationConclusionProvided = value
          }}
        >
          <NSpace>
            <NRadio value="Pass">Pass</NRadio>
            <NRadio value="Fail">Fail</NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门评估结论-不提供</span>
      </div>
    ),
    key: 'evaluationConclusionNotProvided',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].evaluationConclusionNotProvided`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['change'],
        }}
      >
        <NRadioGroup
          value={row.evaluationConclusionNotProvided}
          onUpdateValue={(value) => {
            row.evaluationConclusionNotProvided = value
          }}
        >
          <NRadio value="0">不提供</NRadio>
          <NRadio value="1">提供</NRadio>
        </NRadioGroup>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门风险说明</span>
      </div>
    ),
    width: 200,
    key: 'riskDescription',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].riskDescription`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.riskDescription}
          onUpdateValue={(value) => {
            row.riskDescription = value
          }}
          type="textarea"
          autosize
        />
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'tableData',
    label: '',
    type: 'table',
    dataKey: 'tableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: computed(() => {
        return !props.readonly
          ? columns
          : columns.filter((item) => item.key !== 'action')
      }),
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
