<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
  >
    <template #packageTableData="{ field }">
      <n-space vertical class="w-full">
        <n-button type="primary" @click="handleAddRow" v-if="!readonly"
          >增加</n-button
        >
        <n-data-table v-bind="field.props"> </n-data-table>
      </n-space>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import { CloudUploadOutline } from '@vicons/ionicons5'

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
  packageTableData: [
    {
      id: 1,
      content: null,
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
          formData.value[key] = [...newVal[key]]
        }
      })
    }
  },
  { deep: true, immediate: true }
)

// 表格列定义（使用 JSX）
const columns = [
  {
    key: 'content',
    align: 'center',
    render: (row, index) => (
      <NFormItem
        path={`packageTableData[${index}].content`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.content}
          onUpdateValue={(value) => {
            row.content = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    width: 80,
    key: 'action',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() => formData.value.packageTableData.splice(index, 1)}
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
    key: 'packageTableData',
    label: '',
    type: 'table',
    dataKey: 'packageTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.packageTableData),
      columns: !props.readonly
        ? columns
        : columns.filter((item) => item.key !== 'action'),
      rowKey: (row) => row.id, // 表格行主键
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
])

const handleAddRow = () => {
  formData.value.packageTableData.push({
    id: Date.now(),
    content: '',
  })
}

const formRef = ref(null)

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
:deep(table thead tr th) {
  display: none;
}
</style>
