<template>
  <n-form
    label-placement="left"
    label-width="auto"
    labelWidth="140"
    ref="formRef"
    :model="formData"
    :rules="rules"
  >
    <!-- Use Scope -->
    <n-form-item label="使用范围" required path="useScope">
      <n-checkbox-group v-model:value="formData.useScope">
        <n-space>
          <n-checkbox value="panshi">磐石</n-checkbox>
          <n-checkbox value="sinan">司南</n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-form-item>

    <!-- Panshi Qual Info -->
    <n-collapse
      v-if="formData.useScope.includes('panshi')"
      :default-expanded-names="['panshiQual']"
    >
      <n-collapse-item name="panshiQual">
        <template #header>
          <h2 class="text-lg font-bold">磐石Qual信息</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="技术节点" required path="panshiTechNode">
              <n-select
                v-model:value="formData.panshiTechNode"
                placeholder="请选择技术节点"
                :options="techNodeOptions"
                multiple
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="主要使用Module"
              required
              path="panshiMainModule"
            >
              <n-input
                v-model:value="formData.panshiMainModule"
                placeholder="请输入主要使用Module"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="主要使用部门负责人"
              required
              path="panshiMainOwner"
            >
              <n-input
                v-model:value="formData.panshiMainOwner"
                placeholder="请输入主要使用部门负责人"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="其他使用Module"
              required
              path="panshiOtherModule"
            >
              <n-input
                v-model:value="formData.panshiOtherModule"
                placeholder="请输入其他使用Module"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="Layer" required path="panshiLayer">
              <n-input
                v-model:value="formData.panshiLayer"
                placeholder="请输入Layer"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>

    <!-- Sinan Qual Info -->
    <n-collapse
      v-if="formData.useScope.includes('sinan')"
      :default-expanded-names="['sinanQual']"
    >
      <n-collapse-item name="sinanQual">
        <template #header>
          <h2 class="text-lg font-bold">司南Qual信息</h2>
        </template>
        <n-grid x-gap="20" cols="3" responsive="screen" item-responsive>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="技术节点" required path="sinanTechNode">
              <n-select
                v-model:value="formData.sinanTechNode"
                placeholder="请选择技术节点"
                :options="techNodeOptions"
                multiple
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="主要使用Module" required path="sinanMainModule">
              <n-input
                v-model:value="formData.sinanMainModule"
                placeholder="请输入主要使用Module"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="主要使用部门负责人"
              required
              path="sinanMainOwner"
            >
              <n-input
                v-model:value="formData.sinanMainOwner"
                placeholder="请输入主要使用部门负责人"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item
              label="其他使用Module"
              required
              path="sinanOtherModule"
            >
              <n-input
                v-model:value="formData.sinanOtherModule"
                placeholder="请输入其他使用Module"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="3 m:1 l:1">
            <n-form-item label="Layer" required path="sinanLayer">
              <n-input
                v-model:value="formData.sinanLayer"
                placeholder="请输入Layer"
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

const formData = reactive({
  useScope: ['panshi', 'sinan'],
  panshiTechNode: [],
  panshiMainModule: '',
  panshiMainOwner: '',
  panshiOtherModule: '',
  panshiLayer: '',
  sinanTechNode: [],
  sinanMainModule: '',
  sinanMainOwner: '',
  sinanOtherModule: '',
  sinanLayer: '',
})

const techNodeOptions = [
  { label: '节点1', value: '节点1' },
  { label: '节点2', value: '节点2' },
  { label: '节点3', value: '节点3' },
]

const formRef = ref(null)

const rules = {
  useScope: {
    type: 'array',
    required: true,
    message: '请选择使用范围',
    trigger: 'change',
  },
  panshiTechNode: {
    required: true,
    message: '请选择技术节点',
    trigger: 'change',
  },
  panshiMainModule: {
    required: true,
    message: '请输入主要使用Module',
    trigger: 'blur',
  },
  panshiMainOwner: {
    required: true,
    message: '请输入主要使用部门负责人',
    trigger: 'blur',
  },
  panshiOtherModule: {
    required: true,
    message: '请输入其他使用Module',
    trigger: 'blur',
  },
  panshiLayer: {
    required: true,
    message: '请输入Layer',
    trigger: 'blur',
  },
  sinanTechNode: {
    required: true,
    message: '请选择技术节点',
    trigger: 'change',
  },
  sinanMainModule: {
    required: true,
    message: '请输入主要使用Module',
    trigger: 'blur',
  },
  sinanMainOwner: {
    required: true,
    message: '请输入主要使用部门负责人',
    trigger: 'blur',
  },
  sinanOtherModule: {
    required: true,
    message: '请输入其他使用Module',
    trigger: 'blur',
  },
  sinanLayer: {
    required: true,
    message: '请输入Layer',
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
