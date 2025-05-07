<template>
  <div class="mb-4 p-6 bg-white shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-center">{{ formInfo.title }}</h2>
    <n-form :model="formInfo" :label-width="200" label-placement="left">
      <n-grid cols="1 m:3" :x-gap="20" :y-gap="6" responsive="screen">
        <n-gi>
          <n-form-item label="申请单编号">
            <span>{{ formInfo.applicationId }}</span>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="申请时间">
            <span>{{ formInfo.applicationTime }}</span>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="申请人">
            <span>{{ formInfo.applicant }}</span>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="申请单主题">
            <span>{{ formInfo.subject }}</span>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="流程状态">
            <span>{{ formInfo.status }}</span>
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="申请人部门/科室">
            <span>{{ formInfo.department }}</span>
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script setup>
defineProps({
  formInfo: Object,
})
</script>

<style scoped></style>
