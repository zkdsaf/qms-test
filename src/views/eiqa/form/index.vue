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

              <FormBasicInfo
                ref="basicInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">批次信息</h2>
              </template>

              <FormBatchInfo :form-data="formData" :readonly="readonly" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']" v-if="readonly">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">数据对比信息</h2>
              </template>

              <CompareInfo />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']" v-if="readonly">
            <n-collapse-item name="3">
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
import { FormBasicInfo, FormBatchInfo, CompareInfo } from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 表单信息
const formHeaderInfo = {
  title: 'EIQA申请单',
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
// 表单数据
const formDataValue = {
  iqaNo: 'IQA申请单编号',
  materialType: 'admin',
  materialNo: '料号',
  materialName: '物料名称',
  materialDescription: '物料描述',
  vendorCode: '供应商代码',
  vendorName: '供应商名称',
  makerCode: null,
  makerName: '生产商名称',
  occurTime: 1746589558000,
  incomingTime: 1746589561000,
  responsibleParty: 'admin',
  tableData: [
    {
      batchNo: 'BATCH001',
      supplierBatchNo: 'SUP001',
      pendingQuantity: 100,
      remainingQuantity: 100,
      unit: '个',
      productionDate: Date.now(),
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      arrivalDate: Date.now(),
      checkInDate: Date.now(),
      tankNo: 'TANK001',
      ecoaNo: 'ECOA001',
      ecoaStatus: 'pending',
      firstTableData: [
        {
          primaryInspection: 'Y',
          avl: 'Y',
          expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
          remainingExpiryDays: 30,
          coaCheck: 'Y',
          transportTemperature: 25,
          cylinderNo: 'CYL001',
          tankNo: 'TANK001',
          remarks: '正常',
          inspectionResult: 'Y',
          initiateIqndOow: 'IQND',
          conclusion: 'qualified',
          qualifiedQuantity: 100,
          concessionalQuantity: 0,
          returnQuantity: 0,
          scrapQuantity: 0,
          postedQuantity: 0,
          parentIndex: 0,
        },
      ],
      secondTableData: [
        {
          secondaryInspection: 'Y',
          smallBatchPostedQuantity: 50,
          chemicalLabCheck: 'Y',
          inspectionResult: 'Y',
          initiateIqndOow: 'IQND',
          conclusion: 'qualified',
          concessionalQuantity: 0,
          returnQuantity: 0,
          scrapQuantity: 0,
          postedQuantity: 50,
          parentIndex: 0,
        },
      ],
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const basicInfoRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
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

  // 合并所有表单数据到一个对象
  const mergedFormData = Object.values(formDataCollection).reduce(
    (acc, curr) => {
      return { ...acc, ...curr }
    },
    {}
  )

  console.log('合并后的表单数据：', mergedFormData)
  console.log(Object.entries(validationResults))

  // 检查是否所有表单都验证通过
  const allValid = Object.values(validationResults).every(
    (result) => result === true
  )

  if (allValid) {
    message.success('提交成功')
    timerFunction()
  } else {
    // ref名称到标题的映射
    const refToTitleMap = {
      basicInfoRef: '基本信息',
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
