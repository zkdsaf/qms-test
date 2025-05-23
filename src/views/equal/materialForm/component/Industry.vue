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

    <template #industryTableData="{ field }">
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
  industryTableData: [
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
    title: () => (
      <div>
        <span style="color: red">*</span>
        <span>行业经验</span>
      </div>
    ),
    key: 'content',
    align: 'center',
    width: 600,
    render: (row, index) => (
      <NFormItem
        path={`industryTableData[${index}].content`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.content}
          onUpdateValue={(value) => {
            row.content = value
          }}
          placeholder="请输入"
          type="textarea"
          autosize={true}
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
        onPositiveClick={() =>
          formData.value.industryTableData.splice(index, 1)
        }
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
    key: 'industryTableData',
    label: '',
    type: 'table',
    dataKey: 'industryTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.industryTableData),
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
  formData.value.industryTableData.push({
    id: Date.now(),
    content: null,
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
