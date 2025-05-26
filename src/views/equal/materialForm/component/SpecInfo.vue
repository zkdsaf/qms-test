<template>
  <n-space class="mb-4" justify="end">
    <n-button
      type="primary"
      v-if="importTypeValue === '2nd Source'"
      @click="handleCompare"
      color="#2080f0"
    >
      <template #icon>
        <n-icon>
          <GitCompare />
        </n-icon>
      </template>
      对比结果
    </n-button>
    <n-button type="primary" @click="handleSync" color="#18a058">
      <template #icon>
        <n-icon>
          <SyncSharp />
        </n-icon>
      </template>
      点击此处将参数数据同步至Performance比对、SPEC合理性、COA质检能力
    </n-button>
    <n-button
      v-if="importTypeValue !== '2nd Source'"
      @click="handleDownloadTemplate"
      color="#2080f0"
    >
      <template #icon>
        <n-icon>
          <CloudDownloadOutline />
        </n-icon>
      </template>
      下载导入模版
    </n-button>
    <n-upload
      v-if="importTypeValue !== '2nd Source'"
      :show-file-list="true"
      :on-change="handleImportChange"
    >
      <n-button color="#2080f0">
        <template #icon>
          <n-icon>
            <CloudUploadOutline />
          </n-icon>
        </template>
        导入
      </n-button>
    </n-upload>
    <n-button
      v-if="importTypeValue === '2nd Source'"
      @click="handleAddOtherSource"
      color="#2080f0"
    >
      <template #icon>
        <n-icon>
          <AddSharp />
        </n-icon>
      </template>
      添加Other Source比对
    </n-button>
    <n-button color="#18a058" @click="handleExport">
      <template #icon>
        <n-icon>
          <CloudDownloadOutline />
        </n-icon>
      </template>
      导出
    </n-button>
  </n-space>
  <custom-form
    ref="formRef"
    :fields="formFields"
    :form-data="formData"
    :readonly="readonly"
    @field-change="handleFieldChange"
    label-width="160"
  >
    <template #file="{ field }">
      <file-upload
        v-bind="field.props"
        @change="handleFileChange('file', $event)"
        :value="formData.file"
        disabled
      >
        <n-icon
          :component="CloudUploadOutline"
          size="28"
          class="cursor-pointer"
        ></n-icon>
      </file-upload>
    </template>

    <template #specTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
        </n-scrollbar>
        <div class="flex justify-end">
          <n-button type="primary" @click="handleAddRow" v-if="!readonly">
            添加
          </n-button>
        </div>
      </n-space>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'
import {
  CloudUploadOutline,
  CloudDownloadOutline,
  GitCompare,
  SyncSharp,
  AddSharp,
} from '@vicons/ionicons5'

const props = defineProps({
  formData: {
    type: Object,
    default: () => null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  importTypeValue: {
    type: String,
    default: '',
  },
})

const message = useMessage()

// 基础默认值
const defaultRowData = {
  category: '默认类别',
  parameter: '默认参数',
  unit: '默认单位',
  // Baseline Source fields
  upperSymbol: '≤',
  upperSpec: '0',
  lowerSymbol: '≥',
  lowerSpec: '0',
  measurementMethod: '默认测量方法',
  measurementTool: '默认测量工具',
  stcUclUnit: '默认单位',
  stcUcl: '0',
  stcLclUnit: '默认单位',
  stcLcl: '0',
  detectionLimit: '0',
  coaReport: '是',
  selfInspection: '是',
  remark: '无',
  // 2nd Source fields
  secondUpperSymbol: '≤',
  secondUpperSpec: '0',
  secondLowerSymbol: '≥',
  secondLowerSpec: '0',
  secondMeasurementMethod: '默认测量方法',
  secondMeasurementTool: '默认测量工具',
  secondStcUclUnit: '默认单位',
  secondStcUcl: '0',
  secondStcLclUnit: '默认单位',
  secondStcLcl: '0',
  secondDetectionLimit: '0',
  secondCoaReport: '是',
  secondSelfInspection: '是',
  failRiskAssessment: '无风险',
  comparisonResult: '符合要求',
}

// 表单数据
const formData = ref({
  specTableData: [
    {
      id: 1,
      ...defaultRowData,
    },
  ],
  file: [
    {
      status: 'finished',
      name: 'SPEC导入模版.xlsx',
      type: '.xlsx',
      id: '1',
    },
  ],
  moduleResult: null,
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
const columns = computed(() => {
  const baseColumns = [
    {
      title: () => (
        <div>
          <span style="color: red">*</span>
          <span>类别</span>
        </div>
      ),
      key: 'category',
      align: 'center',
      width: 120,
      render: (row, index) => (
        <NFormItem
          path={`specTableData[${index}].category`}
          rule={{
            required: true,
            message: '请输入',
            trigger: ['blur', 'change'],
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
          <span style="color: red">*</span>
          <span>参数</span>
        </div>
      ),
      key: 'parameter',
      align: 'center',
      width: 120,
      render: (row, index) => (
        <NFormItem
          path={`specTableData[${index}].parameter`}
          rule={{
            required: true,
            message: '请输入',
            trigger: ['blur', 'change'],
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
          <span style="color: red">*</span>
          <span>单位</span>
        </div>
      ),
      key: 'unit',
      align: 'center',
      width: 120,
      render: (row, index) => (
        <NFormItem
          path={`specTableData[${index}].unit`}
          rule={{
            required: true,
            message: '请输入',
            trigger: ['blur', 'change'],
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
      title: 'Baseline Source',
      align: 'center',
      children: [
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>上规格符号</span>
            </div>
          ),
          key: 'upperSymbol',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].upperSymbol`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NSelect
                value={row.upperSymbol}
                onUpdateValue={(value) => {
                  row.upperSymbol = value
                }}
                options={[
                  { label: '≤', value: '≤' },
                  { label: '<', value: '<' },
                  { label: '≥', value: '≥' },
                  { label: '>', value: '>' },
                ]}
                placeholder="请选择"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>上规格</span>
            </div>
          ),
          key: 'upperSpec',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].upperSpec`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.upperSpec}
                onUpdateValue={(value) => {
                  row.upperSpec = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>下规格符号</span>
            </div>
          ),
          key: 'lowerSymbol',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].lowerSymbol`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NSelect
                value={row.lowerSymbol}
                onUpdateValue={(value) => {
                  row.lowerSymbol = value
                }}
                options={[
                  { label: '≤', value: '≤' },
                  { label: '<', value: '<' },
                  { label: '≥', value: '≥' },
                  { label: '>', value: '>' },
                ]}
                placeholder="请选择"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>下规格</span>
            </div>
          ),
          key: 'lowerSpec',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].lowerSpec`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.lowerSpec}
                onUpdateValue={(value) => {
                  row.lowerSpec = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>测量方法</span>
            </div>
          ),
          key: 'measurementMethod',
          align: 'center',
          width: 120,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].measurementMethod`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.measurementMethod}
                onUpdateValue={(value) => {
                  row.measurementMethod = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>测量工具</span>
            </div>
          ),
          key: 'measurementTool',
          align: 'center',
          width: 120,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].measurementTool`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.measurementTool}
                onUpdateValue={(value) => {
                  row.measurementTool = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>STC-UCL单位</span>
            </div>
          ),
          key: 'stcUclUnit',
          align: 'center',
          width: 120,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].stcUclUnit`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.stcUclUnit}
                onUpdateValue={(value) => {
                  row.stcUclUnit = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>STC-UCL</span>
            </div>
          ),
          key: 'stcUcl',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].stcUcl`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.stcUcl}
                onUpdateValue={(value) => {
                  row.stcUcl = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>STC-LCL单位</span>
            </div>
          ),
          key: 'stcLclUnit',
          align: 'center',
          width: 120,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].stcLclUnit`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.stcLclUnit}
                onUpdateValue={(value) => {
                  row.stcLclUnit = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>STC-LCL</span>
            </div>
          ),
          key: 'stcLcl',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].stcLcl`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.stcLcl}
                onUpdateValue={(value) => {
                  row.stcLcl = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>检出限</span>
            </div>
          ),
          key: 'detectionLimit',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].detectionLimit`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
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
              <span style="color: red">*</span>
              <span>COA报告项</span>
            </div>
          ),
          key: 'coaReport',
          align: 'center',
          width: 130,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].coaReport`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NRadioGroup
                value={row.coaReport}
                onUpdateValue={(value) => {
                  row.coaReport = value
                }}
              >
                <NSpace>
                  <NRadio value="是">是</NRadio>
                  <NRadio value="否">否</NRadio>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
          ),
        },
        {
          title: () => (
            <div>
              <span style="color: red">*</span>
              <span>自检能力</span>
            </div>
          ),
          key: 'selfInspection',
          align: 'center',
          width: 130,
          render: (row, index) => (
            <NFormItem
              path={`specTableData[${index}].selfInspection`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NRadioGroup
                value={row.selfInspection}
                onUpdateValue={(value) => {
                  row.selfInspection = value
                }}
              >
                <NSpace>
                  <NRadio value="是">是</NRadio>
                  <NRadio value="否">否</NRadio>
                </NSpace>
              </NRadioGroup>
            </NFormItem>
          ),
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          width: 120,
          render: (row) => (
            <NInput
              value={row.remark}
              onUpdateValue={(value) => {
                row.remark = value
              }}
              placeholder="请输入"
            />
          ),
        },
      ],
    },
  ]

  if (props.importTypeValue === '2nd Source') {
    baseColumns.push(
      {
        title: '2nd Source',
        align: 'center',
        children: [
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>上规格符号</span>
              </div>
            ),
            key: 'secondUpperSymbol',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondUpperSymbol`}
                rule={{
                  required: true,
                  message: '请选择',
                  trigger: ['blur', 'change'],
                }}
              >
                <NSelect
                  value={row.secondUpperSymbol}
                  onUpdateValue={(value) => {
                    row.secondUpperSymbol = value
                  }}
                  options={[
                    { label: '≤', value: '≤' },
                    { label: '<', value: '<' },
                    { label: '≥', value: '≥' },
                    { label: '>', value: '>' },
                  ]}
                  placeholder="请选择"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>上规格</span>
              </div>
            ),
            key: 'secondUpperSpec',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondUpperSpec`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondUpperSpec}
                  onUpdateValue={(value) => {
                    row.secondUpperSpec = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>下规格符号</span>
              </div>
            ),
            key: 'secondLowerSymbol',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondLowerSymbol`}
                rule={{
                  required: true,
                  message: '请选择',
                  trigger: ['blur', 'change'],
                }}
              >
                <NSelect
                  value={row.secondLowerSymbol}
                  onUpdateValue={(value) => {
                    row.secondLowerSymbol = value
                  }}
                  options={[
                    { label: '≤', value: '≤' },
                    { label: '<', value: '<' },
                    { label: '≥', value: '≥' },
                    { label: '>', value: '>' },
                  ]}
                  placeholder="请选择"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>下规格</span>
              </div>
            ),
            key: 'secondLowerSpec',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondLowerSpec`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondLowerSpec}
                  onUpdateValue={(value) => {
                    row.secondLowerSpec = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>测量方法</span>
              </div>
            ),
            key: 'secondMeasurementMethod',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondMeasurementMethod`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondMeasurementMethod}
                  onUpdateValue={(value) => {
                    row.secondMeasurementMethod = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>测量工具</span>
              </div>
            ),
            key: 'secondMeasurementTool',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondMeasurementTool`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondMeasurementTool}
                  onUpdateValue={(value) => {
                    row.secondMeasurementTool = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>STC-UCL单位</span>
              </div>
            ),
            key: 'secondStcUclUnit',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondStcUclUnit`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondStcUclUnit}
                  onUpdateValue={(value) => {
                    row.secondStcUclUnit = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>STC-UCL</span>
              </div>
            ),
            key: 'secondStcUcl',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondStcUcl`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondStcUcl}
                  onUpdateValue={(value) => {
                    row.secondStcUcl = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>STC-LCL单位</span>
              </div>
            ),
            key: 'secondStcLclUnit',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondStcLclUnit`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondStcLclUnit}
                  onUpdateValue={(value) => {
                    row.secondStcLclUnit = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>STC-LCL</span>
              </div>
            ),
            key: 'secondStcLcl',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondStcLcl`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondStcLcl}
                  onUpdateValue={(value) => {
                    row.secondStcLcl = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>检出限</span>
              </div>
            ),
            key: 'secondDetectionLimit',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondDetectionLimit`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondDetectionLimit}
                  onUpdateValue={(value) => {
                    row.secondDetectionLimit = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>COA报告项</span>
              </div>
            ),
            key: 'secondCoaReport',
            align: 'center',
            width: 130,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondCoaReport`}
                rule={{
                  required: true,
                  message: '请选择',
                  trigger: ['blur', 'change'],
                }}
              >
                <NRadioGroup
                  value={row.secondCoaReport}
                  onUpdateValue={(value) => {
                    row.secondCoaReport = value
                  }}
                >
                  <NSpace>
                    <NRadio value="是">是</NRadio>
                    <NRadio value="否">否</NRadio>
                  </NSpace>
                </NRadioGroup>
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>自检能力</span>
              </div>
            ),
            key: 'secondSelfInspection',
            align: 'center',
            width: 130,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].secondSelfInspection`}
                rule={{
                  required: true,
                  message: '请选择',
                  trigger: ['blur', 'change'],
                }}
              >
                <NRadioGroup
                  value={row.secondSelfInspection}
                  onUpdateValue={(value) => {
                    row.secondSelfInspection = value
                  }}
                >
                  <NSpace>
                    <NRadio value="是">是</NRadio>
                    <NRadio value="否">否</NRadio>
                  </NSpace>
                </NRadioGroup>
              </NFormItem>
            ),
          },
          {
            title: () => (
              <div>
                <span style="color: red">*</span>
                <span>Fail项风险评估说明</span>
              </div>
            ),
            key: 'failRiskAssessment',
            align: 'center',
            width: 150,
            render: (row, index) => (
              <NFormItem
                path={`specTableData[${index}].failRiskAssessment`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.failRiskAssessment}
                  onUpdateValue={(value) => {
                    row.failRiskAssessment = value
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
            <span style="color: red">*</span>
            <span>对比结果</span>
          </div>
        ),
        key: 'comparisonResult',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`specTableData[${index}].comparisonResult`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'change'],
            }}
          >
            <NInput
              value={row.comparisonResult}
              onUpdateValue={(value) => {
                row.comparisonResult = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      }
    )
  }

  // 添加操作列
  baseColumns.push({
    title: '操作',
    align: 'center',
    width: 80,
    key: 'action',
    render: (row, index) => (
      <NPopconfirm
        onPositiveClick={() => formData.value.specTableData.splice(index, 1)}
      >
        {{
          trigger: () =>
            !props.readonly ? (
              <NButton type="error" size="small">
                删除
              </NButton>
            ) : (
              <div></div>
            ),
          default: () => '确定删除吗？',
        }}
      </NPopconfirm>
    ),
  })

  return baseColumns
})

// 表单字段配置
const formFields = ref([
  {
    key: 'file',
    label: '导入附件原件',
    type: 'input',
    props: {
      action: '/api/upload',
      accept: '.jpg,.png,.pdf',
      max: 3,
      listType: 'text',
      multiple: true,
      'show-download-button': true,
      'show-remove-button': true,
    },
    listenChange: true,
    span: '3 m:3 l:3',
    visibleWhen: () => props.importTypeValue !== '2nd Source',
  },
  {
    key: 'moduleResult',
    label: '使用部门评论结论',
    type: 'radio',
    rules: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
    props: {
      options: [
        { label: 'Pass', value: 'Pass' },
        { label: 'Fail', value: 'Fail' },
        { label: '不提供', value: 'Not Provided' },
      ],
      placeholder: '请选择',
      clearable: true,
    },
    listenChange: true,
    span: '3 m:1 l:1',
  },
  {
    key: 'specTableData',
    label: '',
    type: 'table',
    dataKey: 'specTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.specTableData),
      columns: computed(() =>
        !props.readonly
          ? columns.value
          : columns.value.filter((item) => item.key !== 'action')
      ),
      rowKey: (row) => row.id,
      'scroll-x': 1000,
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

const handleAddRow = () => {
  formData.value.specTableData.push({
    id: Date.now(),
    ...defaultRowData,
  })
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

const handleCompare = () => {
  message.info('对比结果功能开发中')
}

const handleSync = () => {
  message.info('数据同步功能开发中')
}

const handleDownloadTemplate = () => {
  message.info('模板下载功能开发中')
}

const handleAddOtherSource = () => {
  message.info('添加Other Source比对功能开发中')
}

const handleExport = () => {
  message.info('导出功能开发中')
}

const handleImportChange = ({ file }) => {
  console.log('🚀 ~ file:', file)
  message.success('导入成功')
  // 更新formData.file
  formData.value.file = [
    {
      ...file,
      status: 'finished',
    },
  ]
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
