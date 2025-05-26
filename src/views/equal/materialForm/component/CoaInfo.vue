<template>
  <n-space class="mb-4" justify="end">
    <n-button @click="handleDownloadTemplate" color="#2080f0">
      <template #icon>
        <n-icon>
          <CloudDownloadOutline />
        </n-icon>
      </template>
      下载导入模版
    </n-button>
    <n-upload :show-file-list="false" :on-change="handleImportChange">
      <n-button color="#2080f0">
        <template #icon>
          <n-icon>
            <CloudUploadOutline />
          </n-icon>
        </template>
        导入
      </n-button>
    </n-upload>

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

    <template #coaTableData="{ field }">
      <n-space vertical class="w-full">
        <n-scrollbar x-scrollable trigger="none">
          <n-data-table v-bind="field.props"> </n-data-table>
        </n-scrollbar>
      </n-space>
    </template>
  </custom-form>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'
import { CloudUploadOutline, CloudDownloadOutline } from '@vicons/ionicons5'

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

// 基础默认值
const defaultRowData = {
  category: '默认类别',
  parameter: '默认参数',
  unit: '默认单位',
  // 基本信息
  isSelfInspection: '否',
  isSPCControl: '否',
  spcControl: '无',
  // COA数据来源
  coaDataSource: '供应商提供',
  coaAnalysisMethod: '标准方法',
  coaAnalysisFrequency: '每批次',
  coaValueMethod: '平均值',
  coaSamplingPoint: '生产线末端',
  coaAnalysisLocation: '实验室',
  // 留样状况
  isCoaSample: '否',
  coaSampleStoragePeriod: '12个月',
  // 分析仪器状况
  instrumentName: '分析仪',
  instrumentModel: '标准型号',
  instrumentQuantity: '1',
  mdl: '0.01',
}

// 表单数据
const formData = ref({
  coaTableData: [
    {
      id: 1,
      ...defaultRowData,
    },
  ],
  file: [
    {
      status: 'finished',
      name: 'COA质检能力导入模版.xlsx',
      type: '.xlsx',
      id: '1',
    },
  ],
  moduleResult: 'Pass',
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
  return [
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
          path={`coaTableData[${index}].category`}
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
          path={`coaTableData[${index}].parameter`}
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
          path={`coaTableData[${index}].unit`}
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
      title: '基本信息',
      align: 'center',
      children: [
        {
          title: '是否成品批次自检',
          key: 'isSelfInspection',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].isSelfInspection`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NRadioGroup
                value={row.isSelfInspection}
                onUpdateValue={(value) => {
                  row.isSelfInspection = value
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
          title: '是否SPC管控',
          key: 'isSPCControl',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].isSPCControl`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NRadioGroup
                value={row.isSPCControl}
                onUpdateValue={(value) => {
                  row.isSPCControl = value
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
          title: 'SPC管控',
          key: 'spcControl',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].spcControl`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.spcControl}
                onUpdateValue={(value) => {
                  row.spcControl = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
      ],
    },
    {
      title: 'COA数据来源',
      align: 'center',
      children: [
        {
          title: 'COA数据来源',
          key: 'coaDataSource',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaDataSource`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaDataSource}
                onUpdateValue={(value) => {
                  row.coaDataSource = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA分析方式',
          key: 'coaAnalysisMethod',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaAnalysisMethod`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaAnalysisMethod}
                onUpdateValue={(value) => {
                  row.coaAnalysisMethod = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA分析频率',
          key: 'coaAnalysisFrequency',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaAnalysisFrequency`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaAnalysisFrequency}
                onUpdateValue={(value) => {
                  row.coaAnalysisFrequency = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA取值方法',
          key: 'coaValueMethod',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaValueMethod`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaValueMethod}
                onUpdateValue={(value) => {
                  row.coaValueMethod = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA分析取样点',
          key: 'coaSamplingPoint',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaSamplingPoint`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaSamplingPoint}
                onUpdateValue={(value) => {
                  row.coaSamplingPoint = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA分析方法',
          key: 'coaAnalysisMethod',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaAnalysisMethod`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaAnalysisMethod}
                onUpdateValue={(value) => {
                  row.coaAnalysisMethod = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'COA分析地点',
          key: 'coaAnalysisLocation',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaAnalysisLocation`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaAnalysisLocation}
                onUpdateValue={(value) => {
                  row.coaAnalysisLocation = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
      ],
    },
    {
      title: '留样状况',
      align: 'center',
      children: [
        {
          title: '是否COA留样',
          key: 'isCoaSample',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].isCoaSample`}
              rule={{
                required: true,
                message: '请选择',
                trigger: ['blur', 'change'],
              }}
            >
              <NRadioGroup
                value={row.isCoaSample}
                onUpdateValue={(value) => {
                  row.isCoaSample = value
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
          title: 'COA留样保存期限',
          key: 'coaSampleStoragePeriod',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].coaSampleStoragePeriod`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.coaSampleStoragePeriod}
                onUpdateValue={(value) => {
                  row.coaSampleStoragePeriod = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
      ],
    },
    {
      title: '分析仪器状况',
      align: 'center',
      children: [
        {
          title: '仪器名称',
          key: 'instrumentName',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].instrumentName`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.instrumentName}
                onUpdateValue={(value) => {
                  row.instrumentName = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: '仪器型号',
          key: 'instrumentModel',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].instrumentModel`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.instrumentModel}
                onUpdateValue={(value) => {
                  row.instrumentModel = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: '仪器数量',
          key: 'instrumentQuantity',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].instrumentQuantity`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.instrumentQuantity}
                onUpdateValue={(value) => {
                  row.instrumentQuantity = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'MDL(检出限)',
          key: 'mdl',
          align: 'center',
          width: 150,
          render: (row, index) => (
            <NFormItem
              path={`coaTableData[${index}].mdl`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.mdl}
                onUpdateValue={(value) => {
                  row.mdl = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
      ],
    },
  ]
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
    key: 'coaTableData',
    label: '',
    type: 'table',
    dataKey: 'coaTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.coaTableData),
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

const handleDownloadTemplate = () => {
  message.info('模板下载功能开发中')
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
