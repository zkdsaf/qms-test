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
              <BasicInfo ref="basicInfoRef" :form-data="formData" />
              <template #header>
                <h2 class="text-lg font-bold">基本信息</h2>
              </template>
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>
        <n-tab-pane name="流程记录" tab="流程记录"> 流程记录 </n-tab-pane>
      </n-tabs>
    </template>

    <!-- 自定义按钮 -->
    <template #buttons>
      <n-button type="primary" @click="onSubmit">确认提交</n-button>
      <n-button class="ml-2" type="warning" @click="onSave">暂存</n-button>
      <n-button class="ml-2" type="error" @click="onCancel">取消</n-button>
    </template>
  </FormPage>
</template>

<script setup>
import FormPage from '@/components/FormPage.vue'
import { BasicInfo } from './component/index.'
import { useMessage } from 'naive-ui'

// 表单信息
const formHeaderInfo = {
  title: 'OOW申请单',
  applicationId: 'APP-2025-001',
  applicationTime: '2025-04-30 10:00',
  applicant: '张三',
  subject: '办公用品采购',
  status: '待审批',
  department: '行政部',
}

// 表单数据
const formData = ref({
  iqaNo: 'IQA申请单编号',
  materialType: 'user',
  materialNo: '料号',
  materialName: '物料名称',
  materialDescription: '物料描述',
  vendorCode: '供应商代码',
  vendorName: '供应商名称',
  makerCode: null,
  makerName: '生产商名称',
  occurTime: 1745052211000,
  incomingTime: 1744965795000,
  responsibleParty: 'user',
  isLaunch: 'N',
  carType: null,
  carNo: null,
  carStartTime: null,
  abnormalCnt: 1,
  incomingBatch: 2,
  incomingQty: 3,
  totalBatchQty: 4,
  totalBatch: 5,
  abnormalDesc: '13213',
  file: [
    {
      id: '91710421',
      name: '前端开发规范.pdf',
      percentage: 100,
      status: 'error',
      url: null,
      file: {},
      thumbnailUrl: null,
      type: 'application/pdf',
      fullPath: '/前端开发规范.pdf',
      batchId: '4321cf59',
    },
  ],
  materialTableData: [
    {
      id: 1,
      parameter: '1',
      parameterUnit: '2',
      incomingMax: '4',
      incomingMin: '6',
      incomingMaxBatch: '5',
      incomingMinBatch: '7',
      abnormalBatch: '8',
      abnormalBatchQty: '9',
      abnormalQty: '10',
      unit: '11',
      compareResult: '3',
    },
  ],
})

const basicInfoRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  const basicInfoIsValid = await basicInfoRef?.value?.validateForm()
  if (basicInfoIsValid) {
    const basicInfoData = basicInfoRef?.value?.getFormData()
    console.log('🚀 ~ basicInfoData:', basicInfoData)
    message.success('提交成功')
  } else {
    message.error('表单验证失败，请检查必填项')
  }
}

const onSave = () => {
  message.info('保存成功')
}

const onCancel = () => {
  message.error('已取消')
}
</script>
