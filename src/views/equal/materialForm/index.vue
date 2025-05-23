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
                <h2 class="text-lg font-bold">导入类型/导入原因</h2>
              </template>

              <ImportInfo
                ref="importInfoRef"
                :form-data="formData"
                :readonly="readonly"
                @importTypeChange="getImportTypeChange"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">物料评估基础信息</h2>
              </template>

              <BasicInfo
                ref="basicInfoRef"
                :form-data="formData"
                :readonly="readonly"
                :importTypeValue="importTypeValue"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">供应商生产商信息</h2>
              </template>

              <VendorAndMakerInfo
                ref="vendorAndMakerInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">公司介绍/组织架构</h2>
              </template>

              <FirmInfo
                ref="firmInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">验证/供应履历</h2>
              </template>

              <ResumeInfo
                ref="resumeInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">行业经验</h2>
              </template>

              <Industry
                ref="industryRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">验证需求信息</h2>
              </template>

              <Demand
                ref="demandRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">物料评估数据</h2>
              </template>

              <MaterialInfo
                ref="materialInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']" v-if="readonly">
            <n-collapse-item name="2">
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
import {
  ImportInfo,
  BasicInfo,
  VendorAndMakerInfo,
  FirmInfo,
  ResumeInfo,
  Industry,
  Demand,
  MaterialInfo,
} from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

// 表单信息
const formHeaderInfo = {
  title: 'Material Qualification Application',
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
  materialType: 'admin',
  materialName: '物料名称',
  department: '质量工程科',
  departmentHead: '张三',
  projectTime: new Date().getTime(),
  tableData: [
    {
      id: 1,
      vendorName: '供应商名称',
      manufacturerName: '制造商名称',
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const importTypeValue = ref('')
const getImportTypeChange = (value) => {
  importTypeValue.value = value
  console.log(value)
}

const basicInfoRef = ref(null)
const importInfoRef = ref(null)
const vendorAndMakerInfoRef = ref(null)
const firmInfoRef = ref(null)
const resumeInfoRef = ref(null)
const industryRef = ref(null)
const demandRef = ref(null)
const materialInfoRef = ref(null)
// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
    importInfoRef,
    vendorAndMakerInfoRef,
    firmInfoRef,
    resumeInfoRef,
    industryRef,
    demandRef,
    materialInfoRef,
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
      basicInfoRef: '物料评估基础信息',
      importInfoRef: '导入类型/导入原因',
      vendorAndMakerInfoRef: '供应商/制造商信息',
      firmInfoRef: '公司介绍/组织架构',
      resumeInfoRef: '验证/供应履历',
      industryRef: '行业经验',
      demandRef: '验证需求信息',
      materialInfoRef: '物料评估数据',
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
