<template>
  <div
    class="login-container flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
    <div
      class="login-wrapper flex w-[900px] h-[500px] bg-white bg-opacity-95 rounded-2xl shadow-2xl animate-slide-in">
      <!-- 左侧装饰区域 -->
      <div
        class="left-panel flex-1 bg-[url('https://example.com/welcome-bg.jpg')] bg-no-repeat bg-center bg-cover bg-gradient-to-br from-blue-800 to-blue-900 text-white p-10 flex flex-col justify-center relative">
        <h1 class="welcome-text text-4xl font-bold mb-4">欢迎体验</h1>
        <p class="subtitle text-lg opacity-80">质量管理系统</p>
        <div class="particle-container absolute top-0 left-0 w-full h-full overflow-hidden">
          <div class="particle absolute bg-white bg-opacity-30 rounded-full animate-float"
            v-for="n in 10" :key="n" :style="particleStyle(n)"></div>
        </div>
      </div>

      <!-- 右侧登录区域 -->
      <n-card class="login-card w-[400px] p-8 flex flex-col justify-center border-none shadow-none">
        <div class="login-header text-center mb-8">
          <n-avatar round size="large" class="mb-4 bg-blue-500">
            <n-icon size="32">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </n-icon>
          </n-avatar>
          <h2 class="login-title text-2xl text-blue-900">登录</h2>
        </div>
        <n-form ref="formRef" :model="formState" class="login-form">
          <n-form-item label="用户名" path="username"
            :rule="{ required: true, message: '请输入用户名!', trigger: ['input', 'blur'] }">
            <n-input v-model:value="formState.username" placeholder="请输入用户名" clearable size="large">
              <template #prefix>
                <n-icon size="18" class="text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item label="密码" path="password"
            :rule="{ required: true, message: '请输入密码!', trigger: ['input', 'blur'] }">
            <n-input v-model:value="formState.password" type="password" placeholder="请输入密码"
              show-password-on="click" size="large">
              <template #prefix>
                <n-icon size="18" class="text-gray-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      d="M16 8v-2a4 4 0 0 0-8 0v2m-4 2h16v8a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-8z" />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item>
            <n-button type="primary" size="large" :loading="loading" class="w-full"
              @click="onFinish">
              登录
            </n-button>
          </n-form-item>
        </n-form>
        <div class="login-footer text-center mt-4">
          <span class="text-gray-500">
            提示：使用 admin/admin 或 user/user 登录
          </span>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useMessage } from "naive-ui";

// 表单引用，用于手动校验
const formRef = ref(null);
// 表单状态
const formState = reactive({
  username: "",
  password: "",
});
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const redirectPath = route.query.redirect || "/";
const authStore = useAuthStore();
const message = useMessage();

// 登录提交
const onFinish = async () => {
  try {
    // 手动触发表单校验
    await formRef.value.validate();
    loading.value = true;
    // 调用 authStore 的 login 方法
    await authStore.login(formState.username, formState.password);
    message.success("登录成功");
    router.push(redirectPath);
  } catch (error) {
    if (error instanceof Error && error.message.includes("用户名或密码错误")) {
      message.error("登录失败，请检查用户名和密码");
    } else {
      // 表单校验失败会进入这里
      message.error("请填写完整的用户名和密码");
    }
  } finally {
    loading.value = false;
  }
};

// 动态粒子样式
const particleStyle = (index) => {
  const size = Math.random() * 10 + 5;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    top: `${Math.random() * 100}%`,
  };
};
</script>

<style>
/* 移除 scoped，使用全局样式以确保动画生效 */
.particle {
  animation: float infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>