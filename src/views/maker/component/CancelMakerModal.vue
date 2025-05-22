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
  />
</template>

<script setup lang="jsx">
import { ref, reactive } from 'vue'
import CustomTable from '@/components/CustomTable.vue'

const formRef = ref(null) // 定义 formRef 在 script setup 中

const columns = [
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
    title: '供应商编号',
    key: 'supplierNumber',
    width: 180,
    align: 'center',
  },
  {
    title: '供应商名称',
    key: 'supplierName',
    width: 180,
    align: 'center',
  },
  {
    title: '版本',
    key: 'version',
    width: 120,
    align: 'center',
    sortable: false,
    filterable: false,
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    sortable: false,
    filterable: false,
    align: 'center',
    render: (row) => (
      <div>
        <n-popover
          trigger="click"
          placement="left"
          show={row.showPopover}
          onUpdateShow={(show) => {
            row.showPopover = show
          }}
        >
          {{
            trigger: () => (
              <n-button
                onClick={() => handleCancel(row)}
                type="error"
                size="small"
              >
                废除
              </n-button>
            ),
            default: () => (
              <div>
                <n-form
                  ref={formRef} // 绑定 formRef
                  model={row}
                  rules={{
                    cancelReason: {
                      required: true,
                      message: '请输入废除原因',
                      trigger: ['blur', 'input'],
                    },
                  }}
                >
                  <n-form-item path="cancelReason">
                    <n-input
                      type="textarea"
                      placeholder="请输入废除原因"
                      value={row.cancelReason}
                      onUpdateValue={(value) => {
                        row.cancelReason = value
                      }}
                      style="width: 300px"
                    />
                  </n-form-item>
                </n-form>
                <n-space justify="end">
                  <n-button
                    onClick={() => (row.showPopover = false)}
                    size="small"
                    style="margin-top: 10px;"
                  >
                    取消
                  </n-button>

                  <n-button
                    onClick={() => handleSubmitCancel(row)}
                    type="primary"
                    size="small"
                    style="margin-top: 10px;"
                  >
                    提交
                  </n-button>
                </n-space>
              </div>
            ),
          }}
        </n-popover>
      </div>
    ),
  },
]

// 模拟数据生成
function generateRandomData(count = 15) {
  const types = ['类型1', '类型2']
  const versions = ['V1.0', 'V1.1', 'V2.0']

  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    materialType: types[Math.floor(Math.random() * types.length)],
    makerCode: `MC${(i + 1).toString().padStart(3, '0')}`,
    supplierNumber: `S${(i + 1).toString().padStart(3, '0')}`,
    supplierName: `供应商${i + 1}`,
    version: versions[Math.floor(Math.random() * versions.length)],
    cancelReason: '', // 初始化 cancelReason
    showPopover: false, // 初始化 showPopover
  }))
}

// 数据初始化
const originalData = ref(generateRandomData(20))
const data = ref([...originalData.value])

// 分页
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
  materialType: null,
  makerCode: null,
  supplierNumber: null,
  supplierName: null,
  version: null,
})

// 排序状态
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

// 废除处理
const handleCancel = (row) => {
  row.showPopover = true
}

const handleSubmitCancel = async (row) => {
  if (!formRef.value) {
    console.error('formRef is null, cannot validate')
    return
  }

  try {
    await formRef.value.validate() // 执行表单校验
    // 校验通过，删除当前行数据
    const index = data.value.findIndex(
      (item) => item.makerCode === row.makerCode
    )
    if (index !== -1) {
      data.value.splice(index, 1)
    }
    row.showPopover = false
    message.success('废除成功')
  } catch (errors) {
    console.log('Validation failed:', errors)
  }
}

defineExpose({
  getSelectedRows: () => checkedRowKeys.value,
})
</script>
