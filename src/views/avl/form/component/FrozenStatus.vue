<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #carTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
          <div class="flex justify-end">
            <n-button type="primary" @click="handleAddCarRow" v-if="!readonly">
              添加
            </n-button>
          </div>
        </n-scrollbar>
      </n-space>
    </template>
    <template #pcnTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
          <div class="flex justify-end">
            <n-button type="primary" @click="handleAddPcnRow" v-if="!readonly">
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
  reactivationInterval: null,
  hasCAR: null,
  hasPCN: null,
  carTableData: [
    {
      id: 1,
      carNo: null,
      carStatus: null,
    },
  ],
  pcnTableData: [
    {
      id: 1,
      pcnLevel: null,
      pcnStatus: null,
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

// CAR表格列定义
const carColumns = [
  {
    title: '序号',
    key: 'id',
    width: 80,
    align: 'center',
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>CAR No</span>
      </div>
    ),
    key: 'carNo',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`carTableData[${index}].carNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.carNo}
          onUpdateValue={(value) => {
            row.carNo = value
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
        <span>CAR状态</span>
      </div>
    ),
    key: 'carStatus',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`carTableData[${index}].carStatus`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.carStatus}
          onUpdateValue={(value) => {
            row.carStatus = value
          }}
          options={[
            { label: '待处理', value: 'pending' },
            { label: '已处理', value: 'processed' },
          ]}
          placeholder="请选择"
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
        onPositiveClick={() => formData.value.carTableData.splice(index, 1)}
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

// PCN表格列定义
const pcnColumns = [
  {
    title: '序号',
    key: 'id',
    width: 80,
    align: 'center',
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>PCN等级</span>
      </div>
    ),
    key: 'pcnLevel',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`pcnTableData[${index}].pcnLevel`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.pcnLevel}
          onUpdateValue={(value) => {
            row.pcnLevel = value
          }}
          options={[
            { label: 'A级', value: 'A' },
            { label: 'B级', value: 'B' },
            { label: 'C级', value: 'C' },
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
        <span>PCN状态</span>
      </div>
    ),
    key: 'pcnStatus',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`pcnTableData[${index}].pcnStatus`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.pcnStatus}
          onUpdateValue={(value) => {
            row.pcnStatus = value
          }}
          options={[
            { label: '待处理', value: 'pending' },
            { label: '已处理', value: 'processed' },
          ]}
          placeholder="请选择"
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
        onPositiveClick={() => formData.value.pcnTableData.splice(index, 1)}
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
    key: 'reactivationInterval',
    label: '重新启用间隔时间',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'change'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'hasCAR',
    label: '存在CAR',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'hasPCN',
    label: '2年内有PCN',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'carTableData',
    label: '',
    type: 'table',
    dataKey: 'carTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.carTableData),
      columns: computed(() =>
        !props.readonly
          ? carColumns
          : carColumns.filter((item) => item.key !== 'action')
      ),
      rowKey: (row) => row.id,
      'scroll-x': 1000,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
    visibleWhen: (formData) => formData.hasCAR === 'Y',
  },
  {
    key: 'pcnTableData',
    label: '',
    type: 'table',
    dataKey: 'pcnTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.pcnTableData),
      columns: computed(() =>
        !props.readonly
          ? pcnColumns
          : pcnColumns.filter((item) => item.key !== 'action')
      ),
      rowKey: (row) => row.id,
      'scroll-x': 1000,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
    visibleWhen: (formData) => formData.hasPCN === 'Y',
  },
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
}

const handleAddCarRow = () => {
  formData.value.carTableData.push({
    id: Date.now(),
    carNo: null,
    carStatus: null,
  })
}

const handleAddPcnRow = () => {
  formData.value.pcnTableData.push({
    id: Date.now(),
    pcnLevel: null,
    pcnStatus: null,
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
