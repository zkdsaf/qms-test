<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
  >
    <template #paramsTableData="{ field }">
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
  paramsTableData: [
    {
      id: 1,
      type: '',
      parameter: '',
      unit: '',
      upperLimitType: '≤',
      upperLimitValue: '',
      lowerLimitType: '≥',
      lowerLimitValue: '',
      stcUclType: '≤',
      stcUclValue: '',
      stcLclType: '≥',
      stcLclValue: '',
      measurementMethod: '',
      measurementTool: '',
      detectionLimit: '',
      coa: '否',
      remark: '',
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
        <span class="text-red-500">*</span>
        <span>类型</span>
      </div>
    ),
    key: 'type',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].type`}
        rule={{
          required: true,
          message: '请输入类型',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.type}
          onUpdateValue={(value) => {
            row.type = value
          }}
          placeholder="请输入类型"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>参数</span>
      </div>
    ),
    key: 'parameter',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].parameter`}
        rule={{
          required: true,
          message: '请输入参数',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.parameter}
          onUpdateValue={(value) => {
            row.parameter = value
          }}
          placeholder="请输入参数"
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
    width: 100,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].unit`}
        rule={{
          required: true,
          message: '请输入单位',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          placeholder="请输入单位"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>上规格限</span>
      </div>
    ),
    key: 'upperLimitValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].upperLimitValue`}
        rule={{
          required: true,
          message: '请输入上规格限',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.upperLimitType}
            onUpdateValue={(value) => {
              row.upperLimitType = value
            }}
            options={[
              { label: '≤', value: '≤' },
              { label: '<', value: '<' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.upperLimitValue}
            onUpdateValue={(value) => {
              row.upperLimitValue = value
            }}
            placeholder="请输入"
            style="width: 100px"
          />
        </NSpace>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>下规格限</span>
      </div>
    ),
    key: 'lowerLimitValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].lowerLimitValue`}
        rule={{
          required: true,
          message: '请输入下规格限',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.lowerLimitType}
            onUpdateValue={(value) => {
              row.lowerLimitType = value
            }}
            options={[
              { label: '≥', value: '≥' },
              { label: '>', value: '>' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.lowerLimitValue}
            onUpdateValue={(value) => {
              row.lowerLimitValue = value
            }}
            placeholder="请输入"
            style="width: 100px"
          />
        </NSpace>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>STC-UCL</span>
      </div>
    ),
    key: 'stcUclValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].stcUclValue`}
        rule={{
          required: true,
          message: '请输入STC-UCL',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.stcUclType}
            onUpdateValue={(value) => {
              row.stcUclType = value
            }}
            options={[
              { label: '≤', value: '≤' },
              { label: '<', value: '<' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.stcUclValue}
            onUpdateValue={(value) => {
              row.stcUclValue = value
            }}
            placeholder="请输入"
            style="width: 100px"
          />
        </NSpace>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>STC-LCL</span>
      </div>
    ),
    key: 'stcLclValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].stcLclValue`}
        rule={{
          required: true,
          message: '请输入STC-LCL',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.stcLclType}
            onUpdateValue={(value) => {
              row.stcLclType = value
            }}
            options={[
              { label: '≥', value: '≥' },
              { label: '>', value: '>' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.stcLclValue}
            onUpdateValue={(value) => {
              row.stcLclValue = value
            }}
            placeholder="请输入"
            style="width: 100px"
          />
        </NSpace>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>测量方法</span>
      </div>
    ),
    key: 'measurementMethod',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].measurementMethod`}
        rule={{
          required: true,
          message: '请输入测量方法',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.measurementMethod}
          onUpdateValue={(value) => {
            row.measurementMethod = value
          }}
          placeholder="请输入测量方法"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>测量工具</span>
      </div>
    ),
    key: 'measurementTool',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].measurementTool`}
        rule={{
          required: true,
          message: '请输入测量工具',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.measurementTool}
          onUpdateValue={(value) => {
            row.measurementTool = value
          }}
          placeholder="请输入测量工具"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>检出限</span>
      </div>
    ),
    key: 'detectionLimit',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].detectionLimit`}
        rule={{
          required: true,
          message: '请输入检出限',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.detectionLimit}
          onUpdateValue={(value) => {
            row.detectionLimit = value
          }}
          placeholder="请输入检出限"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>COA</span>
      </div>
    ),
    key: 'coa',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].coa`}
        rule={{
          required: true,
          message: '请选择COA',
          trigger: ['blur', 'change'],
        }}
      >
        <NRadioGroup
          value={row.coa}
          onUpdateValue={(value) => {
            row.coa = value
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
        <span>备注</span>
      </div>
    ),
    key: 'remark',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].remark`}>
        <NInput
          value={row.remark}
          onUpdateValue={(value) => {
            row.remark = value
          }}
          placeholder="请输入备注"
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
        onPositiveClick={() => formData.value.paramsTableData.splice(index, 1)}
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
    key: 'paramsTableData',
    label: '',
    type: 'table',
    dataKey: 'paramsTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.paramsTableData),
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
  formData.value.paramsTableData.push({
    id: Date.now(),
    type: '',
    parameter: '',
    unit: '',
    upperLimitType: '≤',
    upperLimitValue: '',
    lowerLimitType: '≥',
    lowerLimitValue: '',
    stcUclType: '≤',
    stcUclValue: '',
    stcLclType: '≥',
    stcLclValue: '',
    measurementMethod: '',
    measurementTool: '',
    detectionLimit: '',
    coa: '否',
    remark: '',
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

<style scoped></style>
