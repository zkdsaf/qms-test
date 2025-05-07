<template>
  <n-card class="h-full">
    <CustomTable
      :columns="columnDefinitions"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      :filterValues="filterValues"
      :row-key="(row) => row.applySn"
      :checked-row-keys="checkedRowKeys"
      @update:sorter="updateSorter"
      @update:filters="updateFilters"
      @update:checked-row-keys="handleCheck"
    >
    </CustomTable>
  </n-card>
</template>

<script setup lang="jsx">
import { ref, reactive, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

import { useRouter } from 'vue-router'
import CustomTable from '@/components/CustomTable.vue'

const message = useMessage()
const router = useRouter()
const authStore = useAuthStore()

const mockFetchData = ({ search, sortKey, sortOrder }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = mockData.filter((item) =>
        Object.entries(search).every(([key, value]) => {
          if (!value) return true
          return item[key]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        })
      )
      if (sortKey && sortOrder) {
        filteredData.sort((a, b) => {
          const valueA = a[sortKey]
          const valueB = b[sortKey]
          if (sortKey === 'applyTime' || sortKey === 'arriveTime') {
            return sortOrder === 'ascend'
              ? new Date(valueA) - new Date(valueB)
              : new Date(valueB) - new Date(valueA)
          }
          return sortOrder === 'ascend'
            ? valueA > valueB
              ? 1
              : -1
            : valueA < valueB
            ? 1
            : -1
        })
      }
      resolve({ data: filteredData })
    }, 500)
  })
}

const tableData = ref([])
const loading = ref(false)
const checkedRowKeys = ref([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  itemCount: 0,
  onChange: (page) => {
    pagination.page = page
    fetchData()
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    fetchData()
  },
})
const filterValues = reactive({
  applySn: null,
  subject: null,
  applyUser: null,
  applyTime: null,
  status: null,
  arriveTime: null,
  todoWaitTime: null,
})
const sorterState = reactive({
  sortKey: '',
  sortOrder: '',
})

const fetchData = async () => {
  loading.value = true
  try {
    const response = await mockFetchData({
      search: filterValues,
      sortKey: sorterState.sortKey,
      sortOrder: sorterState.sortOrder,
    })
    tableData.value = response.data
    pagination.itemCount = response.data.length
  } catch (error) {
    message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const updateSorter = ({ sortKey, sortOrder }) => {
  sorterState.sortKey = sortKey
  sorterState.sortOrder = sortOrder
  fetchData()
}

const updateFilters = (filters) => {
  Object.assign(filterValues, filters)
  fetchData()
}

const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys
}

const lookFormDetail = (applySn) => {
  const currentSystem = authStore.systemName.toLowerCase()
  const formPath = `/pages/${currentSystem}/form`
  router.push({
    path: formPath,
    query: {
      id: null,
    },
  })
}

const columnDefinitions = [
  {
    type: 'selection',
    sortable: false,
    filterable: false,
  },
  {
    title: '序号',
    key: 'no',
    sortable: false,
    filterable: false,
    render: (row, rowIndex) => rowIndex + 1,
    align: 'center',
  },
  {
    title: '申请单编号',
    key: 'applySn',
    align: 'center',
    render: (row) => {
      return (
        <div
          class="flex items-center justify-center text-blue-400 cursor-pointer"
          onClick={() => lookFormDetail(row.applySn)}
        >
          {row.applySn}
        </div>
      )
    },
  },
  { title: '主题', key: 'subject', align: 'center' },
  { title: '申请人', key: 'applyUser', align: 'center' },
  { title: '申请时间', key: 'applyTime', align: 'center' },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    sortable: false,
    filterable: false,
  },
  { title: '到达时间', key: 'arriveTime', align: 'center' },
  { title: '待办等待时间', key: 'todoWaitTime', align: 'center' },
]

// 模拟后端数据
const mockData = Array.from({ length: 50 }).map((_, index) => ({
  applySn: Math.floor(Math.random() * 1000000),
  subject: '申请测试',
  applyUser: 'admin',
  applyTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  status: '草稿箱',
  arriveTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  todoWaitTime: Math.floor(Math.random() * 100) + '分钟',
}))

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
