<template>
  <div
    class="not-found-container flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
    <n-result status="404" size="huge" title="404 页面未找到" description="抱歉，您访问的页面不存在！"
      class="p-8 rounded-lg bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl w-3/4 h-3/4">
      <template #footer>
        <n-button type="primary" size="large" @click="goHome" class="mt-4">
          返回首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// 路由跳转
const router = useRouter();

// 返回首页
const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
/* 自定义动画效果（可选） */
.not-found-container {
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
}
</style>