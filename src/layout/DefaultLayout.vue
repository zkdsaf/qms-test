<template>
  <n-layout class="min-h-screen">
    <Header />
    <!--方法1： 添加:key="route.fullPath"防止组件复用 侧边了不会选中展开 -->
    <!--方法2： 在Sidebar.vue中添加menuInstRef.value?.showOption(newPath)-->
    <n-layout position="absolute" has-sider class="bg-gray-100 mt-16">
      <Sidebar />
      <Main />
    </n-layout>
  </n-layout>
</template>

<script setup>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Main from './Main.vue'
</script>
