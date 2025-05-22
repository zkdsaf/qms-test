<template>
  <CustomTable
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :filterValues="filterValues"
    :row-key="(row) => row.materialNumber"
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

const columns = [
  {
    type: 'selection',
    sortable: false,
    filterable: false,
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
    title: '物料类型',
    key: 'materialType',
    width: 180,
    align: 'center',
  },
  {
    title: '物料号',
    key: 'materialNumber',
    width: 180,
    align: 'center',
  },
  {
    title: '物料名称',
    key: 'materialName',
    width: 200,
    align: 'center',
  },
  {
    title: '物料描述',
    key: 'materialDescription',
    width: 300,
    align: 'center',
  },
]

// 模拟数据生成
function generateRandomData(count = 15) {
  const types = ['类型1', '类型2']
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    materialType: types[Math.floor(Math.random() * types.length)],
    materialNumber: `MN${(i + 1).toString().padStart(3, '0')}`,
    materialName: `物料${i + 1}`,
    materialDescription: `描述${i + 1}`,
  }))
}

// 数据初始化
const originalData = ref(generateRandomData(20)) // 原始数据
const data = ref([...originalData.value]) // 显示数据（可过滤）

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
  specNumber: null,
  materialType: null,
  materialNumber: null,
  scope: null,
  version: null,
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
