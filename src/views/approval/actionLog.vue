<template>
  <n-card class="h-full">
    <n-data-table
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      :row-key="(row) => row.id"
      striped
      @update:sorter="handleSorter"
      @update:filters="handleFilters"
    />
  </n-card>
</template>

<script setup lang="jsx">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { NDataTable, NInput, NButton, NPopconfirm } from 'naive-ui'
import { UserOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
const message = useMessage()
// 模拟后端数据
const mockData = Array.from({ length: 50 }).map((_, index) => ({
  applySn: Math.floor(Math.random() * 1000000),
  subject: '申请测试',
  applyUser: 'admin',
  applyTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  status: '流程中',
  arriveTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  todoWaitTime: Math.floor(Math.random() * 100) + '分钟',
}))

// 模拟后端请求函数
const mockFetchData = ({ page, pageSize, search, sortKey, sortOrder }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 过滤数据（搜索）
      let filteredData = mockData
      Object.keys(search).forEach((key) => {
        if (search[key]) {
          filteredData = filteredData.filter((item) =>
            item[key]
              .toString()
              .toLowerCase()
              .includes(search[key].toLowerCase())
          )
        }
      })

      // 排序数据
      let sortedData = [...filteredData]
      if (sortKey && sortOrder) {
        sortedData.sort((a, b) => {
          const valueA = a[sortKey]
          const valueB = b[sortKey]
          if (sortOrder === 'ascend') {
            return valueA > valueB ? 1 : -1
          } else if (sortOrder === 'descend') {
            return valueA < valueB ? 1 : -1
          }
          return 0
        })
      }

      resolve({
        data: sortedData,
      })
    }, 500)
  })
}
const router = useRouter()
const authStore = useAuthStore()

// 表格数据
const tableData = ref([])
// 加载状态
const loading = ref(false)
// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 40, 50],
  itemCount: 0,
  onChange: (page) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

// 筛选状态（用于后端请求）
const searchState = reactive({
  id: '',
  name: '',
  age: '',
  email: '',
  city: '',
})

// 筛选值（用于 filterOptionValue）
const filterValues = reactive({
  id: null,
  name: null,
  age: null,
  email: null,
  city: null,
})

// 获取表格数据
const fetchData = async () => {
  loading.value = true
  try {
    const response = await mockFetchData({
      search: searchState,
      sortKey: sorterState.sortKey,
      sortOrder: sorterState.sortOrder,
    })
    tableData.value = response.data
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 处理排序
const sorterState = reactive({
  sortKey: '',
  sortOrder: '',
})

const handleSorter = ({ columnKey, order }) => {
  sorterState.sortKey = order ? columnKey : ''
  sorterState.sortOrder = order
  fetchData()
}

// 处理筛选
const handleFilters = (filters) => {
  // 更新筛选状态
  Object.keys(filterValues).forEach((key) => {
    filterValues[key] = filters[key] || null
    searchState[key] = filters[key] || ''
  })

  pagination.page = 1 // 重置到第一页
  fetchData()
}

// 通用 renderFilterMenu
const createFilterMenu =
  (key, placeholder) =>
  ({ hide }) =>
    (
      <div style={{ padding: '8px', minWidth: '150px' }}>
        <NInput
          value={filterValues[key]}
          placeholder={placeholder}
          clearable
          onUpdateValue={(value) => {
            filterValues[key] = value || null
            handleFilters({ ...filterValues, [key]: value || null })
          }}
        />
        <NPopconfirm onPositiveClick={() => hide()}>
          {{
            default: () => '关闭筛选',
            trigger: () => (
              <NButton size="small" style={{ marginTop: '8px', width: '100%' }}>
                关闭
              </NButton>
            ),
          }}
        </NPopconfirm>
      </div>
    )

// 通用列生成函数
const createColumn = ({
  title,
  key,
  sortable = true,
  filterable = true,
  placeholder,
  ...props
}) => ({
  title,
  key,
  sorter: sortable ? true : false,
  filter: filterable,
  filterOptionValue: filterValues[key], // 直接绑定
  renderFilterMenu: filterable
    ? createFilterMenu(key, placeholder || `搜索 ${title}`)
    : undefined,
  ...props,
})

// 列定义（可动态扩展）
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
    align: 'center',
    render: (row, rowIndex) => rowIndex + 1,
    width: 80,
    sortable: false,
    filterable: false,
  },
  {
    title: '申请单编号',
    key: 'applySn',
    align: 'center',
    render: (row) => {
      return <div class="flex items-center justify-center">{row.applySn}</div>
    },
  },
  {
    title: '主题',
    key: 'subject',
    align: 'center',
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '申请人',
    key: 'applyUser',
    align: 'center',
  },
  {
    title: '申请时间',
    key: 'applyTime',
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
  },
  {
    title: '到达时间',
    key: 'arriveTime',
    align: 'center',
  },
  {
    title: '待办等待时间',
    key: 'todoWaitTime',
    align: 'center',
  },
]

// 生成列
const columns = computed(() => columnDefinitions.map(createColumn))

// 组件挂载时加载数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
