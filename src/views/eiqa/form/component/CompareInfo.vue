<template>
  <n-space class="w-full pb-4" vertical>
    <n-divider title-placement="left">AVL</n-divider>
    <n-data-table :columns="avlColumns" :data="getData('avl')" />

    <n-divider title-placement="left">有效期</n-divider>
    <n-space justify="space-between">
      <n-form-item label="SPEC有效期(月)" label-placement="left">
        24
      </n-form-item>
      <n-form-item label="有效期标准区间(天)" label-placement="left">
        20
      </n-form-item>
    </n-space>
    <n-data-table :columns="validityColumns" :data="getData('validity')" />

    <n-divider title-placement="left">到厂/到港剩余有效期</n-divider>
    <n-space justify="space-between">
      <n-form-item label="SPEC剩余有效期(月)" label-placement="left">
        18
      </n-form-item>
      <n-form-item label="剩余有效期标准(天)" label-placement="left">
        540
      </n-form-item>
    </n-space>
    <n-data-table :columns="arrivalColumns" :data="getData('arrival')" />

    <n-divider title-placement="left">槽车号</n-divider>
    <n-data-table :columns="tankColumns" :data="getData('tank')" />
  </n-space>
</template>

<script setup>
const data = [
  {
    param: '发动机转速',
    sap: '1000',
    avl: '1000',
    coa: '1000',
    result: 'Pass',
    type: 'avl',
  },
  // 有效期数据示例
  {
    param: '有效期',
    sap: '2024-12-31',
    coa: '2024-12-31',
    result: 'Fail',
    type: 'validity',
  },
  // 到厂/到港剩余有效期数据示例
  {
    param: '剩余有效期',
    sap: '30天',
    coa: '30天',
    result: 'Pass',
    type: 'arrival',
  },
  // 槽车号数据示例
  {
    param: '槽车号',
    sap: 'T001',
    avl: 'T001',
    result: 'Fail',
    type: 'tank',
  },
]

// 获取数据的函数
const getData = (type) => {
  return data.filter((item) => item.type === type)
}

// 渲染检验结果的函数
const renderResult = (row) => {
  return h(
    'span',
    {
      style: {
        color: row.result === 'Fail' ? 'red' : 'inherit',
      },
    },
    row.result
  )
}

// AVL表格列定义
const avlColumns = [
  {
    title: '数据对比',
    key: 'param',
    align: 'center',
  },
  {
    title: 'SAP',
    key: 'sap',
    align: 'center',
  },
  {
    title: 'AVL系统',
    key: 'avl',
    align: 'center',
  },
  {
    title: 'ECOA系统',
    key: 'coa',
    align: 'center',
  },
  {
    title: '检验结果',
    key: 'result',
    align: 'center',
    render: renderResult,
  },
]

// 有效期表格列定义
const validityColumns = [
  {
    title: '数据对比',
    key: 'param',
    align: 'center',
  },
  {
    title: 'SAP',
    key: 'sap',
    align: 'center',
  },
  {
    title: 'ECOA系统',
    key: 'coa',
    align: 'center',
  },
  {
    title: '检验结果',
    key: 'result',
    align: 'center',
    render: renderResult,
  },
]

// 到厂/到港剩余有效期表格列定义
const arrivalColumns = [
  {
    title: '数据对比',
    key: 'param',
    align: 'center',
  },
  {
    title: 'SAP',
    key: 'sap',
    align: 'center',
  },
  {
    title: 'ECOA系统',
    key: 'coa',
    align: 'center',
  },
  {
    title: '检验结果',
    key: 'result',
    align: 'center',
    render: renderResult,
  },
]

// 槽车号表格列定义
const tankColumns = [
  {
    title: '数据对比',
    key: 'param',
    align: 'center',
  },
  {
    title: 'SAP',
    key: 'sap',
    align: 'center',
  },
  {
    title: 'AVL系统',
    key: 'avl',
    align: 'center',
  },
  {
    title: '检验结果',
    key: 'result',
    align: 'center',
    render: renderResult,
  },
]
</script>

<style lang="scss" scoped></style>
