<template>
  <CustomTable
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :filterValues="filterValues"
    :row-key="(row) => row.makerCode"
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
    title: '物料类型',
    key: 'materialType',
    width: 180,
    align: 'center',
  },
  {
    title: 'MakerCode',
    key: 'makerCode',
    width: 180,
    align: 'center',
  },
  {
    title: '证书类型',
    key: 'certType',
    width: 150,
    align: 'center',
  },
  {
    title: '版本',
    key: 'version',
    width: 120,
    align: 'center',
  },
  {
    title: '供应商编号',
    key: 'supplierCode',
    width: 150,
    align: 'center',
  },
  {
    title: '供应商名称',
    key: 'supplierName',
    width: 200,
    align: 'center',
  },
  {
    title: '生产商名称',
    key: 'manufacturerName',
    width: 200,
    align: 'center',
  },
  {
    title: '详细地址',
    key: 'address',
    width: 300,
    align: 'center',
  },
]

// 模拟数据生成
function generateRandomData(count = 15) {
  const types = ['类型1', '类型2']
  const certTypes = ['证书A', '证书B', '证书C']
  const versions = ['V1.0', 'V1.1', 'V2.0']

  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    materialType: types[Math.floor(Math.random() * types.length)],
    makerCode: `MC${(i + 1).toString().padStart(3, '0')}`,
    certType: certTypes[Math.floor(Math.random() * certTypes.length)],
    version: versions[Math.floor(Math.random() * versions.length)],
    supplierCode: `S${(i + 1).toString().padStart(3, '0')}`,
    supplierName: `供应商${i + 1}`,
    manufacturerName: `生产商${i + 1}`,
    address: `地址${i + 1}号`,
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
