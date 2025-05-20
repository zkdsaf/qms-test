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
        :value="formData.vendorFileList"
        :disabled="readonly"
        show-download-button
      >
        <n-icon
          :component="CloudUploadOutline"
          size="28"
          class="cursor-pointer"
        ></n-icon>
      </file-upload>
    </template>
  </custom-form>
  <n-collapse :default-expanded-names="['1']">
    <n-collapse-item name="1">
      <template #header>
        <h2 class="text-lg font-bold"></h2>
      </template>
      <n-form label-placement="left" label-width="auto" labelWidth="160">
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:3 l:3">
            <n-data-table
              :data="formData.vendorTableData"
              :columns="columns"
              :row-key="(row) => row.department + row.rank"
              :bordered="true"
              :single-line="false"
            />
            <!-- <div class="flex justify-end mt-4">
              <n-button type="primary" @click="addNewGroup">
                添加部门联系人
              </n-button>
            </div> -->
            <n-data-table
              :data="formData.vendorMaterialTableData"
              :columns="vendorMaterialColumns"
              class="mb-4"
            ></n-data-table>
          </n-grid-item>
        </n-grid>
      </n-form>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="jsx">
import { computed, ref, defineExpose, reactive, watch } from 'vue'
import { useMessage } from 'naive-ui'
import CustomForm from '@/components/CustomForm.vue'
import FileUpload from '@/components/CustomUpload.vue'
import { SearchOutline, CloudUploadOutline } from '@vicons/ionicons5'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => null,
  },
})
const message = useMessage()

// 表单数据
const formData = ref({
  vendorFileList: [],
  vendorTableData: [],
  vendorMaterialTableData: [],
})

// 生成唯一ID，用于在添加新行时区分不同的部门分组
let groupIdCounter = 1

// 添加新的部门分组（三行）
const addNewGroup = () => {
  // 生成唯一的分组ID
  const groupId = `新部门${groupIdCounter}`
  groupIdCounter++

  // 创建三个联系人记录（对接窗口、上级、上上级）
  const newContacts = [
    {
      department: groupId,
      rank: '对接窗口',
      name: '',
      email: '',
      phone: '',
      isPrimary: false,
      remark: '',
    },
    {
      department: groupId,
      rank: '上级',
      name: '',
      email: '',
      phone: '',
      isPrimary: false,
      remark: '',
    },
    {
      department: groupId,
      rank: '上上级',
      name: '',
      email: '',
      phone: '',
      isPrimary: false,
      remark: '',
    },
  ]

  // 添加到表格数据中
  formData.value.vendorTableData = [
    ...formData.value.vendorTableData,
    ...newContacts,
  ]

  // 显示成功消息
  message.success('添加成功')
}

watch(
  () => props.formData,
  (newVal) => {
    if (newVal) {
      // 遍历 formData 的所有字段
      Object.keys(formData.value).forEach((key) => {
        // 如果 props.item 中对应的字段有值，则更新
        if (newVal[key] !== undefined && newVal[key] !== null) {
          formData.value[key] = newVal[key]
        }
      })
    }
  },
  { deep: true, immediate: true }
)

// 物料类型选项
const materialTypeOptions = [
  { label: '类型1', value: 'type1' },
  { label: '类型2', value: 'type2' },
  { label: '类型3', value: 'type3' },
]

// 供应商属性选项
const supplierAttributeOptions = [
  { label: '属性1', value: 'attr1' },
  { label: '属性2', value: 'attr2' },
  { label: '属性3', value: 'attr3' },
]

const vendorMaterialColumns = [
  {
    title: '序号',
    key: 'sequenceNo',
    align: 'center',
    width: 80,
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料类型</span>
      </div>
    ),
    key: 'materialType',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`vendorMaterialTableData[${index}].materialType`}
        rule={{
          required: true,
          message: '请选择物料类型',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.materialType}
          onUpdateValue={(value) => {
            row.materialType = value
          }}
          options={materialTypeOptions}
          disabled={props.readonly}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料名称</span>
      </div>
    ),
    key: 'materialName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`vendorMaterialTableData[${index}].materialName`}
        rule={{
          required: true,
          message: '请输入物料名称',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.materialName}
          onUpdateValue={(value) => {
            row.materialName = value
          }}
          disabled={props.readonly}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>物料描述</span>
      </div>
    ),
    key: 'materialDesc',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`vendorMaterialTableData[${index}].materialDesc`}
        rule={{
          required: true,
          message: '请输入物料描述',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.materialDesc}
          onUpdateValue={(value) => {
            row.materialDesc = value
          }}
          disabled={props.readonly}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>生产商名称</span>
      </div>
    ),
    key: 'manufacturerName',
    align: 'center',
    width: 150,
    render: (row, index) => (
      <NFormItem
        path={`vendorMaterialTableData[${index}].manufacturerName`}
        rule={{
          required: true,
          message: '请输入生产商名称',
          trigger: ['blur', 'change'],
        }}
      >
        <NInput
          value={row.manufacturerName}
          onUpdateValue={(value) => {
            row.manufacturerName = value
          }}
          disabled={props.readonly}
          placeholder="请输入"
        />
      </NFormItem>
    ),
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>供应商属性</span>
      </div>
    ),
    key: 'supplierAttribute',
    align: 'center',
    width: 120,
    render: (row, index) => (
      <NFormItem
        path={`vendorMaterialTableData[${index}].supplierAttribute`}
        rule={{
          required: true,
          message: '请选择供应商属性',
          trigger: ['blur', 'change'],
        }}
      >
        <NSelect
          value={row.supplierAttribute}
          onUpdateValue={(value) => {
            row.supplierAttribute = value
          }}
          options={supplierAttributeOptions}
          disabled={props.readonly}
          placeholder="请选择"
        />
      </NFormItem>
    ),
  },
]

// 表格列定义（使用 JSX）
const columns = [
  {
    title: '序号',
    key: 'sequenceNo',
    align: 'center',
    width: 60,
    render: (row, index) => index + 1,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>部门</span>
      </div>
    ),
    key: 'department',
    align: 'center',
    width: 120,
    // render: (row, index) => {
    //   return (
    //     <NFormItem
    //       path={`vendorTableData[${index}].department`}
    //       rule={{
    //         required: true,
    //         message: '请输入部门',
    //         trigger: ['blur', 'change'],
    //       }}
    //     >
    //       <NInput
    //         value={row.department}
    //         onUpdateValue={(value) => {
    //           // 获取当前行所在的部门组
    //           const currentDept = row.department
    //           // 更新所有相同部门的行
    //           formData.value.vendorTableData.forEach((item) => {
    //             if (item.department === currentDept) {
    //               item.department = value
    //             }
    //           })
    //         }}
    //         placeholder="请输入部门"
    //         disabled={props.readonly}
    //       />
    //     </NFormItem>
    //   )
    // },
    render: (row, index) => row.department,
    // 设置合并单元格
    rowSpan: (rowData, rowIndex) => {
      // 获取所有数据
      const data = formData.value.vendorTableData
      // 如果是空数据，返回1
      if (data.length === 0) return 1

      // 当前部门值
      const currentDept = rowData.department

      // 如果是第一行或者前一行的部门与当前不同，则计算连续相同部门的数量
      if (rowIndex === 0 || data[rowIndex - 1].department !== currentDept) {
        // 计算当前行开始，连续有多少行是相同部门的
        let count = 1
        for (let i = rowIndex + 1; i < data.length; i++) {
          if (data[i].department === currentDept) {
            count++
          } else {
            break
          }
        }
        return count
      }
      // 如果当前行的部门与前一行相同，则返回0，表示该单元格需要被合并
      return 0
    },
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>职级</span>
      </div>
    ),
    key: 'rank',
    align: 'center',
    width: 120,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>姓名</span>
      </div>
    ),
    key: 'name',
    align: 'center',
    width: 120,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>邮箱</span>
      </div>
    ),
    key: 'email',
    align: 'center',
    width: 180,
  },
  {
    title: () => (
      <div>
        <span class="text-red-500">*</span>
        <span>联系电话</span>
      </div>
    ),
    key: 'phone',
    align: 'center',
    width: 150,
  },
  {
    title: '第一联系人',
    key: 'isPrimary',
    align: 'center',
    width: 100,
    render: (row, index) => (row.isPrimary ? '是' : ''),
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center',
    width: 150,
    ellipsis: {
      tooltip: true,
    },
    render: (row, index) => row.remark,
  },
]

// 表单字段配置
const formFields = ref([
  {
    key: 'file',
    label: '上传文件',
    type: 'input',
    rules: [],
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
])

const formRef = ref(null)

const handleFieldChange = ({ key, value }) => {
  console.log(`插槽化 - 字段变更: ${key} =`, value)
  formData.value[key] = value
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
