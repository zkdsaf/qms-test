<template>
  <n-card size="small" title="COA信息上传" class="min-h-[calc(100vh-72px)]">
    <template #header-extra>
      <n-space justify="end">
        <n-button type="primary" size="small" @click="handleSubmit"
          >提交</n-button
        >
        <n-button size="small" @click="router.go(-1)">返回</n-button>
      </n-space>
    </template>
    <n-form
      label-placement="left"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <n-form-item path="uploadType">
        <n-radio-group v-model:value="formData.uploadType">
          <n-radio value="batch">按批次上传COA信息</n-radio>
          <n-radio value="sample">按检测样本上传COA信息</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="ECOA创建方式" path="ecoaType">
        <n-radio-group v-model:value="formData.ecoaType">
          <n-radio value="manual">人工</n-radio>
          <n-radio value="system">系统</n-radio>
        </n-radio-group>
      </n-form-item>

      <n-data-table :columns="columns" :data="formData.tableData" bordered />
    </n-form>
  </n-card>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { DeleteOutlined } from '@vicons/antd'
import { useMessage } from 'naive-ui'
const message = useMessage()
const router = useRouter()
const formRef = ref(null)

const formData = ref({
  uploadType: null,
  ecoaType: null,
  tableData: [
    {
      format: '.txt或.xsl或.csv或.xml',
      status: '',
      document: [],
      version: '1.0',
    },
    { format: '供应商COA', status: '', document: [], version: '1.0' },
  ],
})

const rules = {
  uploadType: {
    required: true,
    message: '请选择上传COA的信息',
    trigger: 'change',
  },
  ecoaType: {
    required: true,
    message: '请选择ECOA创建方式',
    trigger: 'change',
  },
}

const columns = [
  { title: '文档格式', key: 'format', align: 'center', width: 180 },
  { title: '上传状态', key: 'status', align: 'center', width: 100 },
  {
    title: '上传文档',
    key: 'document',
    align: 'center',
    width: 300,
    render: (row) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {row.document.map((file, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                justifyContent: 'center',
              }}
            >
              <span style={{ marginRight: '10px' }}>{file.name}</span>
              <NIcon class="cursor-pointer" size={20} color="#1890ff">
                <DeleteOutlined
                  onClick={() => {
                    row.document.splice(index, 1)
                  }}
                />
              </NIcon>
            </div>
          ))}
        </div>
      )
    },
  },
  {
    title: 'COA版本',
    key: 'version',
    align: 'center',
    width: 190,
    render: (row, index) => {
      return (
        index === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <NButton
              size="small"
              type="primary"
              onClick={() => {
                message.info('版本选择')
              }}
            >
              版本选择
            </NButton>
            <span class="text-gray-500 mt-2">
              如不选择版本,系统默认最新生效版本
            </span>
          </div>
        )
      )
    },
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100,
    render: (row, index) => (
      <NFormItem
        path={`tableData[${index}].document`}
        rule={{
          key: 'document',
          required: !row.document || row.document.length === 0,
          validator: (rule, value) => {
            if (!value || value.length === 0) {
              return new Error('请上传附件')
            }
            return true
          },
          trigger: ['change'],
        }}
      >
        <NUpload
          file-list={[]}
          onChange={(value) => {
            row.document = value.fileList || []
            formRef.value?.validate(
              (errors) => {
                if (errors) {
                  console.error(errors)
                }
              },
              (rule) => rule?.key === 'document'
            )
          }}
          multiple
          max={5}
        >
          <NButton type="primary" size="small">
            上传文件
          </NButton>
        </NUpload>
      </NFormItem>
    ),
  },
]

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      console.error(errors)
      return
    }
    message.success('提交成功')
  })
}
</script>

<style lang="scss" scoped></style>
