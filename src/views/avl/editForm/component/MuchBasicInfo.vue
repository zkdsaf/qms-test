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
import { useRoute } from 'vue-router'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
})

const route = useRoute()
const message = useMessage()

// 生成默认数据
const generateDefaultData = (index) => ({
  id: index + 1,
  materialType: '原材料',
  materialNo: `M${String(index + 1).padStart(3, '0')}`,
  materialName: '测试物料',
  materialDesc: '这是一个测试物料描述',
  supplierCode: 'S001',
  supplierName: '测试供应商',
  mainModule: 'Module A',
  mainModuleDept: '研发部',
  mainModuleManager: '李四',
  otherModule: 'Module B',
  otherModuleDept: '生产部',
  allModule: '全部',
  allModuleDept: '全部',
  supplyMethod: '直接供应',
  techNode: '28nm',
  applicableProcess: '标准工艺',
  supplierAttribute: '一级供应商',
  supplierContact: '张三',
  supplierPhone: '13800138000',
  supplierEmail: 'zhangsan@example.com',
  manufacturerName: 'XX制造有限公司',
  manufacturerCode: 'MF001',
  brandOwner: 'XX品牌',
  manufacturerCountry: '中国',
  address: 'XX省XX市XX区XX路XX号',
  formalSpecNo: 'FS001',
  formalSpecVersion: 'V1.0',
  tempSpecNo: 'TS001',
  tempSpecVersion: 'V0.1',
  evtNo: 'EVT001',
  scope: '适用于所有生产线',
  status: '正常',
})

// 表单数据
const formData = ref({
  tableData: [],
})

// 监听路由参数变化
watch(
  () => route.query.materialCodes,
  (newVal) => {
    if (newVal) {
      const codes = newVal.split(',') || 3
      formData.value.tableData = codes.map((_, index) =>
        generateDefaultData(index)
      )
    }
  },
  { immediate: true }
)

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
        <span>物料类型</span>
      </div>
    ),
    key: 'materialType',
    align: 'center',
    width: 120,
    render: (row) => (
      <NInput
        value={row.materialType}
        onUpdateValue={(value) => {
          row.materialType = value
        }}
        placeholder="请输入"
      />
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>料号</span>
      </div>
    ),
    key: 'materialNo',
    align: 'center',
    width: 120,
    render: (row) => (
      <NInput
        value={row.materialNo}
        onUpdateValue={(value) => {
          row.materialNo = value
        }}
        placeholder="请输入"
      />
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
    width: 120,
    render: (row) => (
      <NFormItem
        path="materialName"
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
        <span>物料描述</span>
      </div>
    ),
    key: 'materialDesc',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="materialDesc"
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
        <span>供应商代码</span>
      </div>
    ),
    key: 'supplierCode',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="supplierCode"
        rule={{
          required: true,
          message: '请输入供应商代码',
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
    width: 120,
    render: (row) => (
      <NFormItem
        path="supplierName"
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
        <span>主要使用Module</span>
      </div>
    ),
    key: 'mainModule',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="mainModule"
        rule={{
          required: true,
          message: '请输入主要使用Module',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.mainModule}
          onUpdateValue={(value) => {
            row.mainModule = value
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
        <span>主要使用Module科室</span>
      </div>
    ),
    key: 'mainModuleDept',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="mainModuleDept"
        rule={{
          required: true,
          message: '请输入主要使用Module科室',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.mainModuleDept}
          onUpdateValue={(value) => {
            row.mainModuleDept = value
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
        <span>主要使用部门负责人</span>
      </div>
    ),
    key: 'mainModuleManager',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="mainModuleManager"
        rule={{
          required: true,
          message: '请输入主要使用部门负责人',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.mainModuleManager}
          onUpdateValue={(value) => {
            row.mainModuleManager = value
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
        <span>其他使用Module</span>
      </div>
    ),
    key: 'otherModule',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="otherModule"
        rule={{
          required: true,
          message: '请输入其他使用Module',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.otherModule}
          onUpdateValue={(value) => {
            row.otherModule = value
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
        <span>其他使用Module科室</span>
      </div>
    ),
    key: 'otherModuleDept',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="otherModuleDept"
        rule={{
          required: true,
          message: '请输入其他使用Module科室',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.otherModuleDept}
          onUpdateValue={(value) => {
            row.otherModuleDept = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: '所有使用Module',
    key: 'allModule',
    align: 'center',
    width: 120,
  },
  {
    title: '所有使用Module科室',
    key: 'allModuleDept',
    align: 'center',
    width: 120,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应方式</span>
      </div>
    ),
    key: 'supplyMethod',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="supplyMethod"
        rule={{
          required: true,
          message: '请输入供应方式',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.supplyMethod}
          onUpdateValue={(value) => {
            row.supplyMethod = value
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
        <span>技术节点</span>
      </div>
    ),
    key: 'techNode',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="techNode"
        rule={{
          required: true,
          message: '请输入技术节点',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.techNode}
          onUpdateValue={(value) => {
            row.techNode = value
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
        <span>适用制程</span>
      </div>
    ),
    key: 'applicableProcess',
    align: 'center',
    width: 120,
    render: (row) => (
      <NFormItem
        path="applicableProcess"
        rule={{
          required: true,
          message: '请输入适用制程',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.applicableProcess}
          onUpdateValue={(value) => {
            row.applicableProcess = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: '供应商属性',
    key: 'supplierAttribute',
    align: 'center',
    width: 120,
  },
  {
    title: '供应商联系人',
    key: 'supplierContact',
    align: 'center',
    width: 120,
  },
  {
    title: '供应商电话',
    key: 'supplierPhone',
    align: 'center',
    width: 120,
  },
  {
    title: '供应商邮箱',
    key: 'supplierEmail',
    align: 'center',
    width: 120,
  },
  {
    title: '生产商名称',
    key: 'manufacturerName',
    align: 'center',
    width: 120,
  },
  {
    title: '生产商代码',
    key: 'manufacturerCode',
    align: 'center',
    width: 120,
  },
  {
    title: '品牌商',
    key: 'brandOwner',
    align: 'center',
    width: 120,
  },
  {
    title: '生产商国家/地区',
    key: 'manufacturerCountry',
    align: 'center',
    width: 120,
  },
  {
    title: '详细地址',
    key: 'address',
    align: 'center',
    width: 120,
  },
  {
    title: '正式规格书编号',
    key: 'formalSpecNo',
    align: 'center',
    width: 120,
  },
  {
    title: '正式规格书版本',
    key: 'formalSpecVersion',
    align: 'center',
    width: 120,
  },
  {
    title: '临时规格书编号',
    key: 'tempSpecNo',
    align: 'center',
    width: 120,
  },
  {
    title: '临时规格书版本',
    key: 'tempSpecVersion',
    align: 'center',
    width: 120,
  },
  {
    title: '工程验证单编号',
    key: 'evtNo',
    align: 'center',
    width: 120,
  },
  {
    title: '适用范围',
    key: 'scope',
    align: 'center',
    width: 120,
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 120,
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
