<template>
  <n-form
    label-placement="left"
    label-width="auto"
    labelWidth="140"
    ref="formRef"
    :model="formData"
    :rules="rules"
  >
    <!-- 1-供应商信息 -->
    <n-collapse :default-expanded-names="['1']">
      <n-collapse-item name="1">
        <template #header>
          <h2 class="text-lg font-bold">1-供应商信息</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商编码" required path="supplierCode">
              <n-input
                v-model:value="formData.supplierCode"
                placeholder="请输入供应商编码"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商名称" required path="supplierName">
              <n-input
                v-model:value="formData.supplierName"
                placeholder="请输入供应商名称"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="供应商创建单号"
              required
              path="supplierCreateNo"
            >
              <n-input
                v-model:value="formData.supplierCreateNo"
                placeholder="请输入供应商创建单号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商状态" required path="supplierStatus">
              <n-select
                v-model:value="formData.supplierStatus"
                placeholder="请选择供应商状态"
                :options="statusOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商属性" required path="supplierAttribute">
              <n-select
                v-model:value="formData.supplierAttribute"
                placeholder="请选择供应商属性"
                :options="attributeOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应方式" required path="supplyMethod">
              <n-checkbox-group v-model:value="formData.supplyMethod">
                <n-space>
                  <n-checkbox value="Local">Local</n-checkbox>
                  <n-checkbox value="Central">Central</n-checkbox>
                </n-space>
              </n-checkbox-group>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="品牌商" required path="brandOwner">
              <n-input
                v-model:value="formData.brandOwner"
                placeholder="请输入品牌商"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 2-生产商信息 -->
    <n-collapse :default-expanded-names="['2']">
      <n-collapse-item name="2">
        <template #header>
          <h2 class="text-lg font-bold">2-生产商信息</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="生产商编码" required path="manufacturerCode">
              <n-input
                v-model:value="formData.manufacturerCode"
                placeholder="请输入生产商编码"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="生产商名称" required path="manufacturerName">
              <n-input
                v-model:value="formData.manufacturerName"
                placeholder="请输入生产商名称"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="详细地址" required path="manufacturerAddress">
              <n-input
                v-model:value="formData.manufacturerAddress"
                placeholder="请输入详细地址"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="生产商编码创建单号"
              required
              path="manufacturerCreateNo"
            >
              <n-input
                v-model:value="formData.manufacturerCreateNo"
                placeholder="请输入生产商编码创建单号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="生产商编码状态"
              required
              path="manufacturerStatus"
            >
              <n-select
                v-model:value="formData.manufacturerStatus"
                placeholder="请选择生产商编码状态"
                :options="statusOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="生产商名称(缩写)"
              required
              path="manufacturerAbbr"
            >
              <n-input
                v-model:value="formData.manufacturerAbbr"
                placeholder="请输入生产商名称(缩写)"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="生产商国家/地区"
              required
              path="manufacturerCountry"
            >
              <n-input
                v-model:value="formData.manufacturerCountry"
                placeholder="请输入生产商国家/地区"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 3-生产商质量证书信息 -->
    <n-collapse :default-expanded-names="['3']">
      <n-collapse-item name="3">
        <template #header>
          <h2 class="text-lg font-bold">3-生产商质量证书信息</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="ISO" required path="iso">
              <n-checkbox-group v-model:value="formData.iso">
                <n-space>
                  <n-checkbox value="ISO9001">ISO9001</n-checkbox>
                  <n-checkbox value="IAFT16949">IAFT16949</n-checkbox>
                </n-space>
              </n-checkbox-group>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="证书创建单号"
              required
              path="certificateCreateNo"
            >
              <n-input
                v-model:value="formData.certificateCreateNo"
                placeholder="请输入证书创建单号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1" v-if="formData.iso.includes('ISO9001')">
            <n-form-item label="ISO9001证书状态" required path="iso9001Status">
              <n-select
                v-model:value="formData.iso9001Status"
                placeholder="请选择ISO9001证书状态"
                :options="statusOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1" v-if="formData.iso.includes('ISO9001')">
            <n-form-item
              label="ISO9001证书有效期"
              required
              path="iso9001Expiry"
            >
              <n-input
                v-model:value="formData.iso9001Expiry"
                placeholder="请输入ISO9001证书有效期"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item
            span="3 m:1 l:1"
            v-if="formData.iso.includes('IAFT16949')"
          >
            <n-form-item
              label="IAFT16949证书状态"
              required
              path="iaft16949Status"
            >
              <n-select
                v-model:value="formData.iaft16949Status"
                placeholder="请选择IAFT16949证书状态"
                :options="statusOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item
            span="3 m:1 l:1"
            v-if="formData.iso.includes('IAFT16949')"
          >
            <n-form-item
              label="IAFT16949证书有效期"
              required
              path="iaft16949Expiry"
            >
              <n-input
                v-model:value="formData.iaft16949Expiry"
                placeholder="请输入IAFT16949证书有效期"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- 4-供应商联系方式 -->
    <n-collapse :default-expanded-names="['4']">
      <n-collapse-item name="4">
        <template #header>
          <h2 class="text-lg font-bold">4-供应商联系方式</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="联系信息创建单号"
              required
              path="contactCreateNo"
            >
              <n-input
                v-model:value="formData.contactCreateNo"
                placeholder="请输入联系信息创建单号"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="联系信息状态" required path="contactStatus">
              <n-select
                v-model:value="formData.contactStatus"
                placeholder="请选择联系信息状态"
                :options="statusOptions"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商联系人" required path="contactPerson">
              <n-input
                v-model:value="formData.contactPerson"
                placeholder="请输入供应商联系人"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商电话" required path="contactPhone">
              <n-input
                v-model:value="formData.contactPhone"
                placeholder="请输入供应商电话"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="供应商邮箱" required path="contactEmail">
              <n-input
                v-model:value="formData.contactEmail"
                placeholder="请输入供应商邮箱"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>
  </n-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 表单数据
const formData = reactive({
  // 供应商信息
  supplierCode: '',
  supplierName: '',
  supplierCreateNo: '',
  supplierStatus: null,
  supplierAttribute: null,
  supplyMethod: [],
  brandOwner: '',

  // 生产商信息
  manufacturerCode: '',
  manufacturerName: '',
  manufacturerAddress: '',
  manufacturerCreateNo: '',
  manufacturerStatus: null,
  manufacturerAbbr: '',
  manufacturerCountry: '',

  // 生产商质量证书信息
  iso: ['ISO9001', 'IAFT16949'],
  certificateCreateNo: '',
  iso9001Status: null,
  iso9001Expiry: '',
  iaft16949Status: null,
  iaft16949Expiry: '',

  // 供应商联系方式
  contactCreateNo: '',
  contactStatus: null,
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
})

// 选项数据
const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'inactive' },
]

const attributeOptions = [
  { label: '制造商', value: 'manufacturer' },
  { label: '贸易商', value: 'trader' },
  { label: '服务商', value: 'service' },
]

const formRef = ref(null)

// 校验规则
const rules = {
  supplierCode: {
    required: true,
    message: '请输入供应商编码',
    trigger: 'blur',
  },
  supplierName: {
    required: true,
    message: '请输入供应商名称',
    trigger: 'blur',
  },
  supplierCreateNo: {
    required: true,
    message: '请输入供应商创建单号',
    trigger: 'blur',
  },
  supplierStatus: {
    required: true,
    message: '请选择供应商状态',
    trigger: 'change',
  },
  supplierAttribute: {
    required: true,
    message: '请选择供应商属性',
    trigger: 'change',
  },
  supplyMethod: {
    type: 'array',
    required: true,
    message: '请选择供应方式',
    trigger: 'change',
  },
  brandOwner: { required: true, message: '请输入品牌商', trigger: 'blur' },
  manufacturerCode: {
    required: true,
    message: '请输入生产商编码',
    trigger: 'blur',
  },
  manufacturerName: {
    required: true,
    message: '请输入生产商名称',
    trigger: 'blur',
  },
  manufacturerAddress: {
    required: true,
    message: '请输入详细地址',
    trigger: 'blur',
  },
  manufacturerCreateNo: {
    required: true,
    message: '请输入生产商编码创建单号',
    trigger: 'blur',
  },
  manufacturerStatus: {
    required: true,
    message: '请选择生产商编码状态',
    trigger: 'change',
  },
  manufacturerAbbr: {
    required: true,
    message: '请输入生产商名称(缩写)',
    trigger: 'blur',
  },
  manufacturerCountry: {
    required: true,
    message: '请输入生产商国家/地区',
    trigger: 'blur',
  },
  iso: { required: true, message: '请输入ISO', trigger: 'blur' },
  certificateCreateNo: {
    required: true,
    message: '请输入证书创建单号',
    trigger: 'blur',
  },
  iso9001Status: {
    required: true,
    message: '请选择ISO9001证书状态',
    trigger: 'change',
  },
  iso9001Expiry: {
    required: true,
    message: '请输入ISO9001证书有效期',
    trigger: 'blur',
  },
  iaft16949Status: {
    required: true,
    message: '请选择IAFT16949证书状态',
    trigger: 'change',
  },
  iaft16949Expiry: {
    required: true,
    message: '请输入IAFT16949证书有效期',
    trigger: 'blur',
  },
  contactCreateNo: {
    required: true,
    message: '请输入联系信息创建单号',
    trigger: 'blur',
  },
  contactStatus: {
    required: true,
    message: '请选择联系信息状态',
    trigger: 'change',
  },
  contactPerson: {
    required: true,
    message: '请输入供应商联系人',
    trigger: 'blur',
  },
  contactPhone: {
    required: true,
    message: '请输入供应商电话',
    trigger: 'blur',
  },
  contactEmail: {
    required: true,
    message: '请输入供应商邮箱',
    trigger: 'blur',
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
