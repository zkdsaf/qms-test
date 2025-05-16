<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
  </custom-form>
  <n-collapse :default-expanded-names="['1']">
    <n-collapse-item name="1">
      <template #header>
        <h2 class="text-lg font-bold"></h2>
      </template>
      <n-form label-placement="left" label-width="auto" labelWidth="160">
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="物料类型">{{ item.materialType }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="是否取得证书">{{ item.hasCert }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书编号">{{ item.certNo }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书认证地址">{{
              item.certAddress
            }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书认证机构">{{ item.certOrg }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="认证物料范围">{{
              item.materialScope
            }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="认证生效日期">{{ item.issueDate }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="认证有效期">{{ item.expireDate }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书原档">{{ item.certFile }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书有效证明">{{ item.certProof }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="认证机IAFT成员">{{
              item.iaftMember
            }}</n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书版本">{{ item.certVersion }}</n-form-item>
          </n-grid-item>

          <n-grid-item span="3 m:3 l:3">
            <n-data-table
              :data="item.materialList"
              :columns="columns"
              class="mb-4"
            />
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
  formData: {
    type: Object,
    default: () => null,
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  makerName: null,
  makerSite: null,
})

watch(
  () => props.formData,
  (newVal) => {
    if (newVal) {
      // 遍历 formData 的所有字段
      Object.keys(formData.value).forEach((key) => {
        // 如果 props.item 中对应的字段有值，则更新
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
          disabled
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>料号</span>
      </div>
    ),
    key: 'materialCode',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].materialCode`}
        rule={{
          required: true,
          message: '请输入料号',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.materialCode}
          onUpdateValue={(value) => {
            row.materialCode = value
          }}
          placeholder="请输入"
          disabled
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
          disabled
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
          disabled
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
          disabled
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
          disabled
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料所属认证范围</span>
      </div>
    ),
    key: 'certScope',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].certScope`}
        rule={{
          required: true,
          message: '请输入物料所属认证范围',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          type="textarea"
          autosize={true}
          value={row.certScope}
          onUpdateValue={(value) => {
            row.certScope = value
          }}
          placeholder="请输入"
          disabled
        />
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'makerName',
    label: '生产商名称',
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
    key: 'makerSite',
    label: '详细地址',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  //   {
  //     key: 'tableData',
  //     label: '',
  //     type: 'table',
  //     dataKey: 'tableData',
  //     props: {
  //       bordered: true,
  //       singleLine: false,
  //       data: computed(() => formData.value.tableData),
  //       columns,
  //       rowKey: (row) => row.id,
  //     },
  //     listenChange: true,
  //     span: '3 m:3 l:3 xl:3',
  //   },
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
