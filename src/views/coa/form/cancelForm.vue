<template>
  <FormPage
    :form-header-info="formHeaderInfo"
    @submit="onSubmit"
    @save="onSave"
  >
    <!-- 自定义表单内容 -->
    <template #content>
      <n-tabs type="line" animated>
        <n-tab-pane name="表单信息" tab="表单信息">
          <n-data-table
            :columns="columns"
            :data="formData.tableData"
            class="mb-4"
          />

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">基本信息</h2>
              </template>

              <n-data-table
                :columns="basicColumns"
                :data="formData.basicTableData"
                class="mb-4"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">参数信息</h2>
              </template>

              <n-collapse :default-expanded-names="['1']">
                <n-collapse-item name="1">
                  <template #header>
                    <h2 class="text-lg font-bold">LotId:XXXXXXXXXXXXXXX</h2>
                  </template>

                  <n-data-table
                    :columns="paramsColumns"
                    :data="formData.paramsTableData"
                    class="mb-4"
                    :max-height="500"
                    :scroll-x="2000"
                  />
                </n-collapse-item>
              </n-collapse>
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">申请作废原因</h2>
              </template>
              <n-form
                ref="reasonFormRef"
                :model="formData"
                :rules="rules"
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
              >
                <n-form-item label="申请原因" path="reason">
                  <n-input
                    v-model:value="formData.reason"
                    type="textarea"
                    placeholder="请输入申请作废原因"
                  />
                </n-form-item>
              </n-form>
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['4']" v-if="readonly">
            <n-collapse-item name="4">
              <template #header>
                <h2 class="text-lg font-bold">审批记录</h2>
              </template>

              <HistoryList />
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>
        <n-tab-pane name="流程记录" tab="流程记录" v-if="id">
          流程记录
        </n-tab-pane>
      </n-tabs>
    </template>

    <!-- 自定义按钮 -->
    <template #buttons v-if="!id">
      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onSubmit"
      >
        <template #trigger>
          <n-button type="primary">确认提交</n-button>
        </template>
        确定要提交当前表单吗？
      </n-popconfirm>

      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onSave"
      >
        <template #trigger>
          <n-button class="ml-2" type="warning">暂存</n-button>
        </template>
        确定要暂存当前表单吗？
      </n-popconfirm>

      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onCancel"
      >
        <template #trigger>
          <n-button class="ml-2" type="error">取消</n-button>
        </template>
        确定要取消当前表单吗？
      </n-popconfirm>
    </template>
  </FormPage>
</template>

<script setup lang="jsx">
import FormPage from '@/components/FormPage.vue'
import HistoryList from '@/components/HistoryList.vue'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 表单信息
const formHeaderInfo = {
  title: 'COA Abolish',
  applicationId: 'APP-2025-001',
  applicationTime: '2025-04-30 10:00',
  applicant: '张三',
  subject: '办公用品采购',
  status: '待审批',
  department: '质量工程科',
}

// 获取路由参数
const route = useRoute()
const router = useRouter()

// 表单数据
const id = route.query.id

const readonly = ref(id ? true : false)

const columns = [
  {
    title: '申请单编号',
    key: 'applicationNo',
    align: 'center',
    width: 150,
    render: (row) => (
      <span
        class="cursor-pointer text-blue-500"
        onClick={() => message.info(row.applicationNo)}
      >
        {row.applicationNo}
      </span>
    ),
  },
  { title: '物料类型', key: 'materialType', align: 'center', width: 150 },
  { title: '料号', key: 'materialNo', align: 'center', width: 150 },
  { title: '文件名称', key: 'fileName', align: 'center', width: 150 },
  { title: '文件大小', key: 'fileSize', align: 'center', width: 150 },
  { title: '文件格式', key: 'fileType', align: 'center', width: 150 },
  { title: '上传时间', key: 'uploadTime', align: 'center', width: 150 },
]

const basicColumns = [
  { title: '名称', key: 'name', align: 'center', width: 150 },
  { title: '数据填写及内容', key: 'content', align: 'center', width: 150 },
  { title: '名称差异', key: 'nameDiff', align: 'center', width: 150 },
  {
    title: '与Spec Value差异',
    key: 'specValueDiff',
    align: 'center',
    width: 150,
    render: (row) => <span class="text-red-500">{row.specValueDiff}</span>,
  },
]

const paramsColumns = [
  {
    title: 'AlarmRule',
    key: 'alarmRule',
    align: 'center',
    width: 150,
    render: (row) => <NTag type="info">{row.alarmRule}</NTag>,
  },
  { title: 'No', key: 'no', align: 'center', width: 80 },
  {
    title: 'Parammeter',
    key: 'parameter',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Unit',
    key: 'unit',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'USL',
    key: 'usl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'LSL',
    key: 'lsl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'STC-UCL',
    key: 'stcUcl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'STC-LCL',
    key: 'stcLcl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'LCL',
    key: 'lcl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'UCL',
    key: 'ucl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'UWL',
    key: 'uwl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'LWL',
    key: 'lwl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Target',
    key: 'target',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'CL',
    key: 'cl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'MDL',
    key: 'mdl',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'MAX',
    key: 'max',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'MIN',
    key: 'min',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'COA Report Value',
    key: 'coaReportValue',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'STDEV',
    key: 'stdev',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Average',
    key: 'average',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Anaysis Sample Qty',
    key: 'analysisSampleQty',
    align: 'center',
    width: 150,
  },
]

const generateBasicData = () => {
  const length = Math.floor(Math.random() * 10 + 10)
  const data = []
  for (let i = 0; i < length; i++) {
    data.push({
      name: `名称${i}`,
      content: `数据填写及内容${i}`,
      nameDiff: `名称差异${i}`,
      specValueDiff: `与Spec Value差异${i}`,
    })
  }
  return data
}

const generateParamsData = () => {
  const length = Math.floor(Math.random() * 10 + 5)
  const data = []
  const alarmRules = [
    'OOS',
    'OOSTC',
    'OOMDL',
    'WE1',
    'WE2',
    'WE3',
    'WE4',
    'WE5',
  ]
  for (let i = 0; i < length; i++) {
    const randomAlarmRule =
      alarmRules[Math.floor(Math.random() * alarmRules.length)]
    data.push({
      alarmRule: randomAlarmRule,
      no: i + 1,
      parameter: `Parameter${i}`,
      unit: `Unit${i}`,
      usl: Math.random() * 100,
      lsl: Math.random() * 100,
      stcUcl: Math.random() * 100,
      stcLcl: Math.random() * 100,
      lcl: Math.random() * 100,
      ucl: Math.random() * 100,
      uwl: Math.random() * 100,
      lwl: Math.random() * 100,
      target: Math.random() * 100,
      cl: Math.random() * 100,
      mdl: Math.random() * 100,
      max: Math.random() * 100,
      min: Math.random() * 100,
      coaReportValue: Math.random() * 100,
      stdev: Math.random() * 100,
      average: Math.random() * 100,
      analysisSampleQty: Math.floor(Math.random() * 10 + 1),
    })
  }
  return data
}

// 表单数据
const formDataValue = {
  tableData: [
    {
      applicationNo: 'APP-2025-001',
      materialType: '原材料',
      materialNo: 'A001',
      fileName: '物料A.pdf',
      fileSize: '10MB',
      fileType: 'PDF',
      uploadTime: '2025-04-30 10:00',
    },
  ],
  basicTableData: generateBasicData(),
  paramsTableData: generateParamsData(),
  reason: null,
}

// 申请原因表单
const reasonFormRef = ref(null)

const rules = {
  reason: {
    required: true,
    message: '请输入申请下载原因',
    trigger: ['blur', 'input'],
  },
}

// 表单数据
const formData = ref({ ...formDataValue })

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  try {
    await reasonFormRef.value?.validate()
    message.success('提交成功')
    timerFunction()
  } catch (error) {
    message.error('请填写申请作废原因')
  }
}

const onSave = () => {
  message.info('保存成功')
  timerFunction()
}

const onCancel = () => {
  message.error('已取消')
  timerFunction()
}

const timerFunction = () => {
  setTimeout(() => {
    router.go(-1)
  }, 1000)
}
</script>
