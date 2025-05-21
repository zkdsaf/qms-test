<template>
  <n-card title="供应商资源池" :bordered="false">
    <n-tabs type="line" animated v-model:value="activeTab">
      <n-tab-pane name="总资源池" tab="总资源池"></n-tab-pane>
      <n-tab-pane name="磐石资源池" tab="磐石资源池"></n-tab-pane>
      <n-tab-pane name="司南资源池" tab="司南资源池"></n-tab-pane>
    </n-tabs>
    <n-tabs type="line" animated v-model:value="childrenTab">
      <n-tab-pane name="供应商资源池" tab="供应商资源池"></n-tab-pane>
      <n-tab-pane name="合格供应商" tab="合格供应商"></n-tab-pane>
      <n-tab-pane name="认证中供应商" tab="认证中供应商"></n-tab-pane>
      <n-tab-pane name="已冻结" tab="已冻结"></n-tab-pane>
      <n-tab-pane name="已作废" tab="已作废"></n-tab-pane>
      <n-tab-pane name="履历" tab="履历"></n-tab-pane>
      <n-tab-pane name="认证失败供应商" tab="认证失败供应商"></n-tab-pane>
    </n-tabs>

    <n-space class="mb-4">
      <n-button color="#18a058" @click="message.info('导出成功')">
        <template #icon>
          <n-icon>
            <CloudDownloadOutline />
          </n-icon>
        </template>
        导出
      </n-button>
      <n-button
        color="#18a058"
        @click="message.info('模版下载成功')"
        v-if="['合格供应商', '认证中供应商'].includes(childrenTab)"
      >
        <template #icon>
          <n-icon>
            <CloudDownloadOutline />
          </n-icon>
        </template>
        模版下载
      </n-button>
      <n-space
        v-if="
          ['合格供应商', '认证中供应商'].includes(childrenTab) &&
          activeTab !== '总资源池'
        "
      >
        <n-button type="info" @click="handleMultiFreeze">多物料冻结</n-button>
        <n-button type="warning" @click="handleMultiDisqualify"
          >多物料取资格</n-button
        >
        <n-button type="error" @click="handleMultiRevise">多物料修订</n-button>
      </n-space>
    </n-space>

    <n-data-table
      :columns="filteredColumns"
      :data="data"
      :bordered="false"
      :row-key="(row) => row.materialCode"
      :checked-row-keys="checkedRowKeys"
      @update:checked-row-keys="handleCheck"
      ref="tableRef"
    />
  </n-card>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import { useMessage, NSpace, NButton } from 'naive-ui'

// Active tab state
const activeTab = ref('总资源池')
const childrenTab = ref('供应商资源池')
const message = useMessage()
const router = useRouter()

// Define columns for 总资源池 (Common Fields)
const commonColumns = ref([
  {
    title: '共用字段',
    key: 'common',
    align: 'center',
    children: [
      { title: '物料类型', key: 'materialType', align: 'center', width: 120 },
      { title: '料号', key: 'materialCode', align: 'center', width: 100 },
      {
        title: '物料描述',
        key: 'materialDescription',
        align: 'center',
        width: 150,
      },
      { title: '物料名称', key: 'materialName', align: 'center', width: 120 },
      {
        title: '是否国内生产商',
        key: 'isDomestic',
        align: 'center',
        width: 100,
      },
      {
        title: '是否共用物料',
        key: 'isSharedMaterial',
        align: 'center',
        width: 100,
      },
      { title: '总适用范围', key: 'totalScope', align: 'center', width: 120 },
      { title: '供应商代码', key: 'supplierCode', align: 'center', width: 100 },
      { title: '供应商名称', key: 'supplierName', align: 'center', width: 130 },
      {
        title: '供应商属性',
        key: 'supplierAttribute',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商联系人',
        key: 'supplierContact',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商电话',
        key: 'supplierPhone',
        align: 'center',
        width: 120,
      },
      {
        title: '供应商邮箱',
        key: 'supplierEmail',
        align: 'center',
        width: 150,
      },
      {
        title: '生产商名称',
        key: 'manufacturerName',
        align: 'center',
        width: 130,
      },
      {
        title: '生产商代码',
        key: 'manufacturerCode',
        align: 'center',
        width: 100,
      },
      { title: '品牌商', key: 'brand', align: 'center', width: 100 },
      {
        title: '生产商国家/地区',
        key: 'manufacturerCountry',
        align: 'center',
        width: 120,
      },
      {
        title: '详细地址',
        key: 'detailedAddress',
        align: 'center',
        width: 150,
      },
      { title: '槽车号', key: 'tankCarNumber', align: 'center', width: 100 },
    ],
  },
])

// Define columns for 磐石资源池
const panshiColumns = ref([
  {
    title: '磐石',
    key: 'panshi',
    align: 'center',
    children: [
      { title: '序号', key: 'panshi_serialNumber', align: 'center', width: 80 },
      {
        title: 'Equal No.',
        key: 'panshi_equalNo',
        align: 'center',
        width: 100,
      },
      {
        title: '物料类型',
        key: 'panshi_materialType',
        align: 'center',
        width: 120,
      },
      {
        title: '料号',
        key: 'panshi_materialCode',
        align: 'center',
        width: 100,
      },
      {
        title: '是否共用物料',
        key: 'panshi_isSharedMaterial',
        align: 'center',
        width: 100,
      },
      {
        title: '是否国内生产商',
        key: 'panshi_isDomestic',
        align: 'center',
        width: 100,
      },
      {
        title: '物料描述',
        key: 'panshi_materialDescription',
        align: 'center',
        width: 150,
      },
      {
        title: '物料名称',
        key: 'panshi_materialName',
        align: 'center',
        width: 120,
      },
      {
        title: '供应商方式',
        key: 'panshi_supplyMethod',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商代码',
        key: 'panshi_supplierCode',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商名称',
        key: 'panshi_supplierName',
        align: 'center',
        width: 130,
      },
      {
        title: '供应商属性',
        key: 'panshi_supplierAttribute',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商联系人',
        key: 'panshi_supplierContact',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商电话',
        key: 'panshi_supplierPhone',
        align: 'center',
        width: 120,
      },
      {
        title: '供应商邮箱',
        key: 'panshi_supplierEmail',
        align: 'center',
        width: 150,
      },
      {
        title: '生产商名称',
        key: 'panshi_manufacturerName',
        align: 'center',
        width: 130,
      },
      {
        title: '生产商代码',
        key: 'panshi_manufacturerCode',
        align: 'center',
        width: 100,
      },
      { title: '品牌商', key: 'panshi_brand', align: 'center', width: 100 },
      {
        title: '生产商国家/地区',
        key: 'panshi_manufacturerCountry',
        align: 'center',
        width: 120,
      },
      {
        title: '详细地址',
        key: 'panshi_detailedAddress',
        align: 'center',
        width: 150,
      },
      {
        title: '正式规格书编号',
        key: 'panshi_formalSpecNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '正式规格书版本',
        key: 'panshi_formalSpecVersion',
        align: 'center',
        width: 100,
      },
      {
        title: '临时规格书编号',
        key: 'panshi_tempSpecNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '临时规格书版本',
        key: 'panshi_tempSpecVersion',
        align: 'center',
        width: 100,
      },
      {
        title: '工程验证单编号',
        key: 'panshi_engVerificationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '适用范围',
        key: 'panshi_applicableScope',
        align: 'center',
        width: 120,
      },
      {
        title: '适用制程',
        key: 'panshi_applicableProcess',
        align: 'center',
        width: 100,
      },
      {
        title: '技术节点',
        key: 'panshi_techNode',
        align: 'center',
        width: 100,
      },
      {
        title: '主要使用module',
        key: 'panshi_mainModule',
        align: 'center',
        width: 120,
      },
      {
        title: '主要使用module科室',
        key: 'panshi_mainModuleDept',
        align: 'center',
        width: 120,
      },
      {
        title: '主要使用部门负责人',
        key: 'panshi_mainDeptHead',
        align: 'center',
        width: 120,
      },
      {
        title: '其他使用module',
        key: 'panshi_otherModule',
        align: 'center',
        width: 120,
      },
      {
        title: '其他使用module科室',
        key: 'panshi_otherModuleDept',
        align: 'center',
        width: 120,
      },
      {
        title: '所有使用module',
        key: 'panshi_allModules',
        align: 'center',
        width: 120,
      },
      {
        title: '所有使用module科室',
        key: 'panshi_allModulesDept',
        align: 'center',
        width: 120,
      },
      {
        title: '槽车号',
        key: 'panshi_tankCarNumber',
        align: 'center',
        width: 100,
      },
      {
        title: '版本生效日期',
        key: 'panshi_versionEffectiveDate',
        align: 'center',
        width: 120,
      },
      {
        title: '首次加入合格供应商资源池日期',
        key: 'panshi_firstQualifiedDate',
        align: 'center',
        width: 150,
      },
      {
        title: '最新申请单编号',
        key: 'panshi_latestApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '所有申请单编号',
        key: 'panshi_allApplicationNumbers',
        align: 'center',
        width: 120,
      },
      {
        title: '冻结申请单编号',
        key: 'panshi_freezeApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '取消资格申请单编号',
        key: 'panshi_disqualifyApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '解冻申请单编号',
        key: 'panshi_unfreezeApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '恢复资格申请单编号',
        key: 'panshi_requalifyApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '2nd Source',
        key: 'panshi_bslSecondSource',
        align: 'center',
        width: 100,
      },
      { title: '状态', key: 'panshi_status', align: 'center', width: 100 },
      {
        title: '更新日期',
        key: 'panshi_updateDate',
        align: 'center',
        width: 120,
      },
    ],
  },
])

// Define columns for 司南资源池
const sinanColumns = ref([
  {
    title: '司南',
    align: 'center',
    key: 'sinan',
    children: [
      { title: '序号', key: 'sinan_serialNumber', align: 'center', width: 80 },
      { title: 'Equal No.', key: 'sinan_equalNo', align: 'center', width: 100 },
      {
        title: '物料类型',
        key: 'sinan_materialType',
        align: 'center',
        width: 120,
      },
      { title: '料号', key: 'sinan_materialCode', align: 'center', width: 100 },
      {
        title: '是否共用物料',
        key: 'sinan_isSharedMaterial',
        align: 'center',
        width: 100,
      },
      {
        title: '是否国内生产商',
        key: 'sinan_isDomestic',
        align: 'center',
        width: 100,
      },
      {
        title: '物料描述',
        key: 'sinan_materialDescription',
        align: 'center',
        width: 150,
      },
      {
        title: '物料名称',
        key: 'sinan_materialName',
        align: 'center',
        width: 120,
      },
      {
        title: '供应商方式',
        key: 'sinan_supplyMethod',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商代码',
        key: 'sinan_supplierCode',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商名称',
        key: 'sinan_supplierName',
        align: 'center',
        width: 130,
      },
      {
        title: '供应商属性',
        key: 'sinan_supplierAttribute',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商联系人',
        key: 'sinan_supplierContact',
        align: 'center',
        width: 100,
      },
      {
        title: '供应商电话',
        key: 'sinan_supplierPhone',
        align: 'center',
        width: 120,
      },
      {
        title: '供应商邮箱',
        key: 'sinan_supplierEmail',
        align: 'center',
        width: 150,
      },
      {
        title: '生产商名称',
        key: 'sinan_manufacturerName',
        align: 'center',
        width: 130,
      },
      {
        title: '生产商代码',
        key: 'sinan_manufacturerCode',
        align: 'center',
        width: 100,
      },
      { title: '品牌商', key: 'sinan_brand', align: 'center', width: 100 },
      {
        title: '生产商国家/地区',
        key: 'sinan_manufacturerCountry',
        align: 'center',
        width: 120,
      },
      {
        title: '详细地址',
        key: 'sinan_detailedAddress',
        align: 'center',
        width: 150,
      },
      {
        title: '正式规格书编号',
        key: 'sinan_formalSpecNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '正式规格书版本',
        key: 'sinan_formalSpecVersion',
        align: 'center',
        width: 100,
      },
      {
        title: '临时规格书编号',
        key: 'sinan_tempSpecNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '临时规格书版本',
        key: 'sinan_tempSpecVersion',
        align: 'center',
        width: 100,
      },
      {
        title: '工程验证单编号',
        key: 'sinan_engVerificationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '适用范围',
        key: 'sinan_applicableScope',
        align: 'center',
        width: 120,
      },
      {
        title: '适用制程',
        key: 'sinan_applicableProcess',
        align: 'center',
        width: 100,
      },
      { title: '技术节点', key: 'sinan_techNode', align: 'center', width: 100 },
      {
        title: '主要使用module',
        key: 'sinan_mainModule',
        align: 'center',
        width: 120,
      },
      {
        title: '主要使用module科室',
        key: 'sinan_mainModuleDept',
        align: 'center',
        width: 120,
      },
      {
        title: '主要使用部门负责人',
        key: 'sinan_mainDeptHead',
        align: 'center',
        width: 120,
      },
      {
        title: '其他使用module',
        key: 'sinan_otherModule',
        align: 'center',
        width: 120,
      },
      {
        title: '其他使用module科室',
        key: 'sinan_otherModuleDept',
        align: 'center',
        width: 120,
      },
      {
        title: '所有使用module',
        key: 'sinan_allModules',
        align: 'center',
        width: 120,
      },
      {
        title: '所有使用module科室',
        key: 'sinan_allModulesDept',
        align: 'center',
        width: 120,
      },
      {
        title: '槽车号',
        key: 'sinan_tankCarNumber',
        align: 'center',
        width: 100,
      },
      {
        title: '版本生效日期',
        key: 'sinan_versionEffectiveDate',
        align: 'center',
        width: 120,
      },
      {
        title: '首次加入合格供应商资源池日期',
        key: 'sinan_firstQualifiedDate',
        align: 'center',
        width: 150,
      },
      {
        title: '最新申请单编号',
        key: 'sinan_latestApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '所有申请单编号',
        key: 'sinan_allApplicationNumbers',
        align: 'center',
        width: 120,
      },
      {
        title: '冻结申请单编号',
        key: 'sinan_freezeApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '取消资格申请单编号',
        key: 'sinan_disqualifyApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '解冻申请单编号',
        key: 'sinan_unfreezeApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '恢复资格申请单编号',
        key: 'sinan_requalifyApplicationNumber',
        align: 'center',
        width: 120,
      },
      {
        title: '2nd Source',
        key: 'sinan_bslSecondSource',
        align: 'center',
        width: 100,
      },
      { title: '状态', key: 'sinan_status', align: 'center', width: 100 },
      {
        title: '更新日期',
        key: 'sinan_updateDate',
        align: 'center',
        width: 120,
      },
    ],
  },
])

// 定义履历列
const historyColumns = ref([
  { title: '序号', key: 'history_serialNumber', align: 'center', width: 80 },
  {
    title: '物料类型',
    key: 'history_materialType',
    align: 'center',
    width: 120,
  },
  { title: '料号', key: 'history_materialCode', align: 'center', width: 100 },
  { title: '适用范围', key: 'history_scope', align: 'center', width: 120 },
  { title: '变更人', key: 'history_changer', align: 'center', width: 100 },
  { title: '变更时间', key: 'history_changeTime', align: 'center', width: 150 },
  {
    title: '拟定内容及理由',
    key: 'history_content',
    align: 'center',
    width: 200,
  },
])

const tableRef = ref(null)
// 添加选中行的状态
const checkedRowKeys = ref([])

// 判断是否显示多选框
const showCheckbox = computed(() => {
  return (
    ['合格供应商', '认证中供应商', '已作废', '已冻结'].includes(
      childrenTab.value
    ) && ['磐石资源池', '司南资源池'].includes(activeTab.value)
  )
})

// 处理修订操作
const handleRevise = (row) => {
  router.push({
    path: '/pages/avl/editForm',
    query: { materialCode: row.materialCode, formType: '修订' },
  })
}

// 处理冻结操作
const handleFreeze = (row) => {
  router.push({
    path: '/pages/avl/frozen',
    query: { materialCode: row.materialCode, formType: '冻结' },
  })
}

// 处理取消资格操作
const handleDisqualify = (row) => {
  router.push({
    path: '/pages/avl/frozen',
    query: { materialCode: row.materialCode, formType: '取消资格' },
  })
}

// 处理解冻操作
const handleUnfreeze = (row) => {
  router.push({
    path: '/pages/avl/unFrozen',
    query: { materialCode: row.materialCode, formType: '解冻' },
  })
}

// 处理重获资格操作
const handleRequalify = (row) => {
  router.push({
    path: '/pages/avl/unFrozen',
    query: { materialCode: row.materialCode, formType: '重获资格' },
  })
}

// 判断是否显示操作列
const showOperationColumn = computed(() => {
  return (
    ['合格供应商', '认证中供应商', '已冻结', '已作废'].includes(
      childrenTab.value
    ) && ['磐石资源池', '司南资源池'].includes(activeTab.value)
  )
})

// 获取操作按钮
const getOperationButtons = (row) => {
  const buttons = []

  if (['合格供应商', '认证中供应商'].includes(childrenTab.value)) {
    buttons.push(
      <NButton type="primary" size="small" onClick={() => handleRevise(row)}>
        修订
      </NButton>,
      <NButton type="warning" size="small" onClick={() => handleFreeze(row)}>
        冻结
      </NButton>,
      <NButton type="error" size="small" onClick={() => handleDisqualify(row)}>
        取消资格
      </NButton>
    )
  } else if (childrenTab.value === '已冻结') {
    buttons.push(
      <NButton type="primary" size="small" onClick={() => handleUnfreeze(row)}>
        解冻
      </NButton>
    )
  } else if (childrenTab.value === '已作废') {
    buttons.push(
      <NButton type="primary" size="small" onClick={() => handleRequalify(row)}>
        重获资格
      </NButton>
    )
  }

  return buttons
}

// 定义操作列
const operationColumn = computed(() => ({
  title: '操作',
  key: 'operation',
  align: 'center',
  width: ['合格供应商', '认证中供应商'].includes(childrenTab.value) ? 250 : 80,
  fixed: 'right',
  render: (row) => {
    return <NSpace justify="center">{getOperationButtons(row)}</NSpace>
  },
}))

// Computed property to assign columns based on active tab
const filteredColumns = computed(() => {
  requestAnimationFrame(() => {
    tableRef.value?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  })

  let columns = []
  if (childrenTab.value === '履历') {
    columns = historyColumns.value
  } else if (activeTab.value === '总资源池') {
    columns = [
      ...commonColumns.value,
      ...panshiColumns.value,
      ...sinanColumns.value,
    ]
  } else if (activeTab.value === '磐石资源池') {
    columns = [...panshiColumns.value[0].children]
  } else if (activeTab.value === '司南资源池') {
    columns = [...sinanColumns.value[0].children]
  } else {
    columns = [...commonColumns.value]
  }

  // 如果需要显示多选框，添加选择列
  if (showCheckbox.value && !columns.some((col) => col.type === 'selection')) {
    columns.unshift({
      type: 'selection',
      fixed: 'left',
      width: 50,
    })
  }

  // 如果需要显示操作列，添加操作列
  if (
    showOperationColumn.value &&
    !columns.some((col) => col.key === 'operation')
  ) {
    columns.push(operationColumn.value)
  }

  return columns
})

// 处理选择变化
const handleCheck = (rowKeys) => {
  checkedRowKeys.value = rowKeys
}

// 处理多物料冻结
const handleMultiFreeze = () => {
  if (checkedRowKeys.value.length === 0) {
    message.warning('请先选择需要冻结的物料')
    return
  }
  router.push({
    path: '/pages/avl/muchFrozen',
    query: {
      materialCodes: checkedRowKeys.value.join(','),
      formType: '多物料冻结',
    },
  })
}

// 处理多物料取消资格
const handleMultiDisqualify = () => {
  if (checkedRowKeys.value.length === 0) {
    message.warning('请先选择需要取消资格的物料')
    return
  }
  router.push({
    path: '/pages/avl/muchFrozen',
    query: {
      materialCodes: checkedRowKeys.value.join(','),
      formType: '多物料取消资格',
    },
  })
}

// 处理多物料修订
const handleMultiRevise = () => {
  if (checkedRowKeys.value.length === 0) {
    message.warning('请先选择需要修订的物料')
    return
  }
  router.push({
    path: '/pages/avl/muchEditForm',
    query: {
      materialCodes: checkedRowKeys.value.join(','),
      formType: '多物料修订',
    },
  })
}

// Generate random sample data
const generateData = (count) => {
  const data = []
  const materialTypes = [
    '电子元件',
    '机械部件',
    '化学原料',
    '包装材料',
    '光学元件',
  ]
  const isDomesticOptions = ['是', '否']
  const isSharedMaterialOptions = ['是', '否']
  const supplierAttributes = ['一级供应商', '二级供应商', '三级供应商']
  const supplyMethods = ['Single Source', 'Group Source', 'Multiple Source']
  const statuses = ['合格', '认证中', '已冻结', '已作废']
  const countries = ['中国', '美国', '日本', '德国', '韩国']
  const modules = ['模块A', '模块B', '模块C', '模块D', '模块E']
  const departments = ['电子科', '机械科', '生产科', '质量科', '研发科']
  const scopes = ['生产', '研发', '测试', '维护', '其他']
  const changers = ['张三', '李四', '王五', '赵六', '钱七']
  const contents = [
    '更新供应商信息',
    '修改物料规格',
    '调整适用范围',
    '更新认证状态',
    '修改供应商资质',
  ]

  for (let i = 0; i < count; i++) {
    const materialType =
      materialTypes[Math.floor(Math.random() * materialTypes.length)]
    const isDomestic =
      isDomesticOptions[Math.floor(Math.random() * isDomesticOptions.length)]
    const isSharedMaterial =
      isSharedMaterialOptions[
        Math.floor(Math.random() * isSharedMaterialOptions.length)
      ]
    const supplierAttribute =
      supplierAttributes[Math.floor(Math.random() * supplierAttributes.length)]
    const supplyMethod =
      supplyMethods[Math.floor(Math.random() * supplyMethods.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]
    const module = modules[Math.floor(Math.random() * modules.length)]
    const department =
      departments[Math.floor(Math.random() * departments.length)]
    const scope = scopes[Math.floor(Math.random() * scopes.length)]
    const changer = changers[Math.floor(Math.random() * changers.length)]
    const content = contents[Math.floor(Math.random() * contents.length)]

    const historyData = {
      history_serialNumber: String(i + 1),
      history_materialType: materialType,
      history_materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      history_scope: scope,
      history_changer: changer,
      history_changeTime: `2024-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(
        Math.floor(Math.random() * 60)
      ).padStart(2, '0')}`,
      history_content: content,
    }

    const baseData = {
      materialType,
      materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      materialDescription: `${materialType}描述${i + 1}`,
      materialName: `${materialType}名称${i + 1}`,
      isDomestic,
      isSharedMaterial,
      totalScope: isSharedMaterial === '是' ? '全厂' : '部分产线',
      supplierCode: `SUP${String(i + 1).padStart(3, '0')}`,
      supplierName: `${country}供应商${i + 1}`,
      supplierAttribute,
      supplierContact: `联系人${i + 1}`,
      supplierPhone: `1${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, '0')}`,
      supplierEmail: `supplier${i + 1}@example.com`,
      manufacturerName: `${country}制造商${i + 1}`,
      manufacturerCode: `MFG${String(i + 1).padStart(3, '0')}`,
      brand: `BRAND${i + 1}`,
      manufacturerCountry: country,
      detailedAddress: `${country}地址${i + 1}`,
      tankCarNumber: `TC${String(i + 1).padStart(3, '0')}`,
    }

    const panshiData = {
      panshi_serialNumber: String(i + 1),
      panshi_equalNo: `EQ${String(i + 1).padStart(3, '0')}`,
      panshi_materialType: materialType,
      panshi_materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      panshi_isSharedMaterial: isSharedMaterial,
      panshi_isDomestic: isDomestic,
      panshi_materialDescription: `${materialType}描述${i + 1}`,
      panshi_materialName: `${materialType}名称${i + 1}`,
      panshi_supplyMethod: supplyMethod,
      panshi_supplierCode: `SUP${String(i + 1).padStart(3, '0')}`,
      panshi_supplierName: `${country}供应商${i + 1}`,
      panshi_supplierAttribute: supplierAttribute,
      panshi_supplierContact: `联系人${i + 1}`,
      panshi_supplierPhone: `1${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, '0')}`,
      panshi_supplierEmail: `supplier${i + 1}@example.com`,
      panshi_manufacturerName: `${country}制造商${i + 1}`,
      panshi_manufacturerCode: `MFG${String(i + 1).padStart(3, '0')}`,
      panshi_brand: `BRAND${i + 1}`,
      panshi_manufacturerCountry: country,
      panshi_detailedAddress: `${country}地址${i + 1}`,
      panshi_formalSpecNumber: `SPEC${String(i + 1).padStart(3, '0')}`,
      panshi_formalSpecVersion: `V${Math.floor(Math.random() * 5) + 1}.0`,
      panshi_tempSpecNumber: `TSPEC${String(i + 1).padStart(3, '0')}`,
      panshi_tempSpecVersion: `TV${Math.floor(Math.random() * 5) + 1}.0`,
      panshi_engVerificationNumber: `EV${String(i + 1).padStart(3, '0')}`,
      panshi_applicableScope: '生产',
      panshi_applicableProcess: 'SMT',
      panshi_techNode: `${Math.floor(Math.random() * 10) + 1}nm`,
      panshi_mainModule: module,
      panshi_mainModuleDept: department,
      panshi_mainDeptHead: `负责人${i + 1}`,
      panshi_otherModule: `${module}-其他`,
      panshi_otherModuleDept: `${department}-其他`,
      panshi_allModules: `${module},${module}-其他`,
      panshi_allModulesDept: `${department},${department}-其他`,
      panshi_tankCarNumber: `TC${String(i + 1).padStart(3, '0')}`,
      panshi_versionEffectiveDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      panshi_firstQualifiedDate: `2024-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      panshi_latestApplicationNumber: `APP${String(i + 1).padStart(3, '0')}`,
      panshi_allApplicationNumbers: `APP${String(i + 1).padStart(
        3,
        '0'
      )},APP${String(i + 2).padStart(3, '0')}`,
      panshi_freezeApplicationNumber: `FAPP${String(i + 1).padStart(3, '0')}`,
      panshi_disqualifyApplicationNumber: `DAPP${String(i + 1).padStart(
        3,
        '0'
      )}`,
      panshi_unfreezeApplicationNumber: `UAPP${String(i + 1).padStart(3, '0')}`,
      panshi_requalifyApplicationNumber: `RAPP${String(i + 1).padStart(
        3,
        '0'
      )}`,
      panshi_bslSecondSource: Math.random() > 0.5 ? 'BSL' : '2nd Source',
      panshi_status: status,
      panshi_updateDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
    }

    const sinanData = {
      sinan_serialNumber: String(i + 1),
      sinan_equalNo: `EQ${String(i + 1).padStart(3, '0')}-S`,
      sinan_materialType: materialType,
      sinan_materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      sinan_isSharedMaterial: isSharedMaterial,
      sinan_isDomestic: isDomestic,
      sinan_materialDescription: `${materialType}描述${i + 1}`,
      sinan_materialName: `${materialType}名称${i + 1}`,
      sinan_supplyMethod: supplyMethod,
      sinan_supplierCode: `SUP${String(i + 1).padStart(3, '0')}`,
      sinan_supplierName: `${country}供应商${i + 1}`,
      sinan_supplierAttribute: supplierAttribute,
      sinan_supplierContact: `联系人${i + 1}`,
      sinan_supplierPhone: `1${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, '0')}`,
      sinan_supplierEmail: `supplier${i + 1}@example.com`,
      sinan_manufacturerName: `${country}制造商${i + 1}`,
      sinan_manufacturerCode: `MFG${String(i + 1).padStart(3, '0')}`,
      sinan_brand: `BRAND${i + 1}`,
      sinan_manufacturerCountry: country,
      sinan_detailedAddress: `${country}地址${i + 1}`,
      sinan_formalSpecNumber: `SPEC${String(i + 1).padStart(3, '0')}-S`,
      sinan_formalSpecVersion: `V${Math.floor(Math.random() * 5) + 1}.0-S`,
      sinan_tempSpecNumber: `TSPEC${String(i + 1).padStart(3, '0')}-S`,
      sinan_tempSpecVersion: `TV${Math.floor(Math.random() * 5) + 1}.0-S`,
      sinan_engVerificationNumber: `EV${String(i + 1).padStart(3, '0')}-S`,
      sinan_applicableScope: '生产',
      sinan_applicableProcess: 'SMT',
      sinan_techNode: `${Math.floor(Math.random() * 10) + 1}nm`,
      sinan_mainModule: `${module}-S`,
      sinan_mainModuleDept: department,
      sinan_mainDeptHead: `负责人${i + 1}`,
      sinan_otherModule: `${module}-其他-S`,
      sinan_otherModuleDept: `${department}-其他`,
      sinan_allModules: `${module}-S,${module}-其他-S`,
      sinan_allModulesDept: `${department},${department}-其他`,
      sinan_tankCarNumber: `TC${String(i + 1).padStart(3, '0')}`,
      sinan_versionEffectiveDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      sinan_firstQualifiedDate: `2024-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      sinan_latestApplicationNumber: `APP${String(i + 1).padStart(3, '0')}-S`,
      sinan_allApplicationNumbers: `APP${String(i + 1).padStart(
        3,
        '0'
      )}-S,APP${String(i + 2).padStart(3, '0')}-S`,
      sinan_freezeApplicationNumber: `FAPP${String(i + 1).padStart(3, '0')}-S`,
      sinan_disqualifyApplicationNumber: `DAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_unfreezeApplicationNumber: `UAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_requalifyApplicationNumber: `RAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_bslSecondSource: Math.random() > 0.5 ? 'BSL' : '2nd Source',
      sinan_status: status,
      sinan_updateDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
    }

    data.push({
      ...baseData,
      ...panshiData,
      ...sinanData,
      ...historyData,
    })
  }
  return data
}

const data = ref(generateData(6))
</script>
