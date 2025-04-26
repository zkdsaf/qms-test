<template>
  <n-layout class="min-h-screen">
    <Header />
    <n-layout has-sider class="bg-gray-100 overflow-auto" :key="route.fullPath">
      <Sidebar />
      <Main />
    </n-layout>
  </n-layout>
</template>

<script setup>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Main from './Main.vue'

const route = useRoute()
</script>
