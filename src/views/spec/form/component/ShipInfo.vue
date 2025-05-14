<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #shipTableData="{ field }">
      <n-space vertical class="w-full">
        <n-divider title-placement="left"> 运输温度要求 </n-divider>
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
  shipTableData: [
    {
      id: 1,
      tempUpperLimit: '',
      tempLowerLimit: '',
      tempUnit: null,
      maxAllowTempType: '≤',
      maxAllowTemp: '',
      minAllowTempType: '≥',
      minAllowTemp: '',
      allowTime: '',
      allowTimeUnit: null,
    },
  ],
  avoidLight: null,
  transportTemp: null,
  valveVacuum: null,
  other: null,
  shipContainer: null,
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
      <span>
        <span style="color: red">*</span>
        温度规格上限
      </span>
    ),
    key: 'tempUpperLimit',
    align: 'center',
    width: 150,
    render: (row, index) => {
      if (index === 0) {
        return (
          <NFormItem
            path={`shipTableData[${index}].tempUpperLimit`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.tempUpperLimit}
              onUpdateValue={(value) => {
                formData.value.shipTableData.forEach((item) => {
                  item.tempUpperLimit = value
                })
              }}
              placeholder="请输入"
            />
          </NFormItem>
        )
      }
      return null
    },
    rowSpan: (row, index) =>
      index === 0 ? formData.value.shipTableData.length : 0,
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        温度规格下限
      </span>
    ),
    key: 'tempLowerLimit',
    align: 'center',
    width: 150,
    render: (row, index) => {
      if (index === 0) {
        return (
          <NFormItem
            path={`shipTableData[${index}].tempLowerLimit`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.tempLowerLimit}
              onUpdateValue={(value) => {
                formData.value.shipTableData.forEach((item) => {
                  item.tempLowerLimit = value
                })
              }}
              placeholder="请输入"
            />
          </NFormItem>
        )
      }
      return null
    },
    rowSpan: (row, index) =>
      index === 0 ? formData.value.shipTableData.length : 0,
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        温度单位
      </span>
    ),
    key: 'tempUnit',
    align: 'center',
    width: 120,
    render: (row, index) => {
      if (index === 0) {
        return (
          <NFormItem
            path={`shipTableData[${index}].tempUnit`}
            rule={{
              required: true,
              message: '请选择',
              trigger: ['blur', 'change'],
            }}
          >
            <NSelect
              value={row.tempUnit}
              onUpdateValue={(value) => {
                formData.value.shipTableData.forEach((item) => {
                  item.tempUnit = value
                })
              }}
              options={[
                { label: '℃', value: '℃' },
                { label: '℉', value: '℉' },
              ]}
              placeholder="请选择"
            />
          </NFormItem>
        )
      }
      return null
    },
    rowSpan: (row, index) =>
      index === 0 ? formData.value.shipTableData.length : 0,
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        最高允许温度
      </span>
    ),
    key: 'maxAllowTemp',
    align: 'center',
    width: 300,
    render: (row, index) => (
      <NFormItem
        path={`shipTableData[${index}].maxAllowTemp`}
        rule={{
          required: true,
          message: '请输入最高允许温度',
          trigger: ['blur', 'input'],
        }}
      >
        <div class="flex items-center gap-2">
          <NFormItem
            path={`shipTableData[${index}].maxAllowTempType`}
            rule={{
              required: true,
              message: '请选择条件',
              trigger: ['blur', 'change'],
            }}
          >
            <NSelect
              value={row.maxAllowTempType}
              onUpdateValue={(value) => {
                row.maxAllowTempType = value
              }}
              options={[
                { label: '≤', value: '≤' },
                { label: '<', value: '<' },
              ]}
              style="width: 150px"
            />
          </NFormItem>
          <NInput
            value={row.maxAllowTemp}
            onUpdateValue={(value) => {
              row.maxAllowTemp = value
            }}
            placeholder="请输入"
          />
        </div>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        最低允许温度
      </span>
    ),
    key: 'minAllowTemp',
    align: 'center',
    width: 300,
    render: (row, index) => (
      <NFormItem
        path={`shipTableData[${index}].minAllowTemp`}
        rule={{
          required: true,
          message: '请输入最低允许温度',
          trigger: ['blur', 'input'],
        }}
      >
        <div class="flex items-center gap-2">
          <NFormItem
            path={`shipTableData[${index}].minAllowTempType`}
            rule={{
              required: true,
              message: '请选择条件',
              trigger: ['blur', 'change'],
            }}
          >
            <NSelect
              value={row.minAllowTempType}
              onUpdateValue={(value) => {
                row.minAllowTempType = value
              }}
              options={[
                { label: '≥', value: '≥' },
                { label: '>', value: '>' },
              ]}
              style="width: 150px"
            />
          </NFormItem>
          <NInput
            value={row.minAllowTemp}
            onUpdateValue={(value) => {
              row.minAllowTemp = value
            }}
            placeholder="请输入"
          />
        </div>
      </NFormItem>
    ),
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        允许时间
      </span>
    ),
    key: 'allowTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`shipTableData[${index}].allowTime`}
        rule={{
          required: true,
          message: '请输入允许时间',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.allowTime}
          onUpdateValue={(value) => {
            row.allowTime = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <span>
        <span style="color: red">*</span>
        允许时间单位
      </span>
    ),
    key: 'allowTimeUnit',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`shipTableData[${index}].allowTimeUnit`}
        rule={{
          required: true,
          message: '请选择允许时间单位',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.allowTimeUnit}
          onUpdateValue={(value) => {
            row.allowTimeUnit = value
          }}
          options={[
            { label: '小时', value: '小时' },
            { label: '天', value: '天' },
            { label: '周', value: '周' },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: '操作',
    align: 'center',
    width: 100,
    key: 'action',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() => formData.value.shipTableData.splice(index, 1)}
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
    key: 'shipContainer',
    label: '出货包装容器',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        {
          label: '槽车',
          value: '槽车',
        },
        {
          label: '桶',
          value: '桶',
        },
        {
          label: '钢瓶',
          value: '钢瓶',
        },
        {
          label: '包装容器',
          value: '包装容器',
        },
        {
          label: '盒',
          value: '盒',
        },
        {
          label: '其它',
          value: '其它',
        },
      ],
    },
    listenChange: true,
    span: '3 m:3 l:3',
  },
  {
    key: 'shipTableData',
    label: '',
    type: 'table',
    dataKey: 'shipTableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.shipTableData),
      columns: !props.readonly
        ? columns
        : columns.filter((item) => item.key !== 'action'),
      rowKey: (row) => row.id, // 表格行主键
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
  {
    key: 'avoidLight',
    label: '避免光照',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入避免光照',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入避免光照',
      clearable: true,
      type: 'text',
    },
    divider: {
      title: '其它',
      'title-placement': 'left',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'transportTemp',
    label: '运输温度要求',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入运输温度要求',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入运输温度要求',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'valveVacuum',
    label: '阀门真空包装',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入阀门真空包装',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入阀门真空包装',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'other',
    label: '其它',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入其它',
        trigger: ['blur', 'input'],
      },
    ],
    props: {
      placeholder: '请输入其它',
      clearable: true,
      type: 'text',
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
])

const handleAddRow = () => {
  formData.value.shipTableData.push({
    id: Date.now(),
    tempUpperLimit: formData.value.shipTableData[0]?.tempUpperLimit || '',
    tempLowerLimit: formData.value.shipTableData[0]?.tempLowerLimit || '',
    tempUnit: formData.value.shipTableData[0]?.tempUnit || null,
    maxAllowTempType: '≤',
    maxAllowTemp: '',
    minAllowTempType: '≥',
    minAllowTemp: '',
    allowTime: '',
    allowTimeUnit: null,
  })
}

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
