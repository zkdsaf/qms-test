<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
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
  readonly: {
    type: Boolean,
    default: false,
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  materialType: null,
  eQualNo: null,
  materialNo: null,
  scope: [],
  materialDescription: null,
  technicalSpec: null,
  materialName: null,
  vendorCode: null,
  vendorName: null,
  manufacturerCode: null,
  manufacturerName: null,
  manufacturerNameAbbr: null,
  manufacturerCountry: null,
  g1CrossModule: null,
  g1MainDeptManager: null,
  g1MainDeptDirector: null,
  g1OtherDeptManager: null,
  g1OtherDeptDirector: null,
  g2CrossModule: null,
  g2MainDeptManager: null,
  g2MainDeptDirector: null,
  g2OtherDeptManager: null,
  g2OtherDeptDirector: null,
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

// 下拉框选项
const materialTypeOptions = [
  { label: '类型1', value: 'type1' },
  { label: '类型2', value: 'type2' },
  { label: '类型3', value: 'type3' },
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
    label: 'E-QUAL NO',
    type: 'input',
    rules: [{ required: true, message: '请输入', trigger: ['blur', 'input'] }],
    props: {
      placeholder: '请输入E-QUAL NO',
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
