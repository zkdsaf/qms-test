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

              <BasicInfo :form-data="formData" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">使用部门</h2>
              </template>

              <ModuleInfo :form-data="formData" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">审批人</h2>
              </template>

              <UserInfo
                ref="userInfoRef"
                :form-data="formData"
                :read-only="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">原因</h2>
              </template>

              <ReasonInfo
                ref="reasonInfoRef"
                :form-data="formData"
                :read-only="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['1']"
            v-if="route.query.formType === '解冻'"
          >
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">冻结物料状态</h2>
              </template>

              <FrozenStatus
                ref="frozenStatusRef"
                :form-data="formData"
                :read-only="readonly"
              />
            </n-collapse-item>
          </n-collapse>
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
    </template>
  </FormPage>
</template>

<script setup>
import FormPage from '@/components/FormPage.vue'
import HistoryList from '@/components/HistoryList.vue'
import {
  BasicInfo,
  ModuleInfo,
  UserInfo,
  ReasonInfo,
  FrozenStatus,
} from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 获取路由参数
const route = useRoute()
const router = useRouter()
// 表单信息
const formHeaderInfo = {
  title: `AVL-${route.query.formType}`,
  applicationId: 'APP-2025-001',
  applicationTime: '2025-04-30 10:00',
  applicant: '张三',
  subject: '办公用品采购',
  status: '创建',
  department: '质量工程科',
}

// 表单数据
const id = route.query.id

const readonly = ref(id ? true : false)
// 表单数据
const formDataValue = {
  orderNumber: '采购订单',
  orderNo: '采购订单行号',
  materialType: 'admin',
  materialNo: '料号',
  materialName: '物料名称',
  materialDescription: '物料描述',
  vendorCode: '供应商代码',
  vendorName: '供应商名称',
  makerCode: null,
  makerName: '生产商名称',
  tableData: [
    {
      id: Date.now(),
      vendorBatchNo: 'V-2025-001',
      containerNo: 'C-2025-001',
      effectTime: 1746633600000,
      arrivalTime: 1746633600527,
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const userInfoRef = ref(null)
const reasonInfoRef = ref(null)
const frozenStatusRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    userInfoRef,
    reasonInfoRef,
    frozenStatusRef,
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
      userInfoRef: '审批人',
      reasonInfoRef: '原因',
      frozenStatusRef: '冻结物料状态',
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

const timerFunction = () => {
  setTimeout(() => {
    router.go(-1)
  }, 1000)
}
</script>
