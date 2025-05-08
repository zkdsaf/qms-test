<template>
  <n-form ref="formRef" :model="formData" :disabled="readonly" label-placement="left" label-width="auto">
    <n-data-table :columns="columns" :data="formData.tableData" :bordered="true" :single-line="false" default-expand-all class="shadow-md rounded-lg" />
  </n-form>
</template>

<script setup lang="jsx">
import { RefreshSharp } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
const message = useMessage()
const formRef = ref(null)

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

// 响应式表单数据
const formData = ref({
  tableData: [
    {
      batchNo: 'BATCH001',
      supplierBatchNo: 'SUP001',
      pendingQuantity: 100,
      remainingQuantity: 100,
      unit: '个',
      productionDate: Date.now(),
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      arrivalDate: Date.now(),
      checkInDate: Date.now(),
      tankNo: 'TANK001',
      ecoaNo: 'ECOA001',
      ecoaStatus: 'pending',
      subTableData: [
        {
          primaryInspection: 'Y',
          avl: 'Y',
          expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
          remainingExpiryDays: 30,
          coaCheck: 'Y',
          transportTemperature: 25,
          cylinderNo: 'CYL001',
          tankNo: 'TANK001',
          remarks: '正常',
          inspectionResult: 'Y',
          initiateIqndOow: 'IQND',
          conclusion: 'qualified',
          qualifiedQuantity: 100,
          concessionalQuantity: 0,
          returnQuantity: 0,
          scrapQuantity: 0,
          postedQuantity: 0,
          parentIndex: 0,
        },
      ],
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

// 选项定义
const ecoaStatusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '已处理', value: 'processed' },
  { label: '已取消', value: 'cancelled' },
]

const initiateIqndOowOptions = [
  { label: 'IQND', value: 'IQND' },
  { label: 'OOW', value: 'OOW' },
]

const conclusionOptions = [
  { label: '合格', value: 'qualified' },
  { label: '让步接收', value: 'concessional' },
  { label: '退货', value: 'return' },
  { label: '报废', value: 'scrap' },
]

// 子表格列定义
const subColumns = [
  {
    title: '一次质检',
    key: 'primaryInspection',
    align: 'center',
    width: 90,
    render: (row, subIndex) => {
      return (
        <NIcon
          class="cursor-pointer text-blue-600"
          size={30}
          component={RefreshSharp}
          onClick={() => {
            // 刷新逻辑
            message.success('刷新成功')
          }}
        />
      )
    },
  },
  {
    title: 'AVL',
    align: 'center',
    key: 'avl',
    width: 60,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '有效期',
    align: 'center',
    key: 'expiryDate',
    width: 70,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '到厂/到岗剩余有效期',
    align: 'center',
    key: 'remainingExpiryDays',
    width: 160,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '规格文件检查(COA检验)',
    align: 'center',
    key: 'coaCheck',
    width: 180,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '运输温度',
    align: 'center',
    key: 'transportTemperature',
    width: 90,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '钢瓶号',
    align: 'center',
    key: 'cylinderNo',
    width: 90,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '槽车号',
    align: 'center',
    key: 'tankNo',
    width: 90,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '其他',
    align: 'center',
    key: 'remarks',
    width: 60,
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    title: '检验结果',
    width: 90,
    align: 'center',
    key: 'inspectionResult',
    render: (row, subIndex) => (
      <div class="flex justify-center">
        <NTag class="text-center" type={row.avl === 'Y' ? 'success' : 'error'}>
          {row.avl === 'Y' ? 'Pass' : 'Fail'}
        </NTag>
      </div>
    ),
  },
  {
    align: 'center',
    title: '是否发起IQND/OOW',
    width: 160,
    key: 'initiateIqndOow',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].initiateIqndOow`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.initiateIqndOow}
          onUpdateValue={(value) => {
            row.initiateIqndOow = value
          }}
          options={initiateIqndOowOptions}
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '结论',
    width: 120,
    align: 'center',
    key: 'conclusion',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].conclusion`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.conclusion}
          onUpdateValue={(value) => {
            row.conclusion = value
          }}
          options={conclusionOptions}
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '合格数量',
    width: 145,
    align: 'center',
    key: 'qualifiedQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].qualifiedQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.qualifiedQuantity}
          onUpdateValue={(value) => {
            row.qualifiedQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '让步接收数量',
    width: 145,
    align: 'center',
    key: 'concessionalQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].concessionalQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.concessionalQuantity}
          onUpdateValue={(value) => {
            row.concessionalQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '退货数量',
    align: 'center',
    width: 145,
    key: 'returnQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].returnQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.returnQuantity}
          onUpdateValue={(value) => {
            row.returnQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '报废数量',
    align: 'center',
    width: 145,
    key: 'scrapQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].scrapQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.scrapQuantity}
          onUpdateValue={(value) => {
            row.scrapQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '已过账数量',
    align: 'center',
    width: 125,
    key: 'postedQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].postedQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.postedQuantity}
          onUpdateValue={(value) => {
            row.postedQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
]

// 主表格列定义
const columns = [
  {
    type: 'expand',
    expandable: () => true,
    renderExpand: (rowData, index) => {
      rowData.subTableData.forEach((subRow) => {
        subRow.parentIndex = index
      })
      return <NDataTable columns={subColumns} data={rowData.subTableData} bordered singleLine={false} class="bg-white" />
    },
  },
  {
    title: '入库批次',
    align: 'center',
    key: 'batchNo',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].batchNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.batchNo}
          onUpdateValue={(value) => {
            row.batchNo = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '供应商批次号',
    align: 'center',
    width: 200,
    key: 'supplierBatchNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].supplierBatchNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.supplierBatchNo}
          onUpdateValue={(value) => {
            row.supplierBatchNo = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '待检数量',
    width: 145,
    align: 'center',
    key: 'pendingQuantity',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].pendingQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.pendingQuantity}
          onUpdateValue={(value) => {
            row.pendingQuantity = value
          }}
          placeholder="请输入"
          min={0}
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '剩余待检数量',
    width: 145,
    align: 'center',
    key: 'remainingQuantity',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].remainingQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.remainingQuantity}
          onUpdateValue={(value) => {
            row.remainingQuantity = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '单位',
    align: 'center',
    width: 125,
    key: 'unit',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].unit`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '生产日期',
    align: 'center',
    width: 145,
    key: 'productionDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].productionDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          value={row.productionDate}
          onUpdateValue={(value) => {
            row.productionDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    width: 145,
    title: '有效日期',
    key: 'expiryDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].expiryDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          value={row.expiryDate}
          onUpdateValue={(value) => {
            row.expiryDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    title: '到料日期',
    width: 145,
    key: 'arrivalDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].arrivalDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          value={row.arrivalDate}
          onUpdateValue={(value) => {
            row.arrivalDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '到岗日期',
    align: 'center',
    width: 145,
    key: 'checkInDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].checkInDate`}
        rule={{
          type: 'number',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          value={row.checkInDate}
          onUpdateValue={(value) => {
            row.checkInDate = value
          }}
          type="date"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '槽车/钢瓶号',
    align: 'center',
    width: 145,
    key: 'tankNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].tankNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.tankNo}
          onUpdateValue={(value) => {
            row.tankNo = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: 'ECOA编号',
    align: 'center',
    width: 145,
    key: 'ecoaNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].ecoaNo`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.ecoaNo}
          onUpdateValue={(value) => {
            row.ecoaNo = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    align: 'center',
    width: 145,
    title: 'ECOA状态',
    key: 'ecoaStatus',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].ecoaStatus`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.ecoaStatus}
          onUpdateValue={(value) => {
            row.ecoaStatus = value
          }}
          options={ecoaStatusOptions}
          clearable
        />
      </NFormItem>
    ),
  },
]

// 表单验证
const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((errors) => {
      if (errors) {
        message.error('表单验证失败')
        resolve(false)
      } else {
        message.success('表单验证成功')
        resolve(true)
      }
    })
  })
}

// 暴露方法给父组件
defineExpose({
  validateForm,
  getTableData: () => formData.value.tableData,
})
</script>

<style scoped></style>
