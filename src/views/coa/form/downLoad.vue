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
          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">基本信息</h2>
              </template>

              <n-data-table
                :columns="columns"
                :data="formData.tableData"
                class="mb-4"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">申请下载原因</h2>
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
                    placeholder="请输入申请下载原因"
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

<script setup>
import FormPage from '@/components/FormPage.vue'
import HistoryList from '@/components/HistoryList.vue'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 表单信息
const formHeaderInfo = {
  title: 'COA Download Application',
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
  { title: '申请单编号', key: 'applicationNo', align: 'center', width: 100 },
  { title: '物料类型', key: 'materialType', align: 'center', width: 100 },
  { title: '料号', key: 'materialNo', align: 'center', width: 100 },
  { title: '供应商名称', key: 'supplierName', align: 'center', width: 100 },
  { title: '供应商编码', key: 'supplierCode', align: 'center', width: 100 },
  { title: '生产商名称', key: 'manufacturerName', align: 'center', width: 100 },
  { title: '生产商编码', key: 'manufacturerCode', align: 'center', width: 100 },
  { title: '物料描述', key: 'materialDesc', align: 'center', width: 100 },
  { title: '物料名称', key: 'materialName', align: 'center', width: 100 },
  { title: '状态', key: 'status', align: 'center', width: 100 },
]

// 生成随机数据
const generateRandomData = (length) => {
  const data = []
  for (let i = 0; i < length; i++) {
    data.push({
      applicationNo: `APP-${Math.floor(Math.random() * 10000)}`,
      materialType: ['原材料', '半成品', '成品'][Math.floor(Math.random() * 3)],
      materialNo: `M${Math.floor(Math.random() * 1000000)}`,
      supplierName: `供应商${Math.floor(Math.random() * 100)}`,
      supplierCode: `S${Math.floor(Math.random() * 10000)}`,
      manufacturerName: `生产商${Math.floor(Math.random() * 100)}`,
      manufacturerCode: `M${Math.floor(Math.random() * 10000)}`,
      materialDesc: `物料描述${Math.floor(Math.random() * 1000)}`,
      materialName: `物料${Math.floor(Math.random() * 100)}`,
      status: ['待审批', '已通过', '已拒绝'][Math.floor(Math.random() * 3)],
    })
  }
  return data
}

// 表单数据
const formDataValue = {
  tableData: generateRandomData(route.query.dataLength || 5),
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
    message.error('请填写申请下载原因')
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
