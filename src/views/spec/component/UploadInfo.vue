<template>
  <n-card title="导入规格书" class="min-h-[calc(100vh-72px)]">
    <template #header-extra>
      <n-space justify="end">
        <n-button type="primary" @click="handleSubmit">提交</n-button>
        <n-button @click="router.go(-1)">返回</n-button>
      </n-space>
    </template>
    <n-form
      label-placement="left"
      :model="formData"
      :rules="rules"
      ref="formRef"
    >
      <n-form-item label="适用范围" path="scope">
        <n-radio-group v-model:value="formData.scope">
          <n-radio value="G1">磐石</n-radio>
          <n-radio value="G2">司南</n-radio>
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
  scope: null,
  tableData: [
    {
      format: '.xls',
      status: '',
      document: [],
      version: '1.0',
    },
  ],
})

const rules = {
  scope: {
    required: true,
    message: '请选择适用范围',
    trigger: 'change',
  },
}

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
    message.success('提交成功')
    router.push({
      path: '/pages/spec/importForm',
      query: {
        scope: formData.value.scope,
        formType: 'import',
        id: Math.random(),
      },
    })
  })
}
</script>

<style lang="scss" scoped></style>
