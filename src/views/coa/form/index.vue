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

              <BasicInfo
                ref="basicInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">设置信息</h2>
              </template>

              <SetInfo
                ref="setInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">Spec Data</h2>
              </template>

              <SpecInfo
                ref="specInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
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
import { BasicInfo, SetInfo, SpecInfo } from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 表单信息
const formHeaderInfo = {
  title: 'COA Template',
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
  coaTemplateNo: 'TEMP-001',
  materialType: '类型1',
  materialName: 'Product X',
  materialNo: 'M001',
  materialDescription: 'Standard material for production',
  g1DocSpecNo: 'G1-001',
  g1DocSpecVersion: '1.0',
  g2DocSpecNo: 'G2-001',
  g2DocSpecVersion: '1.0',
  coaVersion: '1.0',
  materialTemplateVersion: '1.0',
  materialTemplateNo: 'MT-001',
  pushToVendor: 'Y',
  documentFormat: ['PDF', 'TXT', 'XML'],
  scope: ['G1', 'G2'],

  tableData: [
    {
      id: 1,
      source: 'COA',
      name: 'Material Type',
      previousName: 'Material Type',
      specValue: 'Type A: Raw Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 2,
      source: 'SPEC',
      name: 'Material No',
      previousName: 'Material No',
      specValue: 'M001: 12345',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 3,
      source: 'COA',
      name: 'Material Name',
      previousName: 'Material Name',
      specValue: 'Product X: Chemical Compound',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 4,
      source: 'SPEC',
      name: 'Po No',
      previousName: 'Po No',
      specValue: 'Type B: Processed Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 5,
      source: 'COA',
      name: 'Invoice No',
      previousName: 'Invoice No',
      specValue: 'M002: 67890',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 6,
      source: 'SPEC',
      name: 'Delivery Name',
      previousName: 'Delivery Name',
      specValue: 'Product Y: Industrial Chemical',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 7,
      source: 'COA',
      name: 'Vendor Code',
      previousName: 'Vendor Code',
      specValue: 'Type C: Finished Product',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 8,
      source: 'SPEC',
      name: 'Vendor Name',
      previousName: 'Vendor Name',
      specValue: 'M003: 54321',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 9,
      source: 'COA',
      name: 'Maker Code',
      previousName: 'Maker Code',
      specValue: 'Product Z: Special Compound',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 10,
      source: 'SPEC',
      name: 'Maker Name',
      previousName: 'Maker Name',
      specValue: 'Type D: Custom Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 11,
      source: 'COA',
      name: 'Maker Brand',
      previousName: 'Maker Brand',
      specValue: 'M004: 98765',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 12,
      source: 'SPEC',
      name: 'Maker Plant',
      previousName: 'Maker Plant',
      specValue: 'Product W: Advanced Material',
      history: '初始数据',
      isNew: false,
    },
    {
      id: 13,
      source: '',
      name: 'Maker Lot No.',
      previousName: '',
      specValue: '',
      history: '新增数据',
      isNew: true,
    },
    {
      id: 14,
      source: '',
      name: 'Maker Date Code',
      previousName: '',
      specValue: '',
      history: '新增数据',
      isNew: true,
    },
    {
      id: 15,
      source: '',
      name: 'Maker Expiry Date',
      previousName: '',
      specValue: '',
      history: '新增数据',
      isNew: true,
    },
  ],

  paramsTableData: [
    {
      id: 1,
      parameter: 'Temperature',
      unit: '°C',
      uslType: '≤',
      uslValue: '100',
      lslType: '≥',
      lslValue: '20',
      ucl: '90',
      lcl: '30',
      uwl: '80',
      lwl: '40',
      target: '60',
      cl: '50',
      mdl: '0.1',
      spcRuleStdev: '3',
      variablesAttributesData: '计量型',
      rules: ['OOMDL', 'WE1', 'WE2'],
      reviewCycle: '按批次',
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const basicInfoRef = ref(null)
const setInfoRef = ref(null)
const specInfoRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
    setInfoRef,
    specInfoRef,
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
      setInfoRef: '设置信息',
      specInfoRef: 'Spec Data',
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
