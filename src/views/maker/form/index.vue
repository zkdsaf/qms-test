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

          <n-collapse
            :default-expanded-names="['1']"
            v-if="route.query.formType === 'edit'"
          >
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">修订理由</h2>
              </template>

              <ReasonInfo
                ref="reasonInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
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
    <template
      #buttons
      v-if="!id || ['import', 'add', 'edit'].includes(route.query.formType)"
    >
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
import { BasicInfo, ReasonInfo } from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
// 获取路由参数
const route = useRoute()
const router = useRouter()

const title =
  route.query.formType === 'import'
    ? 'Maker Code导入'
    : route.query.formType === 'add'
    ? 'Maker Code增加料号'
    : route.query.formType === 'edit'
    ? 'Maker Code修订'
    : 'Maker Code(无料号)申请单'
// 表单信息
const formHeaderInfo = {
  title,
  applicationId: 'APP-2025-001',
  applicationTime: '2025-04-30 10:00',
  applicant: '张三',
  subject: '办公用品采购',
  status: '待审批',
  department: '质量工程科',
}

// 表单数据
const id = route.query.id

const readonly = ref(id ? true : false)
// 表单数据
const formDataValue = {
  remark: '修订理由',
  tableData: [
    {
      id: 1,
      sequenceNo: 1,
      materialType: 'type1',
      materialDesc: '默认物料描述',
      materialName: '默认物料名称',
      supplierCode: 'SUP001',
      supplierName: '默认供应商',
      supplierAttribute: 'attr1',
      manufacturerName: '默认生产商',
      brandOwner: '默认品牌商',
      manufacturerCountry: 'CN',
      detailedAddress: '默认详细地址',
    },
    {
      id: 2,
      sequenceNo: 2,
      materialType: 'type2',
      materialDesc: '默认物料描述',
      materialName: '默认物料名称',
      supplierCode: 'SUP002',
      supplierName: '默认供应商',
      supplierAttribute: 'attr2',
      manufacturerName: '默认生产商',
      brandOwner: '默认品牌商',
      manufacturerCountry: 'CN',
      detailedAddress: '默认详细地址',
    },
    {
      id: 3,
      sequenceNo: 3,
      materialType: 'type3',
      materialDesc: '默认物料描述',
      materialName: '默认物料名称',
      supplierCode: 'SUP003',
      supplierName: '默认供应商',
      supplierAttribute: 'attr3',
      manufacturerName: '默认生产商',
      brandOwner: '默认品牌商',
      manufacturerCountry: 'CN',
      detailedAddress: '默认详细地址',
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const basicInfoRef = ref(null)
const reasonInfoRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
    reasonInfoRef,
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
      reasonInfoRef: '修订理由',
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
