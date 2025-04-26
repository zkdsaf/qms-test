<template>
  <n-layout-content class="bg-gray-100 p-1 overflow-auto">
    <router-view />
  </n-layout-content>
</template>

<script setup></script>

<style scoped>
/* 确保内容区域有合适的滚动和背景 */
.n-layout-content {
  min-height: calc(100vh - 64px);
}
</style>
