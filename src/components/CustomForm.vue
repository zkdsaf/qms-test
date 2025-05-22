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
      <template v-for="field in fields">
        <n-grid-item
          :key="field.key"
          span="3 m:3 l:3"
          v-if="
            (!field.visibleWhen || field.visibleWhen(formModel)) &&
            field.divider
          "
        >
          <n-divider title-placement="left">
            <span class="text-gray-400">
              {{ field.divider.title }}
            </span>
          </n-divider>
        </n-grid-item>

        <n-grid-item
          :key="field.key"
          :span="field.span"
          v-if="!field.visibleWhen || field.visibleWhen(formModel)"
        >
          <n-form-item :label="field.label" :path="field.key">
            <!-- 优先使用插槽 -->
            <slot :name="field.key" :field="field" :formModel="formModel">
              <!-- 特殊处理 radio 类型，使用 NRadioGroup -->
              <n-radio-group
                v-if="field.type === 'radio'"
                :value="formModel[field.key]"
                v-bind="field.props"
                @update:value="
                  field.listenChange
                    ? handleFieldChange(field.key, $event)
                    : null
                "
              >
                <n-radio
                  v-for="option in field.props.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </n-radio-group>

              <!-- 特殊处理 checkbox类型 -->
              <n-checkbox-group
                v-else-if="field.type === 'checkbox'"
                :value="formModel[field.key]"
                v-bind="field.props"
                @update:value="
                  field.listenChange
                    ? handleFieldChange(field.key, $event)
                    : null
                "
              >
                <n-checkbox
                  v-for="option in field.props.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </n-checkbox-group>

              <!-- 默认使用配置化的组件 -->
              <component
                :is="getComponent(field.type)"
                :value="formModel[field.key]"
                v-bind="field.props"
                @update:value="
                  field.listenChange
                    ? handleFieldChange(field.key, $event)
                    : null
                "
                v-else
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
      </template>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref, computed, defineEmits, defineExpose, defineProps } from 'vue'
import {
  NInput,
  NSelect,
  NDatePicker,
  NUpload, // 新增 NUpload
  NDataTable,
  NInputNumber,
  NRadioGroup,
  NCheckboxGroup,
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
    default: 140,
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
  upload: FileUpload,
  table: NDataTable,
  'input-number': NInputNumber,
  radio: NRadioGroup,
  checkbox: NCheckboxGroup,
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
  validate: (callback, othersProps) =>
    formRef.value?.validate(callback, othersProps),
  restoreValidation: () => formRef.value?.restoreValidation(),
  formModel,
})
</script>

<style scoped>
/* Tailwind CSS 已通过 CDN 引入，无需额外 scoped 样式 */
</style>
