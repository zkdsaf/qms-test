<template>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
  >
    <template #file="{ field }">
      <file-upload
        v-bind="field.props"
        @change="handleFileChange('file', $event)"
        :value="formData.file"
        :disabled="readonly"
      >
        <n-icon
          :component="CloudUploadOutline"
          size="28"
          class="cursor-pointer"
        ></n-icon>
      </file-upload>
    </template>

    <template #tableData="{ field }">
      <n-data-table v-bind="field.props"> </n-data-table>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'
import { CloudUploadOutline } from '@vicons/ionicons5'

const props = defineProps({
  formData: {
    type: Object,
    default: () => null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  file: [],
  tableData: [
    {
      id: 1,
      vendorBatchNo: null,
      containerNo: null,
      effectTime: null,
      arrivalTime: null,
      category: null, // 类别
      parameter: null, // 参数
      unit: null, // 单位
      keyNoKey: null, // Key/No-Key
      batchQuantity: null, // 批次数量
      batchUnit: null, // 批次单位
      controlLimitRule: null, // 控制限标准Rule
      upperLimitSymbol: null, // 上规格线符号
      upperLimit: null, // 上规格限
      lowerLimitSymbol: null, // 下规格限符号
      lowerLimit: null, // 下规格限
      detectionLimit: null, // 检出限
      averageValue: null, // 平均值
      standardDeviation: null, // 标准差
      controlLineComparison: null, // 控制线对比
      cooperationMechanism: null, // 配合机制
      panshiOpinion: null, // 使用部门意见-磐石
      sinanOpinion: null, // 使用部门意见-司南
      panshiEnableRule: null, // 厂内是否启用标准规则控制线-磐石
      sinanEnableRule: null, // 厂内是否启用标准规则控制线-司南
      stcSpecPush: null, // STC机制推送SPEC
      stcEcoaPush: null, // STC机制推送ECOA
      remark: null, // 备注
      // 标准规则控制线
      standardUpperLimitSymbol: null, // 上控制限符号
      standardUpperLimit: null, // 上控制限
      standardLowerLimit: null, // 下控制限
      standardLowerLimitSymbol: null, // 下控制线符号
      // 供应商同意控制限
      supplierUpperLimitSymbol: null, // 上控制限符号
      supplierUpperLimit: null, // 上控制限
      supplierLowerLimit: null, // 下控制限
      supplierLowerLimitSymbol: null, // 下控制线符号
    },
  ],
})

watch(
  () => props.formData,
  (newVal) => {
    if (newVal) {
      // 遍历 formData 的所有字段
      Object.keys(formData.value).forEach((key) => {
        // 如果 props.formData 中对应的字段有值，则更新
        if (newVal[key] !== undefined && newVal[key] !== null) {
          formData.value[key] = newVal[key]
        }
      })
    }
  },
  { deep: true, immediate: true }
)

// 表格列定义（使用 JSX）
const columns = [
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>类别</span>
      </div>
    ),
    key: 'category',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].category`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.category}
          onUpdateValue={(value) => {
            row.category = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>参数</span>
      </div>
    ),
    key: 'parameter',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].parameter`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.parameter}
          onUpdateValue={(value) => {
            row.parameter = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>单位</span>
      </div>
    ),
    key: 'unit',
    align: 'center',
    width: 100,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].unit`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.unit}
          onUpdateValue={(value) => {
            row.unit = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>Key/No-Key</span>
      </div>
    ),
    key: 'keyNoKey',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].keyNoKey`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.keyNoKey}
          onUpdateValue={(value) => {
            row.keyNoKey = value
          }}
          options={[
            { label: 'Key', value: 'Key' },
            { label: 'No-Key', value: 'No-Key' },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>批次数量</span>
      </div>
    ),
    key: 'batchQuantity',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].batchQuantity`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.batchQuantity}
          onUpdateValue={(value) => {
            row.batchQuantity = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>批次单位</span>
      </div>
    ),
    key: 'batchUnit',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].batchUnit`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.batchUnit}
          onUpdateValue={(value) => {
            row.batchUnit = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>控制限标准Rule</span>
      </div>
    ),
    key: 'controlLimitRule',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].controlLimitRule`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.controlLimitRule}
          onUpdateValue={(value) => {
            row.controlLimitRule = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>上规格线符号</span>
      </div>
    ),
    key: 'upperLimitSymbol',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].upperLimitSymbol`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.upperLimitSymbol}
          onUpdateValue={(value) => {
            row.upperLimitSymbol = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>上规格限</span>
      </div>
    ),
    key: 'upperLimit',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].upperLimit`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.upperLimit}
          onUpdateValue={(value) => {
            row.upperLimit = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>下规格限符号</span>
      </div>
    ),
    key: 'lowerLimitSymbol',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].lowerLimitSymbol`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.lowerLimitSymbol}
          onUpdateValue={(value) => {
            row.lowerLimitSymbol = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>下规格限</span>
      </div>
    ),
    key: 'lowerLimit',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].lowerLimit`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.lowerLimit}
          onUpdateValue={(value) => {
            row.lowerLimit = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>检出限</span>
      </div>
    ),
    key: 'detectionLimit',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].detectionLimit`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.detectionLimit}
          onUpdateValue={(value) => {
            row.detectionLimit = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>平均值</span>
      </div>
    ),
    key: 'averageValue',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].averageValue`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.averageValue}
          onUpdateValue={(value) => {
            row.averageValue = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>标准差</span>
      </div>
    ),
    key: 'standardDeviation',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].standardDeviation`}
        rule={{
          type: 'number',
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInputNumber
          value={row.standardDeviation}
          onUpdateValue={(value) => {
            row.standardDeviation = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>标准规则控制线</span>
      </div>
    ),
    key: 'standardControlLimit',
    align: 'center',
    children: [
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>上控制限符号</span>
          </div>
        ),
        key: 'standardUpperLimitSymbol',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].standardUpperLimitSymbol`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.standardUpperLimitSymbol}
              onUpdateValue={(value) => {
                row.standardUpperLimitSymbol = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>上控制限</span>
          </div>
        ),
        key: 'standardUpperLimit',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].standardUpperLimit`}
            rule={{
              type: 'number',
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInputNumber
              value={row.standardUpperLimit}
              onUpdateValue={(value) => {
                row.standardUpperLimit = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>下控制限</span>
          </div>
        ),
        key: 'standardLowerLimit',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].standardLowerLimit`}
            rule={{
              type: 'number',
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInputNumber
              value={row.standardLowerLimit}
              onUpdateValue={(value) => {
                row.standardLowerLimit = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>下控制线符号</span>
          </div>
        ),
        key: 'standardLowerLimitSymbol',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].standardLowerLimitSymbol`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.standardLowerLimitSymbol}
              onUpdateValue={(value) => {
                row.standardLowerLimitSymbol = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
    ],
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应商同意控制限</span>
      </div>
    ),
    key: 'supplierControlLimit',
    align: 'center',
    children: [
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>上控制限符号</span>
          </div>
        ),
        key: 'supplierUpperLimitSymbol',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].supplierUpperLimitSymbol`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.supplierUpperLimitSymbol}
              onUpdateValue={(value) => {
                row.supplierUpperLimitSymbol = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>上控制限</span>
          </div>
        ),
        key: 'supplierUpperLimit',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].supplierUpperLimit`}
            rule={{
              type: 'number',
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInputNumber
              value={row.supplierUpperLimit}
              onUpdateValue={(value) => {
                row.supplierUpperLimit = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>下控制限</span>
          </div>
        ),
        key: 'supplierLowerLimit',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].supplierLowerLimit`}
            rule={{
              type: 'number',
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInputNumber
              value={row.supplierLowerLimit}
              onUpdateValue={(value) => {
                row.supplierLowerLimit = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
      {
        title: () => (
          <div>
            <span class="text-red-500">*</span>
            <span>下控制线符号</span>
          </div>
        ),
        key: 'supplierLowerLimitSymbol',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`tableData[${index}].supplierLowerLimitSymbol`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'input'],
            }}
          >
            <NInput
              value={row.supplierLowerLimitSymbol}
              onUpdateValue={(value) => {
                row.supplierLowerLimitSymbol = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      },
    ],
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>控制线对比</span>
      </div>
    ),
    key: 'controlLineComparison',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].controlLineComparison`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.controlLineComparison}
          onUpdateValue={(value) => {
            row.controlLineComparison = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>配合机制</span>
      </div>
    ),
    key: 'cooperationMechanism',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].cooperationMechanism`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.cooperationMechanism}
          onUpdateValue={(value) => {
            row.cooperationMechanism = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门意见-磐石</span>
      </div>
    ),
    key: 'panshiOpinion',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].panshiOpinion`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.panshiOpinion}
          onUpdateValue={(value) => {
            row.panshiOpinion = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>使用部门意见-司南</span>
      </div>
    ),
    key: 'sinanOpinion',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].sinanOpinion`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.sinanOpinion}
          onUpdateValue={(value) => {
            row.sinanOpinion = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>厂内是否启用标准规则控制线-磐石</span>
      </div>
    ),
    key: 'panshiEnableRule',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].panshiEnableRule`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.panshiEnableRule}
          onUpdateValue={(value) => {
            row.panshiEnableRule = value
          }}
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>厂内是否启用标准规则控制线-司南</span>
      </div>
    ),
    key: 'sinanEnableRule',
    align: 'center',
    width: 200,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].sinanEnableRule`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.sinanEnableRule}
          onUpdateValue={(value) => {
            row.sinanEnableRule = value
          }}
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>STC机制推送SPEC</span>
      </div>
    ),
    key: 'stcSpecPush',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].stcSpecPush`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.stcSpecPush}
          onUpdateValue={(value) => {
            row.stcSpecPush = value
          }}
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>STC机制推送ECOA</span>
      </div>
    ),
    key: 'stcEcoaPush',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].stcEcoaPush`}
        rule={{
          required: true,
          message: '请选择',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.stcEcoaPush}
          onUpdateValue={(value) => {
            row.stcEcoaPush = value
          }}
          options={[
            { label: '是', value: true },
            { label: '否', value: false },
          ]}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>备注</span>
      </div>
    ),
    key: 'remark',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].remark`}
        rule={{
          required: true,
          message: '请输入',
          trigger: ['blur', 'input'],
        }}
      >
        <NInput
          value={row.remark}
          onUpdateValue={(value) => {
            row.remark = value
          }}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'file',
    label: '异常附件',
    type: 'input',
    rules: [
      {
        key: 'file',
        required: true,
        validator: (rule, value) => {
          if (!value || value.length === 0) {
            return new Error('请至少上传一个文件')
          }
          return true
        },
        trigger: ['change'],
      },
    ],
    props: {
      action: '/api/upload',
      accept: '.jpg,.png,.pdf',
      max: 3,
      listType: 'text',
      multiple: true,
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
  {
    key: 'tableData',
    label: '',
    type: 'table',
    dataKey: 'tableData', // 指定表格数据在 formModel 中的键
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.tableData),
      columns: columns,
      rowKey: (row) => row.id, // 表格行主键
    },
    listenChange: true,
    span: '3 m:3 l:3 xl:3',
  },
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
}

const handleFileChange = (key, finishedFiles) => {
  console.log(`插槽化 - 上传完成的 ${key} fileList:`, finishedFiles)
  formData.value[key] = finishedFiles
  formRef.value?.validate(
    (errors) => {
      if (errors) {
        console.error(errors)
      }
    },
    (rule) => rule?.key === 'file'
  )
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
  getFormData: () => formData.value,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入 */
</style>
