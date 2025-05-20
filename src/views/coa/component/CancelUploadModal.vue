<template>
  <CustomTable
    :columns="columns"
    :data="data"
    :filterValues="filterValues"
    :pagination="pagination"
    :row-key="(row) => row.applicationNumber"
    :checked-row-keys="checkedRowKeys"
    @update:sorter="updateSorter"
    @update:filters="updateFilters"
    @update:checked-row-keys="handleCheck"
    :max-height="400"
    :scroll-x="1200"
  />
</template>

<script setup>
import CustomTable from '@/components/CustomTable.vue'
import { ref, reactive } from 'vue'

// 模拟数据生成
function generateRandomData(count = 15) {
  const types = ['类型1', '类型2']
  const names = ['物料A', '物料B', '物料C', '物料D']
  const manufacturers = ['生产商A', '生产商B', '生产商C']
  const scopes = ['范围A', '范围B', '范围C']
  const applicants = ['申请人A', '申请人B', '申请人C']

  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    applicationNumber: `APP${(i + 1).toString().padStart(3, '0')}`,
    materialType: types[Math.floor(Math.random() * types.length)],
    materialName: names[Math.floor(Math.random() * names.length)],
    materialNumber: `M${(i + 1).toString().padStart(3, '3')}`,
    manufacturer:
      manufacturers[Math.floor(Math.random() * manufacturers.length)],
    scope: scopes[Math.floor(Math.random() * scopes.length)],
    applicant: applicants[Math.floor(Math.random() * applicants.length)],
  }))
}

// 数据初始化
const originalData = ref(generateRandomData(20)) // 原始数据
const data = ref([...originalData.value]) // 显示数据（可过滤）

// 列定义
const columns = [
  {
    type: 'selection',
    sortable: false,
    filterable: false,
    multiple: false,
  },
  {
    title: '序号',
    key: 'index',
    width: 80,
    align: 'center',
    sortable: false,
    filterable: false,
  },
  {
    title: '申请单编号',
    key: 'applicationNumber',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '物料类型',
    key: 'materialType',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '物料名称',
    key: 'materialName',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '料号',
    key: 'materialNumber',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '生产商名称',
    key: 'manufacturer',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '适用范围',
    key: 'scope',
    width: 150,
    align: 'center',
    filterable: true,
  },
  {
    title: '申请人',
    key: 'applicant',
    width: 100,
    align: 'center',
    filterable: false,
    sortable: false,
  },
]

// 分页（可选）
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  itemCount: originalData.value.length,
  onChange: (page) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

// 过滤条件
const filterValues = reactive({
  applicationNumber: null,
  materialType: null,
  materialName: null,
  materialNumber: null,
  manufacturer: null,
  scope: null,
  applicant: null,
})

// 排序状态（可扩展）
const sorterState = reactive({
  sortKey: null,
  sortOrder: null,
})

const updateSorter = ({ sortKey, sortOrder }) => {
  sorterState.sortKey = sortKey
  sorterState.sortOrder = sortOrder
}

const updateFilters = (filters) => {
  Object.assign(filterValues, filters)
  data.value = originalData.value.filter((row) => {
    return Object.entries(filterValues).every(([key, value]) => {
      if (!value) return true
      return String(row[key]).includes(String(value))
    })
  })
}

// 选中行处理
const checkedRowKeys = ref([])
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys
}

defineExpose({
  getSelectedRows: () => checkedRowKeys.value,
})
</script>
