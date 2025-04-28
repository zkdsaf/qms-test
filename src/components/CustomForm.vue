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
        <n-form-item :label="field.label" :path="field.key">
          <component
            :is="getComponent(field.type)"
            v-model:value="formModel[field.key]"
            v-bind="field.props"
            @update:value="
              field.listenChange ? handleFieldChange(field.key, $event) : null
            "
          >
            <!-- 动态插槽支持 -->
            <template
              v-for="slotName in Object.keys(field.slots || {})"
              #[slotName]="slotProps"
            >
              <slot :name="`${field.key}-${slotName}`" v-bind="slotProps" />
            </template>
          </component>
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
} from 'naive-ui'

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
    default: '3 ',
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

//// 初始化表单数据
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
}

// 获取控件组件
const getComponent = (type) => {
  return componentMap[type] || NInput
}

// 字段值变更处理
const handleFieldChange = (key, value) => {
  emit('fieldChange', { key, value })
}

// 暴露方法给父组件
defineExpose({
  validate: (callback) => formRef.value?.validate(callback),
  restoreValidation: () => formRef.value?.restoreValidation(),
  formModel,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入，无需额外 scoped 样式 */
</style>
