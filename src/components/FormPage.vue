<template>
  <n-card class="flex flex-col h-full">
    <!-- 头部 -->
    <FormHeader :form-info="formHeaderInfo" />

    <!-- 表单内容插槽 -->
    <n-card class="flex-1 mb-20">
      <slot name="content"></slot>
    </n-card>

    <!-- 尾部 -->
    <FormFooter>
      <template #buttons>
        <slot name="buttons"> </slot>
      </template>
    </FormFooter>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import FormHeader from './FormHeader.vue'
import FormFooter from './FormFooter.vue'

// 定义 props
defineProps({
  formHeaderInfo: {
    type: Object,
    default: () => ({
      title: '',
      applicationId: '',
      applicationTime: '',
      applicant: '',
      subject: '',
      status: '',
      department: '',
    }),
  },
})
</script>

<style scoped></style>
