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
import { CloudUploadOutline, SettingsOutline } from '@vicons/ionicons5'

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
      parameter: '',
      unit: '',
      uslType: '≤',
      uslValue: '',
      lslType: '≥',
      lslValue: '',
      ucl: '',
      lcl: '',
      uwl: '',
      lwl: '',
      target: '',
      cl: '',
      mdl: '',
      spcRuleStdev: '',
      variablesAttributesData: null,
      rules: [],
      reviewCycle: null,
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
        <span>Parameter</span>
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
          message: '请输入Parameter',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.parameter}
          onUpdateValue={(value) => {
            row.parameter = value
          }}
          placeholder="请输入Parameter"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>Unit</span>
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
          message: '请输入Unit',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          placeholder="请输入Unit"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>USL</span>
      </div>
    ),
    key: 'uslValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].uslValue`}
        rule={{
          required: true,
          message: '请输入USL',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.uslType}
            onUpdateValue={(value) => {
              row.uslType = value
            }}
            options={[
              { label: '≤', value: '≤' },
              { label: '<', value: '<' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.uslValue}
            onUpdateValue={(value) => {
              row.uslValue = value
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
        <span>LSL</span>
      </div>
    ),
    key: 'lslValue',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`paramsTableData[${index}].lslValue`}
        rule={{
          required: true,
          message: '请输入LSL',
          trigger: ['blur', 'input'],
        }}
      >
        <NSpace>
          <NSelect
            value={row.lslType}
            onUpdateValue={(value) => {
              row.lslType = value
            }}
            options={[
              { label: '≥', value: '≥' },
              { label: '>', value: '>' },
            ]}
            style="width: 60px"
          />
          <NInput
            value={row.lslValue}
            onUpdateValue={(value) => {
              row.lslValue = value
            }}
            placeholder="请输入"
            style="width: 100px"
          />
        </NSpace>
      </NFormItem>
    ),
  },
  {
    title: 'UCL',
    key: 'ucl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].ucl`}>
        <NInput
          value={row.ucl}
          onUpdateValue={(value) => {
            row.ucl = value
          }}
          placeholder="请输入UCL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'LCL',
    key: 'lcl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].lcl`}>
        <NInput
          value={row.lcl}
          onUpdateValue={(value) => {
            row.lcl = value
          }}
          placeholder="请输入LCL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'UWL',
    key: 'uwl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].uwl`}>
        <NInput
          value={row.uwl}
          onUpdateValue={(value) => {
            row.uwl = value
          }}
          placeholder="请输入UWL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'LWL',
    key: 'lwl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].lwl`}>
        <NInput
          value={row.lwl}
          onUpdateValue={(value) => {
            row.lwl = value
          }}
          placeholder="请输入LWL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'Target',
    key: 'target',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].target`}>
        <NInput
          value={row.target}
          onUpdateValue={(value) => {
            row.target = value
          }}
          placeholder="请输入Target"
        />
      </NFormItem>
    ),
  },
  {
    title: 'CL',
    key: 'cl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].cl`}>
        <NInput
          value={row.cl}
          onUpdateValue={(value) => {
            row.cl = value
          }}
          placeholder="请输入CL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'MDL',
    key: 'mdl',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].mdl`}>
        <NInput
          value={row.mdl}
          onUpdateValue={(value) => {
            row.mdl = value
          }}
          placeholder="请输入MDL"
        />
      </NFormItem>
    ),
  },
  {
    title: 'SPC Rule Stdev',
    key: 'spcRuleStdev',
    align: 'center',
    width: 180,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].spcRuleStdev`}>
        <NInput
          value={row.spcRuleStdev}
          onUpdateValue={(value) => {
            row.spcRuleStdev = value
          }}
          placeholder="请输入SPC Rule Stdev"
        />
      </NFormItem>
    ),
  },
  {
    title: 'Variables/Attributes Data',
    key: 'variablesAttributesData',
    align: 'center',
    width: 230,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].variablesAttributesData`}>
        <NSelect
          value={row.variablesAttributesData}
          onUpdateValue={(value) => {
            row.variablesAttributesData = value
          }}
          options={[
            { label: '计量型', value: '计量型' },
            { label: '计数型', value: '计数型' },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <NSpace align="center" justify="center">
        <span>Rule</span>
        <NPopover trigger="click" placement="top">
          {{
            trigger: () => (
              <NButton quaternary circle size="tiny">
                <NIcon>
                  <SettingsOutline />
                </NIcon>
              </NButton>
            ),
            default: () => (
              <div style="padding: 12px">
                <NCheckboxGroup
                  value={formData.value.paramsTableData[0]?.rules || []}
                  onUpdateValue={(value) => {
                    // 更新所有行的rules
                    formData.value.paramsTableData.forEach((item) => {
                      item.rules = value
                    })
                  }}
                >
                  <NSpace>
                    <NCheckbox value="OOS">OOS</NCheckbox>
                    <NCheckbox value="OOSTC">OOSTC</NCheckbox>
                    <NCheckbox value="OOMDL">OOMDL</NCheckbox>
                    <NCheckbox value="WE1">WE1</NCheckbox>
                    <NCheckbox value="WE2">WE2</NCheckbox>
                    <NCheckbox value="WE3">WE3</NCheckbox>
                    <NCheckbox value="WE4">WE4</NCheckbox>
                    <NCheckbox value="WE5">WE5</NCheckbox>
                  </NSpace>
                </NCheckboxGroup>
              </div>
            ),
          }}
        </NPopover>
      </NSpace>
    ),
    key: 'rules',
    align: 'center',
    width: 350,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].rules`}>
        <NCheckboxGroup
          value={row.rules}
          onUpdateValue={(value) => {
            row.rules = value
          }}
        >
          <NSpace>
            <NCheckbox value="OOS">OOS</NCheckbox>
            <NCheckbox value="OOSTC">OOSTC</NCheckbox>
            <NCheckbox value="OOMDL">OOMDL</NCheckbox>
            <NCheckbox value="WE1">WE1</NCheckbox>
            <NCheckbox value="WE2">WE2</NCheckbox>
            <NCheckbox value="WE3">WE3</NCheckbox>
            <NCheckbox value="WE4">WE4</NCheckbox>
            <NCheckbox value="WE5">WE5</NCheckbox>
          </NSpace>
        </NCheckboxGroup>
      </NFormItem>
    ),
  },
  {
    title: 'Review Cycle',
    key: 'reviewCycle',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem path={`paramsTableData[${index}].reviewCycle`}>
        <NSelect
          value={row.reviewCycle}
          onUpdateValue={(value) => {
            row.reviewCycle = value
          }}
          options={[
            { label: '按批次', value: '按批次' },
            { label: '按周期', value: '按周期' },
          ]}
          placeholder="请选择"
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
    parameter: '',
    unit: '',
    uslType: '≤',
    uslValue: '',
    lslType: '≥',
    lslValue: '',
    ucl: '',
    lcl: '',
    uwl: '',
    lwl: '',
    target: '',
    cl: '',
    mdl: '',
    spcRuleStdev: '',
    variablesAttributesData: null,
    rules: [],
    reviewCycle: null,
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
