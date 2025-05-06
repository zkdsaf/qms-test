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

              <BasicInfo ref="basicInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">流程后续审批人</h2>
              </template>

              <ProcessUser ref="processUserRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">库存风险</h2>
              </template>

              <McInfo ref="mcInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['4']">
            <n-collapse-item name="4">
              <template #header>
                <h2 class="text-lg font-bold">安全环境科信息</h2>
              </template>

              <SafeInfo ref="safeInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['5']">
            <n-collapse-item name="5">
              <template #header>
                <h2 class="text-lg font-bold">气化科信息</h2>
              </template>

              <GasInfo ref="gasInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['6']">
            <n-collapse-item name="6">
              <template #header>
                <h2 class="text-lg font-bold">Pi-Run Infomation</h2>
              </template>

              <PiRunInfo ref="piRunInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['7']">
            <n-collapse-item name="7">
              <template #header>
                <h2 class="text-lg font-bold">使用风险</h2>
              </template>

              <ModuleInfo ref="moduleInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['8']">
            <n-collapse-item name="8">
              <template #header>
                <h2 class="text-lg font-bold">物料处置结论</h2>
              </template>

              <Result />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['9']">
            <n-collapse-item name="9">
              <template #header>
                <h2 class="text-lg font-bold">采购物料处理</h2>
              </template>

              <PurchaseInfo ref="purchaseInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['10']">
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">更换标签</h2>
              </template>

              <LabelInfo ref="labelInfoRef" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['11']">
            <n-collapse-item name="11">
              <template #header>
                <h2 class="text-lg font-bold">供应商报告信息</h2>
              </template>

              <FileInfo ref="fileInfoRef" />
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
import {
  BasicInfo,
  ProcessUser,
  McInfo,
  SafeInfo,
  GasInfo,
  PiRunInfo,
  ModuleInfo,
  Result,
  PurchaseInfo,
  LabelInfo,
  FileInfo,
} from './component/index.'
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
  principalTableData: [
    {
      id: Date.now(),
      module: '',
      moduleName: '',
      moduleManager: '',
      moduleManagerName: '',
      location: null,
    },
  ],
})

const basicInfoRef = ref(null)
const processUserRef = ref(null)
const mcInfoRef = ref(null)
const safeInfoRef = ref(null)
const gasInfoRef = ref(null)
const piRunInfoRef = ref(null)
const moduleInfoRef = ref(null)
const purchaseInfoRef = ref(null)
const labelInfoRef = ref(null)
const fileInfoRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
    processUserRef,
    mcInfoRef,
    safeInfoRef,
    gasInfoRef,
    piRunInfoRef,
    moduleInfoRef,
    purchaseInfoRef,
    labelInfoRef,
    fileInfoRef,
  }

  // 保存所有验证结果
  const validationResults = {}
  // 保存所有表单数据
  const formDataCollection = {}

  // 对所有表单组件执行验证并收集数据
  for (const [refName, refValue] of Object.entries(formRefs)) {
    if (refValue?.value?.validateForm) {
      const isValid = await refValue.value.validateForm()
      validationResults[refName] = isValid

      if (isValid && refValue.value.getFormData) {
        formDataCollection[refName] = refValue.value.getFormData()
      }
    }
  }

  console.log(Object.entries(validationResults))
  console.log(formDataCollection)

  // 检查是否所有表单都验证通过
  const allValid = Object.values(validationResults).every(
    (result) => result === true
  )

  if (allValid) {
    message.success('提交成功')
  } else {
    // ref名称到标题的映射
    const refToTitleMap = {
      basicInfoRef: '基本信息',
      processUserRef: '流程后续审批人',
      mcInfoRef: '库存风险',
      safeInfoRef: '安全环境科信息',
      gasInfoRef: '气化科信息',
      piRunInfoRef: 'Pi-Run Infomation',
      moduleInfoRef: '使用风险',
      purchaseInfoRef: '采购物料处理',
      labelInfoRef: '更换标签',
      fileInfoRef: '供应商报告信息',
    }

    // 找出验证失败的表单并转换为对应的标题
    const failedFormTitles = Object.entries(validationResults)
      .filter(([_, isValid]) => !isValid)
      .map(([name]) => refToTitleMap[name] || name)

    message.error(
      `表单验证失败，请检查以下部分: ${failedFormTitles.join(', ')}`
    )
  }
}

const onSave = () => {
  message.info('保存成功')
}

const onCancel = () => {
  message.error('已取消')
}
</script>
