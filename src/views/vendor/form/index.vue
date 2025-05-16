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
                <h2 class="text-lg font-bold">
                  <span>供应商联系信息</span>
                  <span class="text-red-500 ml-3"
                    >供应商属性为Vendor&Makers的时,Maker联系信息同Vendor联系信息</span
                  >
                </h2>
              </template>

              <VendorInfo
                ref="vendorInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">
                  <span>生产商联系信息</span>
                  <span class="text-red-500 ml-3"
                    >供应商属性为Vendor时需要逐一填写联系信息</span
                  >
                </h2>
              </template>

              <MakerInfo
                ref="makerInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['4']">
            <n-collapse-item name="4">
              <template #header>
                <h2 class="text-lg font-bold">联系信息修订履历</h2>
              </template>

              <EditList />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['5']" v-if="readonly">
            <n-collapse-item name="5">
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
import { BasicInfo, VendorInfo, MakerInfo, EditList } from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

// 表单信息
const formHeaderInfo = {
  title: 'Edit Supplier Infomation',
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
  certSource: 'Maker Code修订流程',
  supplierNo: '100002',
  supplierName: '北京某某某科技有限公司',
  isCollaborativeSupplier: '否',
  tableData: [
    {
      id: 1,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
    {
      id: 2,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
    {
      id: 3,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
  ],
  vendorFileList: [
    {
      id: '9abe798b',
      name: '前端开发规范.pdf',
      percentage: 100,
      status: 'error',
      url: null,
      file: {},
      thumbnailUrl: null,
      type: 'application/pdf',
      fullPath: '/前端开发规范.pdf',
      batchId: '0fe23964',
    },
  ],
  vendorTableData: [
    {
      department: '总经理',
      rank: '经理',
      name: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138000',
      isPrimary: true,
      remark: '主要联系人主要联系人主要联系人主要联系人',
    },
    {
      department: '业务(销售)',
      rank: '对接窗口',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '业务(销售)',
      rank: '上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '业务(销售)',
      rank: '上上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '质量',
      rank: '对接窗口',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '质量',
      rank: '上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '质量',
      rank: '上上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '技术研发',
      rank: '对接窗口',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '技术研发',
      rank: '上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '技术研发',
      rank: '上上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '计划物流',
      rank: '对接窗口',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '计划物流',
      rank: '上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
    {
      department: '计划物流',
      rank: '上上级',
      name: '李四',
      email: 'lisi@example.com',
      phone: '13900139000',
      isPrimary: false,
      remark: '主要联系人',
    },
  ],
  vendorMaterialTableData: [
    {
      id: 1,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
    {
      id: 2,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
    {
      id: 3,
      sequenceNo: null,
      materialType: 'DK砖石盘',
      materialCode: '料号',
      materialName: '物料名称',
      materialDesc: '物料描述',
      manufacturerName: '制造商名称',
      detailedAddress: '详细地址',
      supplierAttribute: '供应商属性',
    },
  ],
  makerName: '制造商名称',
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
