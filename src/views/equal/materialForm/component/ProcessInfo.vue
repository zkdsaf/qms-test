<template>
  <n-form
    label-placement="left"
    label-width="auto"
    labelWidth="140"
    ref="formRef"
    :model="formData"
    :rules="rules"
  >
    <!-- 供应商质量体系审核 -->
    <n-collapse :default-expanded-names="['1']">
      <n-collapse-item name="1">
        <template #header>
          <h2 class="text-lg font-bold">供应商质量体系审核</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="QSA No" required path="qsaNo">
              <n-input
                v-model:value="formData.qsaNo"
                placeholder="请输入QSA No"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="等级" required path="auditLevel">
              <n-input
                v-model:value="formData.auditLevel"
                placeholder="请输入等级"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="分数" required path="auditScore">
              <n-input
                v-model:value="formData.auditScore"
                placeholder="请输入分数"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 磐石临时规格书 -->
    <n-collapse :default-expanded-names="['2']">
      <n-collapse-item name="2">
        <template #header>
          <h2 class="text-lg font-bold">磐石临时规格书</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="临时规格书编号" required path="panshiSpecNo">
              <n-input
                v-model:value="formData.panshiSpecNo"
                placeholder="请输入临时规格书编号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="临时规格书版本"
              required
              path="panshiSpecVersion"
            >
              <n-input
                v-model:value="formData.panshiSpecVersion"
                placeholder="请输入临时规格书版本"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 司南临时规格书 -->
    <n-collapse :default-expanded-names="['3']">
      <n-collapse-item name="3">
        <template #header>
          <h2 class="text-lg font-bold">司南临时规格书</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="临时规格书编号" required path="sinanSpecNo">
              <n-input
                v-model:value="formData.sinanSpecNo"
                placeholder="请输入临时规格书编号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="临时规格书版本"
              required
              path="sinanSpecVersion"
            >
              <n-input
                v-model:value="formData.sinanSpecVersion"
                placeholder="请输入临时规格书版本"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 物料号 -->
    <n-collapse :default-expanded-names="['4']">
      <n-collapse-item name="4">
        <template #header>
          <h2 class="text-lg font-bold">物料号</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="物料号" required path="materialNo">
              <n-input
                v-model:value="formData.materialNo"
                placeholder="请输入物料号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="物料描述与料号系统保持一致"
              required
              path="materialDescription"
            >
              <n-input
                v-model:value="formData.materialDescription"
                placeholder="请输入物料描述"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="Lot No示例" required path="lotNoExample">
              <n-input
                v-model:value="formData.lotNoExample"
                placeholder="请输入Lot No示例"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="Lot命名规则" required path="lotNamingRule">
              <n-input
                v-model:value="formData.lotNamingRule"
                placeholder="请输入Lot命名规则"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 磐石样品 -->
    <n-collapse :default-expanded-names="['5']">
      <n-collapse-item name="5">
        <template #header>
          <h2 class="text-lg font-bold">磐石样品</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="样品需求时间"
              required
              path="panshiSampleRequestTime"
            >
              <n-date-picker
                v-model:value="formData.panshiSampleRequestTime"
                placeholder="请选择样品需求时间"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="数量" required path="panshiSampleQuantity">
              <n-input-number
                v-model:value="formData.panshiSampleQuantity"
                placeholder="请输入数量"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="单位" required path="panshiSampleUnit">
              <n-input
                v-model:value="formData.panshiSampleUnit"
                placeholder="请输入单位"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="预计开始验证时间"
              required
              path="panshiSampleStartTime"
            >
              <n-date-picker
                v-model:value="formData.panshiSampleStartTime"
                placeholder="请选择预计开始验证时间"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="预计完成验证时间"
              required
              path="panshiSampleEndTime"
            >
              <n-date-picker
                v-model:value="formData.panshiSampleEndTime"
                placeholder="请选择预计完成验证时间"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 司南样品 -->
    <n-collapse :default-expanded-names="['6']">
      <n-collapse-item name="6">
        <template #header>
          <h2 class="text-lg font-bold">司南样品</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="样品需求时间"
              required
              path="sinanSampleRequestTime"
            >
              <n-date-picker
                v-model:value="formData.sinanSampleRequestTime"
                placeholder="请选择样品需求时间"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="数量" required path="sinanSampleQuantity">
              <n-input-number
                v-model:value="formData.sinanSampleQuantity"
                placeholder="请输入数量"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="单位" required path="sinanSampleUnit">
              <n-input
                v-model:value="formData.sinanSampleUnit"
                placeholder="请输入单位"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="预计开始验证时间"
              required
              path="sinanSampleStartTime"
            >
              <n-date-picker
                v-model:value="formData.sinanSampleStartTime"
                placeholder="请选择预计开始验证时间"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="预计完成验证时间"
              required
              path="sinanSampleEndTime"
            >
              <n-date-picker
                v-model:value="formData.sinanSampleEndTime"
                placeholder="请选择预计完成验证时间"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 增加样品需求 -->
    <n-collapse :default-expanded-names="['7']">
      <n-collapse-item name="7">
        <template #header>
          <h2 class="text-lg font-bold">增加样品需求</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="样品需求总量"
              required
              path="totalSampleRequest"
            >
              <n-input
                v-model:value="formData.totalSampleRequest"
                placeholder="请输入样品需求总量"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <n-data-table
          :columns="additionalColumns"
          :data="formData.additionalTableData"
          bordered
          class="mb-3"
        />
      </n-collapse-item>
    </n-collapse>

    <!-- 样品来料情况 -->
    <n-collapse :default-expanded-names="['8']">
      <n-collapse-item name="8">
        <template #header>
          <h2 class="text-lg font-bold">样品来料情况</h2>
        </template>
        <n-data-table
          :columns="columns"
          :data="formData.tableData"
          bordered
          class="mb-3"
        />
      </n-collapse-item>
    </n-collapse>

    <!-- 磐石工厂验证单编号 -->
    <n-collapse :default-expanded-names="['9']">
      <n-collapse-item name="9">
        <template #header>
          <h2 class="text-lg font-bold">磐石工厂验证单编号</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="PCCB No" required path="panshiPccbNo">
              <n-input
                v-model:value="formData.panshiPccbNo"
                placeholder="请输入PCCB No"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="厂内验证等级"
              required
              path="panshiVerificationLevel"
            >
              <n-input
                v-model:value="formData.panshiVerificationLevel"
                placeholder="请输入厂内验证等级"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="结果" required path="panshiVerificationResult">
              <n-radio-group v-model:value="formData.panshiVerificationResult">
                <n-radio value="Pass">Pass</n-radio>
                <n-radio value="Fail">Fail</n-radio>
              </n-radio-group>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 司南工厂验证单编号 -->
    <n-collapse :default-expanded-names="['10']">
      <n-collapse-item name="10">
        <template #header>
          <h2 class="text-lg font-bold">司南工厂验证单编号</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="PCCB No" required path="sinanPccbNo">
              <n-input
                v-model:value="formData.sinanPccbNo"
                placeholder="请输入PCCB No"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="厂内验证等级"
              required
              path="sinanVerificationLevel"
            >
              <n-input
                v-model:value="formData.sinanVerificationLevel"
                placeholder="请输入厂内验证等级"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="结果" required path="sinanVerificationResult">
              <n-radio-group v-model:value="formData.sinanVerificationResult">
                <n-radio value="Pass">Pass</n-radio>
                <n-radio value="Fail">Fail</n-radio>
              </n-radio-group>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 磐石正式规格书 -->
    <n-collapse :default-expanded-names="['11']">
      <n-collapse-item name="11">
        <template #header>
          <h2 class="text-lg font-bold">磐石正式规格书</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="正式规格书编号" required path="panshiCertNo">
              <n-input
                v-model:value="formData.panshiCertNo"
                placeholder="请输入正式规格书编号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="正式规格书版本"
              required
              path="panshiCertVersion"
            >
              <n-input
                v-model:value="formData.panshiCertVersion"
                placeholder="请输入正式规格书版本"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 司南证书规格书 -->
    <n-collapse :default-expanded-names="['12']">
      <n-collapse-item name="12">
        <template #header>
          <h2 class="text-lg font-bold">司南证书规格书</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="证书规格书编号" required path="sinanCertNo">
              <n-input
                v-model:value="formData.sinanCertNo"
                placeholder="请输入证书规格书编号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="证书规格书版本"
              required
              path="sinanCertVersion"
            >
              <n-input
                v-model:value="formData.sinanCertVersion"
                placeholder="请输入证书规格书版本"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>
  </n-form>
</template>

<script setup lang="jsx">
import { ref, reactive } from 'vue'

// 表单数据
const formData = reactive({
  // 供应商质量体系审核
  qsaNo: '',
  auditLevel: '',
  auditScore: '',

  // 磐石临时规格书
  panshiSpecNo: '',
  panshiSpecVersion: '',

  // 司南临时规格书
  sinanSpecNo: '',
  sinanSpecVersion: '',

  // 物料号
  materialNo: '',
  materialDescription: '',
  lotNoExample: '',
  lotNamingRule: '',

  // 磐石样品
  panshiSampleRequestTime: null,
  panshiSampleQuantity: null,
  panshiSampleUnit: '',
  panshiSampleStartTime: null,
  panshiSampleEndTime: null,

  // 司南样品
  sinanSampleRequestTime: null,
  sinanSampleQuantity: null,
  sinanSampleUnit: '',
  sinanSampleStartTime: null,
  sinanSampleEndTime: null,

  // 磐石工厂验证单编号
  panshiPccbNo: '',
  panshiVerificationLevel: '',
  panshiVerificationResult: '',

  // 司南工厂验证单编号
  sinanPccbNo: '',
  sinanVerificationLevel: '',
  sinanVerificationResult: '',

  // 磐石正式规格书
  panshiCertNo: '',
  panshiCertVersion: '',

  // 司南证书规格书
  sinanCertNo: '',
  sinanCertVersion: '',

  // 增加样品需求
  totalSampleRequest: '',
  additionalTableData: [
    {
      additionalRequestTime: null,
      additionalRequestQuantity: '',
      additionalUnit: '',
      additionalExpectedCompletionTime: null,
      reason: '',
      range: '磐石',
    },
    {
      additionalRequestTime: null,
      additionalRequestQuantity: '',
      additionalUnit: '',
      additionalExpectedCompletionTime: null,
      reason: '',
      range: '司南',
    },
  ],

  // 样品来料情况
  tableData: [
    {
      completedQuantity: '',
      completedTime: null,
      incomingQuantity: '',
      unit: '',
      batch: '',
      inspectionStatus: '',
    },
    {
      completedQuantity: '',
      completedTime: null,
      incomingQuantity: '',
      unit: '',
      batch: '',
      inspectionStatus: '',
    },
  ],
})

const columns = [
  {
    title: '序号',
    key: 'index',
    align: 'center',
    width: 80,
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span>完成质检的量</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'completedQuantity',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].completedQuantity`}
        rule={{
          required: true,
          type: 'number',
          message: '请输入完成质检的量',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.completedQuantity}
          onUpdateValue={(value) => {
            row.completedQuantity = value
          }}
          placeholder="请输入完成质检的量"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>完成质检的时间</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'completedTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].completedTime`}
        rule={{
          required: true,
          type: 'number',
          message: '请选择完成质检的时间',
          trigger: ['change'],
        }}
      >
        <NDatePicker
          value={row.completedTime}
          onUpdateValue={(value) => {
            row.completedTime = value
          }}
          placeholder="请选择完成质检的时间"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>来料数量</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'incomingQuantity',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].incomingQuantity`}
        rule={{
          required: true,
          type: 'number',
          message: '请输入来料数量',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.incomingQuantity}
          onUpdateValue={(value) => {
            row.incomingQuantity = value
          }}
          placeholder="请输入来料数量"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>单位</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'unit',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].unit`}
        rule={{
          required: true,
          message: '请输入单位',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          placeholder="请输入单位"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>批次</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'batch',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].batch`}
        rule={{
          required: true,
          message: '请输入批次',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.batch}
          onUpdateValue={(value) => {
            row.batch = value
          }}
          placeholder="请输入批次"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>质检状态</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'inspectionStatus',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].inspectionStatus`}
        rule={{
          required: true,
          message: '请选择质检状态',
          trigger: ['change'],
        }}
      >
        <NRadioGroup
          value={row.inspectionStatus}
          onUpdateValue={(value) => {
            row.inspectionStatus = value
          }}
        >
          <NSpace>
            <NRadio value="Pass">Pass</NRadio>
            <NRadio value="Fail">Fail</NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
    ),
  },
]

const additionalColumns = [
  {
    title: '序号',
    key: 'index',
    align: 'center',
    width: 80,
    render: (row, index) => index + 1,
  },
  {
    title: '范围',
    key: 'range',
    align: 'center',
    width: 150,
  },
  {
    title: () => (
      <div>
        <span>增加样品需求时间</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'additionalRequestTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`additionalTableData[${index}].additionalRequestTime`}
        rule={{
          required: true,
          type: 'number',
          message: '请选择增加样品需求时间',
          trigger: ['change'],
        }}
      >
        <NDatePicker
          value={row.additionalRequestTime}
          onUpdateValue={(value) => {
            row.additionalRequestTime = value
          }}
          placeholder="请选择增加样品需求时间"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>增加样品需求数量</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'additionalRequestQuantity',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`additionalTableData[${index}].additionalRequestQuantity`}
        rule={{
          required: true,
          type: 'number',
          message: '请输入增加样品需求数量',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.additionalRequestQuantity}
          onUpdateValue={(value) => {
            row.additionalRequestQuantity = value
          }}
          placeholder="请输入增加样品需求数量"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>单位</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'additionalUnit',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`additionalTableData[${index}].additionalUnit`}
        rule={{
          required: true,
          message: '请输入单位',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.additionalUnit}
          onUpdateValue={(value) => {
            row.additionalUnit = value
          }}
          placeholder="请输入单位"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>预计完成验证时间</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'additionalExpectedCompletionTime',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`additionalTableData[${index}].additionalExpectedCompletionTime`}
        rule={{
          required: true,
          type: 'number',
          message: '请选择预计完成验证时间',
          trigger: ['change'],
        }}
      >
        <NDatePicker
          value={row.additionalExpectedCompletionTime}
          onUpdateValue={(value) => {
            row.additionalExpectedCompletionTime = value
          }}
          placeholder="请选择预计完成验证时间"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span>原因</span>
        <span class="text-red-500">*</span>
      </div>
    ),
    key: 'reason',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`additionalTableData[${index}].reason`}
        rule={{
          required: true,
          message: '请输入原因',
          trigger: ['input', 'blur'],
        }}
      >
        <NInput
          value={row.reason}
          onUpdateValue={(value) => {
            row.reason = value
          }}
          placeholder="请输入原因"
        />
      </NFormItem>
    ),
  },
]

const formRef = ref(null)

// 校验规则
const rules = {
  qsaNo: {
    required: true,
    message: '请输入QSA No',
    trigger: ['blur', 'input'],
  },
  auditLevel: {
    required: true,
    message: '请输入等级',
    trigger: ['blur', 'input'],
  },
  auditScore: {
    required: true,
    message: '请输入分数',
    trigger: ['blur', 'input'],
  },
  panshiSpecNo: {
    required: true,
    message: '请输入临时规格书编号',
    trigger: ['blur', 'input'],
  },
  panshiSpecVersion: {
    required: true,
    message: '请输入临时规格书版本',
    trigger: ['blur', 'input'],
  },
  sinanSpecNo: {
    required: true,
    message: '请输入临时规格书编号',
    trigger: ['blur', 'input'],
  },
  sinanSpecVersion: {
    required: true,
    message: '请输入临时规格书版本',
    trigger: ['blur', 'input'],
  },
  materialNo: {
    required: true,
    message: '请输入物料号',
    trigger: ['blur', 'input'],
  },
  materialDescription: {
    required: true,
    message: '请输入物料描述',
    trigger: ['blur', 'input'],
  },
  lotNoExample: {
    required: true,
    message: '请输入Lot No示例',
    trigger: ['blur', 'input'],
  },
  lotNamingRule: {
    required: true,
    message: '请输入Lot命名规则',
    trigger: ['blur', 'input'],
  },
  panshiSampleRequestTime: {
    required: true,
    message: '请选择样品需求时间',
    type: 'number',
    trigger: 'change',
  },
  panshiSampleQuantity: {
    type: 'number',
    required: true,
    message: '请输入数量',
    trigger: ['blur', 'input'],
  },
  panshiSampleUnit: {
    required: true,
    message: '请输入单位',
    trigger: ['blur', 'input'],
  },
  panshiSampleStartTime: {
    required: true,
    message: '请选择预计开始验证时间',
    trigger: 'change',
    type: 'number',
  },
  panshiSampleEndTime: {
    required: true,
    message: '请选择预计完成验证时间',
    trigger: 'change',
    type: 'number',
  },
  sinanSampleRequestTime: {
    required: true,
    message: '请选择样品需求时间',
    trigger: 'change',
    type: 'number',
  },
  sinanSampleQuantity: {
    required: true,
    message: '请输入数量',
    trigger: ['blur', 'input'],
    type: 'number',
  },
  sinanSampleUnit: {
    required: true,
    message: '请输入单位',
    trigger: ['blur', 'input'],
  },
  sinanSampleStartTime: {
    required: true,
    message: '请选择预计开始验证时间',
    trigger: 'change',
    type: 'number',
  },
  sinanSampleEndTime: {
    required: true,
    message: '请选择预计完成验证时间',
    trigger: 'change',
    type: 'number',
  },
  panshiPccbNo: {
    required: true,
    message: '请输入PCCB No',
    trigger: ['blur', 'input'],
  },
  panshiVerificationLevel: {
    required: true,
    message: '请输入厂内验证等级',
    trigger: ['blur', 'input'],
  },
  panshiVerificationResult: {
    required: true,
    message: '请选择结果',
    trigger: 'change',
  },
  sinanPccbNo: {
    required: true,
    message: '请输入PCCB No',
    trigger: ['blur', 'input'],
  },
  sinanVerificationLevel: {
    required: true,
    message: '请输入厂内验证等级',
    trigger: ['blur', 'input'],
  },
  sinanVerificationResult: {
    required: true,
    message: '请选择结果',
    trigger: 'change',
  },
  panshiCertNo: {
    required: true,
    message: '请输入正式规格书编号',
    trigger: ['blur', 'input'],
  },
  panshiCertVersion: {
    required: true,
    message: '请输入正式规格书版本',
    trigger: ['blur', 'input'],
  },
  sinanCertNo: {
    required: true,
    message: '请输入证书规格书编号',
    trigger: ['blur', 'input'],
  },
  sinanCertVersion: {
    required: true,
    message: '请输入证书规格书版本',
    trigger: ['blur', 'input'],
  },
  totalSampleRequest: {
    required: true,
    message: '请输入样品需求总量',
    trigger: ['blur', 'input'],
    type: 'number',
  },
}

const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
// 暴露方法给父组件
defineExpose({
  validateForm,
  getFormData: () => formData,
})
</script>

<style scoped>
.n-form-item {
  margin-bottom: 24px;
}
</style>
