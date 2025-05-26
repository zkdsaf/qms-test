<template>
  <n-space class="mb-4" justify="end">
    <n-button
      v-if="importTypeValue === '2nd Source'"
      @click="message.success('获取SPC数据功能开发中')"
      color="#2080f0"
    >
      <template #icon>
        <n-icon>
          <ArrowDownOutline />
        </n-icon>
      </template>
      获取SPC数据
    </n-button>

    <n-button
      v-if="importTypeValue === '2nd Source'"
      @click="message.success('SPC对比功能开发中')"
      color="#2080f0"
    >
      <template #icon>
        <n-icon>
          <GitCompare />
        </n-icon>
      </template>
      SPC对比
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
      :show-file-list="false"
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

    <template #performanceTableData="{ field }">
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
import {
  CloudUploadOutline,
  CloudDownloadOutline,
  GitCompare,
  ArrowDownOutline,
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
  sampleSize: '0',
  average: '0',
  std: '0',
  // 2nd Source fields
  secondSampleSize: '0',
  secondAverage: '0',
  secondStd: '0',
  // SPC对比 fields
  mr1: '0',
  mr2: '0',
  // 其他字段
  comparisonResult: '符合要求',
  riskDescription: '无风险',
}

// 表单数据
const formData = ref({
  performanceTableData: [
    {
      id: 1,
      ...defaultRowData,
    },
  ],
  file: [
    {
      status: 'finished',
      name: 'Performance比对导入模版.xlsx',
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
          path={`performanceTableData[${index}].category`}
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
          path={`performanceTableData[${index}].parameter`}
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
          path={`performanceTableData[${index}].unit`}
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
          title: '样本量',
          key: 'sampleSize',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`performanceTableData[${index}].sampleSize`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.sampleSize}
                onUpdateValue={(value) => {
                  row.sampleSize = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'Average',
          key: 'average',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`performanceTableData[${index}].average`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.average}
                onUpdateValue={(value) => {
                  row.average = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
          ),
        },
        {
          title: 'STD',
          key: 'std',
          align: 'center',
          width: 100,
          render: (row, index) => (
            <NFormItem
              path={`performanceTableData[${index}].std`}
              rule={{
                required: true,
                message: '请输入',
                trigger: ['blur', 'change'],
              }}
            >
              <NInput
                value={row.std}
                onUpdateValue={(value) => {
                  row.std = value
                }}
                placeholder="请输入"
              />
            </NFormItem>
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
            title: '样本量',
            key: 'secondSampleSize',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`performanceTableData[${index}].secondSampleSize`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondSampleSize}
                  onUpdateValue={(value) => {
                    row.secondSampleSize = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: 'Average',
            key: 'secondAverage',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`performanceTableData[${index}].secondAverage`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondAverage}
                  onUpdateValue={(value) => {
                    row.secondAverage = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: 'STD',
            key: 'secondStd',
            align: 'center',
            width: 100,
            render: (row, index) => (
              <NFormItem
                path={`performanceTableData[${index}].secondStd`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.secondStd}
                  onUpdateValue={(value) => {
                    row.secondStd = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
        ],
      },
      {
        title: 'SPC对比',
        align: 'center',
        children: [
          {
            title: 'MR1(<=0.5)',
            key: 'mr1',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`performanceTableData[${index}].mr1`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.mr1}
                  onUpdateValue={(value) => {
                    row.mr1 = value
                  }}
                  placeholder="请输入"
                />
              </NFormItem>
            ),
          },
          {
            title: 'MR2(<=1.2)',
            key: 'mr2',
            align: 'center',
            width: 120,
            render: (row, index) => (
              <NFormItem
                path={`performanceTableData[${index}].mr2`}
                rule={{
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change'],
                }}
              >
                <NInput
                  value={row.mr2}
                  onUpdateValue={(value) => {
                    row.mr2 = value
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
            path={`performanceTableData[${index}].comparisonResult`}
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
      },
      {
        title: () => (
          <div>
            <span style="color: red">*</span>
            <span>风险说明</span>
          </div>
        ),
        key: 'riskDescription',
        align: 'center',
        width: 120,
        render: (row, index) => (
          <NFormItem
            path={`performanceTableData[${index}].riskDescription`}
            rule={{
              required: true,
              message: '请输入',
              trigger: ['blur', 'change'],
            }}
          >
            <NInput
              value={row.riskDescription}
              onUpdateValue={(value) => {
                row.riskDescription = value
              }}
              placeholder="请输入"
            />
          </NFormItem>
        ),
      }
    )
  }

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
    key: 'performanceTableData',
    label: '',
    type: 'table',
    dataKey: 'performanceTableData',
    props: {
      bordered: true,
      singleLine: false,
      data: computed(() => formData.value.performanceTableData),
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
