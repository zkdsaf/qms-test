<template>
  <n-card class="h-full">
    <CustomTable
      :columns="columnDefinitions"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      :filterValues="filterValues"
      :row-key="(row) => row.applySn"
      @update:sorter="updateSorter"
      @update:filters="updateFilters"
      :scroll-x="1200"
    >
    </CustomTable>
  </n-card>
</template>

<script setup lang="jsx">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessage } from 'naive-ui'
import CustomTable from '@/components/CustomTable.vue'
import { UserOutlined } from '@vicons/antd'

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

const lookFormDetail = (applySn) => {
  const currentSystem = authStore.systemName.toLowerCase()
  const formPath = `/pages/${currentSystem}/form`
  router.push({
    path: formPath,
    query: {
      id: applySn,
    },
  })
}

const columnDefinitions = [
  {
    title: '流程',
    key: 'process',
    align: 'center',
    width: 100,
    render: (row) => {
      return (
        <n-popover trigger="hover" placement="right">
          {{
            trigger: () => (
              <n-icon size="26" class="text-blue-400 cursor-pointer">
                <UserOutlined></UserOutlined>
              </n-icon>
            ),
            default: () => (
              <n-card
                title="当前单据信息"
                header-style={{ fontSize: '14px' }}
                size="small"
                border
              >
                <div class="flex">
                  <div class="text-blue-500">当前节点：</div>
                  <div>审批规格书:SQE签核</div>
                </div>
                <div class="flex">
                  <div class="text-blue-500">处理人：</div>
                  <div>管理员(admin)</div>
                </div>
              </n-card>
            ),
          }}
        </n-popover>
      )
    },
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
    filterOptions: [
      { label: '流程中', value: '流程中' },
      { label: '已完成', value: '已完成' },
      { label: '已拒绝', value: '已拒绝' },
    ],
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
  status: Math.floor(Math.random() * 1000000) % 2 === 0 ? '流程中' : '已完成',
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
