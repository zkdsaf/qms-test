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
        <n-data-table v-bind="field.props"> </n-data-table>
        <div class="flex justify-end mt-2">
          <n-button
            type="primary"
            @click="handleAddRow"
            v-if="!readonly || route.query.formType === 'add'"
          >
            添加
          </n-button>
        </div>
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
const route = useRoute()
// 表单数据
const formData = ref({
  tableData: [
    {
      id: 1,
      sequenceNo: null,
      materialType: null,
      materialDesc: null,
      materialName: null,
      supplierCode: null,
      supplierName: null,
      supplierAttribute: null,
      manufacturerName: null,
      brandOwner: null,
      manufacturerCountry: null,
      detailedAddress: null,
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

// 物料类型选项
const materialTypeOptions = [
  { label: '类型1', value: 'type1' },
  { label: '类型2', value: 'type2' },
  { label: '类型3', value: 'type3' },
]

// 供应商属性选项
const supplierAttributeOptions = [
  { label: '属性1', value: 'attr1' },
  { label: '属性2', value: 'attr2' },
  { label: '属性3', value: 'attr3' },
]

// 生产商国家/地区选项
const countryOptions = [
  { label: '中国', value: 'CN' },
  { label: '美国', value: 'US' },
  { label: '日本', value: 'JP' },
]

// 表格列定义（使用 JSX）
const columns = [
  {
    title: '序号',
    key: 'sequenceNo',
    align: 'center',
    width: 80,
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料类型</span>
      </div>
    ),
    key: 'materialType',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].materialType`}
        rule={{
          required: true,
          message: '请选择物料类型',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.materialType}
          onUpdateValue={(value) => {
            row.materialType = value
          }}
          options={materialTypeOptions}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料描述</span>
      </div>
    ),
    key: 'materialDesc',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].materialDesc`}
        rule={{
          required: true,
          message: '请输入物料描述',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.materialDesc}
          onUpdateValue={(value) => {
            row.materialDesc = value
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
        <span>物料名称</span>
      </div>
    ),
    key: 'materialName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].materialName`}
        rule={{
          required: true,
          message: '请输入物料名称',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.materialName}
          onUpdateValue={(value) => {
            row.materialName = value
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
        <span>供应商编码</span>
      </div>
    ),
    key: 'supplierCode',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].supplierCode`}
        rule={{
          required: true,
          message: '请输入供应商编码',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.supplierCode}
          onUpdateValue={(value) => {
            row.supplierCode = value
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
        <span>供应商名称</span>
      </div>
    ),
    key: 'supplierName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].supplierName`}
        rule={{
          required: true,
          message: '请输入供应商名称',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.supplierName}
          onUpdateValue={(value) => {
            row.supplierName = value
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
        <span>供应商属性</span>
      </div>
    ),
    key: 'supplierAttribute',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].supplierAttribute`}
        rule={{
          required: true,
          message: '请选择供应商属性',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.supplierAttribute}
          onUpdateValue={(value) => {
            row.supplierAttribute = value
          }}
          options={supplierAttributeOptions}
          placeholder="请选择"
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
          message: '请输入生产商名称',
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
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>品牌商</span>
      </div>
    ),
    key: 'brandOwner',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].brandOwner`}
        rule={{
          required: true,
          message: '请输入品牌商',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.brandOwner}
          onUpdateValue={(value) => {
            row.brandOwner = value
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
        <span>生产商国家/地区</span>
      </div>
    ),
    key: 'manufacturerCountry',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].manufacturerCountry`}
        rule={{
          required: true,
          message: '请选择生产商国家/地区',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.manufacturerCountry}
          onUpdateValue={(value) => {
            row.manufacturerCountry = value
          }}
          options={countryOptions}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>详细地址</span>
      </div>
    ),
    key: 'detailedAddress',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].detailedAddress`}
        rule={{
          required: true,
          message: '请输入详细地址',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          type="textarea"
          autosize={true}
          value={row.detailedAddress}
          onUpdateValue={(value) => {
            row.detailedAddress = value
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
    key: 'tableData',
    label: '',
    type: 'table',
    dataKey: 'tableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: computed(() =>
        !props.readonly
          ? columns
          : columns.filter((item) => item.key !== 'action')
      ), // 表格列定义
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

const handleAddRow = () => {
  formData.value.tableData.push({
    id: Date.now(),
    supplierAttribute: '属性1',
    sequenceNo: formData.value.tableData.length + 1,
    materialType: 'type1',
    materialDesc: '默认物料描述',
    materialName: '默认物料名称',
    supplierCode: 'SUP001',
    supplierName: '默认供应商',
    manufacturerName: '默认生产商',
    brandOwner: '默认品牌商',
    manufacturerCountry: 'CN',
    detailedAddress: '默认详细地址',
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
