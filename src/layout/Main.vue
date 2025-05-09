<template>
  <n-layout-content
    class="bg-gray-50 p-1 min-h-[calc(100vh-64px)] h-[calc(100vh-64px)]"
    :native-scrollbar="false"
  >
    <router-view :key="fullPath" />
  </n-layout-content>
</template>

<script setup>
const route = useRoute()
const fullPath = computed(() => route.fullPath)
</script>

<style scoped></style>
