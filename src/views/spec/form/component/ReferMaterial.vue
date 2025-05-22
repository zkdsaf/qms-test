<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="true"
    @field-change="handleFieldChange"
    :label-width="165"
  >
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
})
const message = useMessage()

// 表单数据
const formData = ref({
  materialType: 'WF',
  eQualNo: 'EQ001',
  materialNo: 'MN001',
  scope: ['G2'],
  materialDescription: '默认物料描述',
  technicalSpec: '默认技术规格',
  materialName: '默认物料名称',
  vendorCode: 'VC001',
  vendorName: '默认供应商名称',
  manufacturerCode: 'MC001',
  manufacturerName: '默认生产商名称',
  manufacturerNameAbbr: '默认生产商缩写',
  manufacturerCountry: '默认生产商国家/地区',
  g1CrossModule: 'N',
  g1MainDeptManager: '默认磐石主要使用部门科长',
  g1MainDeptDirector: '默认磐石主要使用部门部长',
  g1OtherDeptManager: '默认磐石其他使用部门科长',
  g1OtherDeptDirector: '默认磐石其他使用部门部长',
  g2CrossModule: 'N',
  g2MainDeptManager: '默认司南主要使用部门科长',
  g2MainDeptDirector: '默认司南主要使用部门部长',
  g2OtherDeptManager: '默认司南其他使用部门科长',
  g2OtherDeptDirector: '默认司南其他使用部门部长',
})

// 下拉框选项
const materialTypeOptions = [
  { label: 'WF 硅片', value: 'WF' },
  { label: 'NP 非产品硅片', value: 'NP' },
  { label: 'TC 靶材', value: 'TC' },
  { label: 'LC 光刻化学品', value: 'LC' },
  { label: 'NC 普通化学品', value: 'NC' },
  { label: 'SG 特气', value: 'SG' },
  { label: 'PD 研磨垫', value: 'PD' },
  { label: 'DK 钻石盘', value: 'DK' },
  { label: 'SL 研磨剂', value: 'SL' },
]

const scopeOptions = [
  { label: '磐石', value: 'G1' },
  { label: '司南', value: 'G2' },
]

const crossModuleOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'materialType',
    label: '物料类型',
    type: 'select',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: materialTypeOptions,
      placeholder: '请选择物料类型',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'eQualNo',
    label: '前置流程(E-QUAL NO/PCN NO)',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入前置流程(E-QUAL NO/PCN NO)',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialNo',
    label: '料号',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入料号',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'scope',
    label: '适用范围',
    type: 'checkbox',
    rules: [
      {
        type: 'array',
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    props: {
      options: scopeOptions,
      placeholder: '请选择适用范围',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialDescription',
    label: '物料描述',
    type: 'textarea',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入物料描述',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'technicalSpec',
    label: '技术规格',
    type: 'textarea',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入技术规格',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'materialName',
    label: '物料名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入物料名称',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'vendorCode',
    label: '供应商编码',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入供应商编码',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'vendorName',
    label: '供应商名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入供应商名称',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'manufacturerCode',
    label: '生产商编码',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入生产商编码',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'manufacturerName',
    label: '生产商名称',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入生产商名称',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'manufacturerNameAbbr',
    label: '生产商名称(缩写)',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入生产商名称缩写',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'manufacturerCountry',
    label: '生产商国家/地区',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入生产商国家/地区',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'g1CrossModule',
    label: '磐石CrossModule',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: crossModuleOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G1'),
  },
  {
    key: 'g1MainDeptManager',
    label: '磐石主要使用部门科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入磐石主要使用部门科长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G1'),
  },
  {
    key: 'g1MainDeptDirector',
    label: '磐石主要使用部门部长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入磐石主要使用部门部长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G1'),
  },
  {
    key: 'g1OtherDeptManager',
    label: '磐石其他使用部门科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入磐石其他使用部门科长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) =>
      formData.g1CrossModule === 'Y' && formData.scope.includes('G1'),
  },
  {
    key: 'g1OtherDeptDirector',
    label: '磐石其他使用部门部长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入磐石其他使用部门部长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) =>
      formData.g1CrossModule === 'Y' && formData.scope.includes('G1'),
  },
  {
    key: 'g2CrossModule',
    label: '司南CrossModule',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: crossModuleOptions,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G2'),
  },
  {
    key: 'g2MainDeptManager',
    label: '司南主要使用部门科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入司南主要使用部门科长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G2'),
  },
  {
    key: 'g2MainDeptDirector',
    label: '司南主要使用部门部长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入司南主要使用部门部长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) => formData.scope.includes('G2'),
  },
  {
    key: 'g2OtherDeptManager',
    label: '司南其他使用部门科长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入司南其他使用部门科长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) =>
      formData.g2CrossModule === 'Y' && formData.scope.includes('G2'),
  },
  {
    key: 'g2OtherDeptDirector',
    label: '司南其他使用部门部长',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入司南其他使用部门部长',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
    visibleWhen: (formData) =>
      formData.g2CrossModule === 'Y' && formData.scope.includes('G2'),
  },
])

const formRef = ref(null)

const emit = defineEmits(['materialTypeChange'])

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
  if (key === 'materialType') {
    emit('materialTypeChange', value)
  }
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
