<template>
  <n-card title="Maker Code导入" class="min-h-[calc(100vh-72px)]">
    <template #header-extra>
      <n-space justify="end">
        <n-button color="#18a058" @click="message.info('下载导入模版')">
          <template #icon>
            <n-icon>
              <CloudDownloadOutline />
            </n-icon>
          </template>
          下载导入模版
        </n-button>
        <n-button color="#18a058" @click="message.info('下载校验结果')">
          <template #icon>
            <n-icon>
              <CloudDownloadOutline />
            </n-icon>
          </template>
          下载校验结果
        </n-button>
        <n-button type="primary" @click="handleSubmit">下一步</n-button>
        <n-button @click="router.go(-1)">返回</n-button>
      </n-space>
    </template>
    <n-form label-placement="left" :model="formData" ref="formRef">
      <n-data-table :columns="columns" :data="formData.tableData" bordered />
    </n-form>
    <n-divider title-placement="left"> 导入操作记录 </n-divider>
    <n-data-table
      :columns="historyColumns"
      :data="formData.historyData"
      bordered
    />
  </n-card>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { DeleteOutlined } from '@vicons/antd'
import { CloudDownloadOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
const message = useMessage()
const router = useRouter()
const formRef = ref(null)

const historyColumns = [
  { title: '序号', key: 'index', align: 'center', width: 80 },
  { title: '导入时间', key: 'importTime', align: 'center', width: 180 },
  { title: '操作人', key: 'operator', align: 'center', width: 120 },
  { title: '文件名称', key: 'fileName', align: 'center', width: 200 },
  { title: '导数数量', key: 'importCount', align: 'center', width: 100 },
  { title: '导入状态', key: 'importStatus', align: 'center', width: 100 },
  { title: '导入单号编号/状态', key: 'importId', align: 'center', width: 180 },
]

const formData = ref({
  tableData: [
    {
      format: '.xls',
      status: '',
      document: [],
      version: '1.0',
    },
  ],
  historyData: [
    {
      index: 1,
      importTime: '2023-10-01 10:00:00',
      operator: '张三',
      fileName: 'example.xls',
      importCount: 100,
      importStatus: '成功',
      importId: 'IMPORT-001',
    },
    {
      index: 2,
      importTime: '2023-10-02 11:00:00',
      operator: '李四',
      fileName: 'sample.xls',
      importCount: 200,
      importStatus: '失败',
      importId: 'IMPORT-002',
    },
  ],
})

const columns = [
  { title: '文档格式', key: 'format', align: 'center', width: 180 },
  {
    title: '上传状态',
    key: 'status',
    align: 'center',
    width: 100,
    render: (row) => row.status && <NTag type="success">{row.status}</NTag>,
  },
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
                    row.status = null
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
            row.status = '成功'
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
    router.push({
      path: '/pages/maker/form',
      query: {
        formType: 'import',
        id: Math.random(),
      },
    })
  })
}
</script>

<style lang="scss" scoped></style>
