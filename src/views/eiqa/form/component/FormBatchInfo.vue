<template>
  <n-form ref="formRef" :model="formData">
    <n-data-table
      :columns="columns"
      :data="formData.tableData"
      :bordered="true"
      :single-line="false"
      default-expand-all
      class="shadow-md rounded-lg"
    />
    <div class="mt-4 flex justify-end">
      <n-button type="primary" @Click="validateForm">提交</n-button>
    </div>
  </n-form>
</template>

<script setup lang="jsx">
import { useMessage } from 'naive-ui'
const message = useMessage()
const formRef = ref(null)

// 响应式表单数据
const formData = ref({
  tableData: [
    {
      batchNo: '',
      supplierBatchNo: '',
      pendingQuantity: '',
      remainingQuantity: '',
      unit: '',
      productionDate: null,
      expiryDate: null,
      arrivalDate: null,
      checkInDate: null,
      tankNo: '',
      ecoaNo: '',
      ecoaStatus: '',
      subTableData: [
        {
          primaryInspection: '',
          avl: '',
          expiryDate: null,
          remainingExpiryDays: null,
          coaCheck: '',
          transportTemperature: '',
          cylinderNo: '',
          tankNo: '',
          remarks: '',
          inspectionResult: '',
          initiateIqndOow: '',
          conclusion: '',
          qualifiedQuantity: null,
          concessionalQuantity: null,
          returnQuantity: null,
          scrapQuantity: null,
          postedQuantity: null,
          parentIndex: null,
        },
      ],
    },
  ],
})

// 选项定义
const ecoaStatusOptions = [
  { label: '待处理', value: 'pending' },
  { label: '已处理', value: 'processed' },
  { label: '已取消', value: 'cancelled' },
]

const yesNoOptions = [
  { label: '是', value: 'yes' },
  { label: '否', value: 'no' },
]

const coaCheckOptions = [
  { label: '通过', value: 'pass' },
  { label: '未通过', value: 'fail' },
]

const inspectionResultOptions = [
  { label: '合格', value: 'qualified' },
  { label: '不合格', value: 'unqualified' },
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
    render: (row, subIndex) => {
      return (
        <NFormItem
          path={`tableData[${row.parentIndex}].subTableData[${subIndex}].primaryInspection`}
          rule={{
            required: true,
            message: '请选择是否进行一次质检',
            trigger: ['blur', 'change'],
          }}
        >
          <NSelect
            value={row.primaryInspection}
            onUpdateValue={(value) => {
              row.primaryInspection = value
            }}
            options={yesNoOptions}
            placeholder="请选择"
            clearable
          />
        </NFormItem>
      )
    },
  },
  {
    title: 'AVL',
    key: 'avl',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].avl`}
        rule={{
          required: true,
          message: '请输入AVL',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.avl}
          onUpdateValue={(value) => {
            row.avl = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '有效期',
    key: 'expiryDate',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].expiryDate`}
        rule={{
          required: true,
          message: '请选择有效期',
          trigger: ['blur', 'change'],
        }}
      >
        <NDatePicker
          value={row.expiryDate}
          onUpdateValue={(value) => {
            row.expiryDate = value
          }}
          type="date"
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '到厂/到岗剩余有效期',
    key: 'remainingExpiryDays',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].remainingExpiryDays`}
        rule={{
          required: true,
          message: '请输入剩余有效期（天）',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.remainingExpiryDays}
          onUpdateValue={(value) => {
            row.remainingExpiryDays = value
          }}
          placeholder="请输入"
          clearable
          min={0}
        />
      </NFormItem>
    ),
  },
  {
    title: '规格文件检查(COA检验)',
    key: 'coaCheck',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].coaCheck`}
        rule={{
          required: true,
          message: '请选择COA检验结果',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.coaCheck}
          onUpdateValue={(value) => {
            row.coaCheck = value
          }}
          options={coaCheckOptions}
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '运输温度',
    key: 'transportTemperature',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].transportTemperature`}
        rule={{
          required: true,
          message: '请输入运输温度（℃）',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.transportTemperature}
          onUpdateValue={(value) => {
            row.transportTemperature = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '钢瓶号',
    key: 'cylinderNo',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].cylinderNo`}
        rule={{
          required: true,
          message: '请输入钢瓶号',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.cylinderNo}
          onUpdateValue={(value) => {
            row.cylinderNo = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '槽车号',
    key: 'tankNo',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].tankNo`}
        rule={{
          required: true,
          message: '请输入槽车号',
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
    title: '其他',
    key: 'remarks',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].remarks`}
      >
        <NInput
          type="textarea"
          value={row.remarks}
          onUpdateValue={(value) => {
            row.remarks = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '检验结果',
    key: 'inspectionResult',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].inspectionResult`}
        rule={{
          required: true,
          message: '请选择检验结果',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.inspectionResult}
          onUpdateValue={(value) => {
            row.inspectionResult = value
          }}
          options={inspectionResultOptions}
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '是否发起IQND/OOW',
    key: 'initiateIqndOow',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].initiateIqndOow`}
        rule={{
          required: true,
          message: '请选择是否发起IQND/OOW',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.initiateIqndOow}
          onUpdateValue={(value) => {
            row.initiateIqndOow = value
          }}
          options={yesNoOptions}
          placeholder="请选择"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '结论',
    key: 'conclusion',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].conclusion`}
        rule={{
          required: true,
          message: '请选择结论',
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
    key: 'qualifiedQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].qualifiedQuantity`}
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
    key: 'concessionalQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].concessionalQuantity`}
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
    key: 'returnQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].returnQuantity`}
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
    key: 'scrapQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].scrapQuantity`}
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
    key: 'postedQuantity',
    render: (row, subIndex) => (
      <NFormItem
        path={`tableData[${row.parentIndex}].subTableData[${subIndex}].postedQuantity`}
        rule={{
          required: true,
          message: '请输入已过账数量',
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
      return (
        <NDataTable
          columns={subColumns}
          data={rowData.subTableData}
          bordered
          singleLine={false}
          class="bg-white"
          scroll-x="3000"
        />
      )
    },
  },
  {
    title: '入库批次',
    key: 'batchNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].batchNo`}
        rule={{
          required: true,
          message: '请输入入库批次',
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
    key: 'supplierBatchNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].supplierBatchNo`}
        rule={{
          required: true,
          message: '请输入供应商批次号',
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
    key: 'pendingQuantity',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].pendingQuantity`}
        rule={{
          required: true,
          message: '请输入待检数量',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.pendingQuantity}
          onUpdateValue={(value) => {
            row.pendingQuantity = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '剩余待检数量',
    key: 'remainingQuantity',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].remainingQuantity`}
        rule={{
          required: true,
          message: '请输入剩余待检数量',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.remainingQuantity}
          onUpdateValue={(value) => {
            row.remainingQuantity = value
          }}
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '单位',
    key: 'unit',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].unit`}
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
          placeholder="请输入"
          clearable
        />
      </NFormItem>
    ),
  },
  {
    title: '生产日期',
    key: 'productionDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].productionDate`}
        rule={{
          required: true,
          message: '请选择生产日期',
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
    title: '有效日期',
    key: 'expiryDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].expiryDate`}
        rule={{
          required: true,
          message: '请选择有效日期',
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
    title: '到料日期',
    key: 'arrivalDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].arrivalDate`}
        rule={{
          required: true,
          message: '请选择到料日期',
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
    key: 'checkInDate',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].checkInDate`}
        rule={{
          required: true,
          message: '请选择到岗日期',
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
    key: 'tankNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].tankNo`}
        rule={{
          required: true,
          message: '请输入槽车/钢瓶号',
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
    key: 'ecoaNo',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].ecoaNo`}
        rule={{
          required: true,
          message: '请输入ECOA编号',
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
    title: 'ECOA状态',
    key: 'ecoaStatus',
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].ecoaStatus`}
        rule={{
          required: true,
          message: '请选择ECOA状态',
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
