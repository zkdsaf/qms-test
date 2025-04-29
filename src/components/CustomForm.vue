<template>
  <n-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    :label-width="labelWidth"
    :label-placement="labelPlacement"
    :disabled="readonly"
  >
    <n-grid
      :cols="cols"
      :x-gap="xGap"
      :y-gap="yGap"
      responsive="screen"
      item-responsive
    >
      <n-grid-item v-for="field in fields" :key="field.key" :span="field.span">
        <n-form-item
          :label="field.label"
          :path="field.key"
          :ref="`formItem-${field.key}`"
        >
          <!-- 优先使用插槽 -->
          <slot :name="field.key" :field="field" :formModel="formModel">
            <!-- 默认使用配置化的组件 -->
            <component
              :is="getComponent(field.type)"
              :value="formModel[field.key]"
              v-bind="field.props"
              @update:value="
                field.listenChange ? handleFieldChange(field.key, $event) : null
              "
            >
              <!-- 动态插槽支持，例如 FileUpload 的 default 插槽 -->
              <template
                v-for="slotName in Object.keys(field.slots || {})"
                #[slotName]="slotProps"
              >
                <slot :name="`${field.key}-${slotName}`" v-bind="slotProps" />
              </template>
            </component>
          </slot>
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref, computed, defineEmits, defineExpose, defineProps } from 'vue'
import {
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  NSelect,
  NDatePicker,
  NUpload, // 新增 NUpload
  NDataTable,
} from 'naive-ui'
import FileUpload from './CustomUpload.vue'
// Props
const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  cols: {
    type: Number,
    default: 3,
  },
  xGap: {
    type: Number,
    default: 16,
  },
  yGap: {
    type: Number,
    default: 16,
  },
  labelWidth: {
    type: [Number, String],
    default: 80,
  },
  labelPlacement: {
    type: String,
    default: 'left',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['fieldChange'])

// 初始化表单数据
const formModel = computed(() => props.formData)

// 表单校验规则
const formRules = computed(() => {
  const rules = {}
  props.fields.forEach((field) => {
    if (field.rules) {
      rules[field.key] = field.rules
    }
  })
  return rules
})

// 表单引用
const formRef = ref(null)

// 控件类型映射
const componentMap = {
  input: NInput,
  select: NSelect,
  datePicker: NDatePicker,
  upload: FileUpload, // 新增 upload 类型
  table: NDataTable, // 新增 table 类型
}

// 获取控件组件
const getComponent = (type) => {
  return componentMap[type] || NInput
}

// 字段值变更处理
const handleFieldChange = (key, value) => {
  console.log('🚀 ~ key, value:', key, value)
  emit('fieldChange', { key, value })
}

// 暴露方法给父组件
defineExpose({
  validate: (callback, othersProps) =>
    formRef.value?.validate(callback, othersProps),
  restoreValidation: () => formRef.value?.restoreValidation(),
  formModel,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入，无需额外 scoped 样式 */
</style>
