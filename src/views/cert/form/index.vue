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
            v-for="(item, idx) in formData.certList"
            :key="item.id"
            :default-expanded-names="[idx + 1]"
          >
            <n-collapse-item :name="idx + 1">
              <template #header>
                <h2 class="text-lg font-bold">
                  <span>{{ item.certNo }}</span>
                  <span class="text-red-500 ml-2"
                    >请确认新证书生产商名称,详细地址与网页信息是否一致,若不一致请至Maker
                    Code系统进行修订</span
                  >
                </h2>
              </template>
              <CertInfo
                :item="item"
                :form-data="formData"
                :readonly="readonly"
                :index="idx"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">修订理由</h2>
              </template>

              <ReasonInfo
                ref="reasonRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">证书信息修订履历</h2>
              </template>

              <EditList />
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
    <template #buttons v-if="!id || route.query.formType === 'edit'">
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
import { BasicInfo, CertInfo, EditList, ReasonInfo } from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

// 表单信息
const formHeaderInfo = {
  title: 'Edit Certificate Of Manufacturer',
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
  remark: '无',
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
  makerName: '北京某某某科技有限公司',
  makerSite: '北京市海淀区科技园区88号',
  certList: [
    {
      id: 1,
      materialType: 'DK砖石盘',
      hasCert: '是',
      certNo: 'ISO0001',
      certAddress: '北京市海淀区科技园区88号',
      certOrg: '中国质量认证中心',
      materialScope: '工业用金刚石锯片',
      issueDate: '2024-02-01',
      expireDate: '2025-02-01',
      certFile: 'certificate2.pdf',
      certProof: 'proof2.pdf',
      iaftMember: '是',
      certVersion: 'V1.0',
      materialList: [
        {
          id: 3,
          sequenceNo: 1,
          materialType: 'DK砖石锯片',
          materialCode: 'DK-003',
          materialName: '金刚石切割锯片',
          materialDesc: '用于石材切割的金刚石锯片',
          manufacturerName: '北京某某某科技有限公司',
          detailedAddress: '北京市海淀区科技园区88号',
          certScope: '石材切割用金刚石锯片',
        },
      ],
    },
    {
      id: 2,
      materialType: 'DK砖石锯片',
      hasCert: '是',
      certNo: 'IAFT16949',
      certAddress: '北京市海淀区科技园区88号',
      certOrg: '中国质量认证中心',
      materialScope: '工业用金刚石锯片',
      issueDate: '2024-02-01',
      expireDate: '2025-02-01',
      certFile: 'certificate2.pdf',
      certProof: 'proof2.pdf',
      iaftMember: '是',
      certVersion: 'V1.0',
      materialList: [
        {
          id: 3,
          sequenceNo: 1,
          materialType: 'DK砖石锯片',
          materialCode: 'DK-003',
          materialName: '金刚石切割锯片',
          materialDesc: '用于石材切割的金刚石锯片',
          manufacturerName: '北京某某某科技有限公司',
          detailedAddress: '北京市海淀区科技园区88号',
          certScope: '石材切割用金刚石锯片',
        },
      ],
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : null)

const basicInfoRef = ref(null)
const reasonRef = ref(null)

// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    basicInfoRef,
    reasonRef,
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
      reasonRef: '修订理由',
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
