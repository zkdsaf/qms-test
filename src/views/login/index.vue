<template>
  <div
    class="login-container flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden"
  >
    <div
      class="login-wrapper flex w-[900px] h-[500px] bg-white bg-opacity-95 rounded-2xl shadow-2xl animate-slide-in"
    >
      <!-- 左侧装饰区域 -->
      <div
        class="left-panel flex-1 bg-[url('https://example.com/welcome-bg.jpg')] bg-no-repeat bg-center bg-cover bg-gradient-to-br from-blue-800 to-blue-900 text-white p-10 flex flex-col justify-center relative"
      >
        <h1 class="welcome-text text-4xl font-bold mb-4">欢迎体验</h1>
        <p class="subtitle text-lg opacity-80">质量管理系统</p>
        <div
          class="particle-container absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <div
            class="particle absolute bg-white bg-opacity-30 rounded-full animate-float"
            v-for="n in 10"
            :key="n"
            :style="particleStyle(n)"
          ></div>
        </div>
      </div>

      <!-- 右侧登录区域 -->
      <n-card
        class="login-card w-[400px] p-8 flex flex-col justify-center border-none shadow-none"
      >
        <div class="login-header text-center mb-8">
          <n-avatar round size="large" class="mb-4 bg-blue-500">
            <n-icon size="32">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </n-icon>
          </n-avatar>
          <h2 class="login-title text-2xl text-blue-900">登录</h2>
        </div>
        <n-form
          ref="formRef"
          :model="formState"
          class="login-form"
          @keydown.enter.prevent="onFinish"
        >
          <n-form-item
            label="用户名"
            path="username"
            :rule="{
              required: true,
              message: '请输入用户名!',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
              clearable
              size="large"
            >
              <template #prefix>
                <n-icon size="18" class="text-gray-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item
            label="密码"
            path="password"
            :rule="{
              required: true,
              message: '请输入密码!',
              trigger: ['input', 'blur'],
            }"
          >
            <n-input
              v-model:value="formState.password"
              type="password"
              placeholder="请输入密码"
              show-password-on="click"
              size="large"
            >
              <template #prefix>
                <n-icon size="18" class="text-gray-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M16 8v-2a4 4 0 0 0-8 0v2m-4 2h16v8a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-8z"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :loading="loading"
              class="w-full"
              @click="onFinish"
            >
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

    <!-- 选择系统弹窗 -->
    <n-modal
      v-model:show="showSystemModal"
      title="选择权限范围"
      v-bind="modalProps"
    >
      <div class="grid grid-cols-3 gap-8 p-6">
        <div
          v-for="(system, index) in systems"
          :key="index"
          class="system-item h-[200px] p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center"
          :class="{
            'border-blue-500 bg-blue-50 shadow-lg':
              selectedSystem === system.name,
          }"
          @click="selectSystem(system)"
        >
          <div class="flex flex-col items-center">
            <div
              class="icon-wrapper mb-6 p-6 rounded-full bg-blue-100 text-blue-600"
            >
              <n-icon size="64">
                <component :is="system.icon" />
              </n-icon>
            </div>
            <span class="text-xl font-medium text-gray-700">{{
              system.name
            }}</span>
          </div>
        </div>
      </div>
    </n-modal>

    <!-- 选择物料类型弹窗 -->
    <n-modal
      v-model:show="showMaterialModal"
      :title="selectedSystem"
      v-bind="modalProps"
    >
      <div class="grid grid-cols-2 gap-8 p-6">
        <div
          v-for="(material, index) in materials"
          :key="index"
          class="material-item h-[250px] p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center"
          :class="{
            'border-blue-500 bg-blue-50 shadow-lg':
              selectedMaterial === material.name,
          }"
          @click="selectMaterial(material)"
        >
          <div class="flex flex-col items-center">
            <div
              class="icon-wrapper mb-6 p-6 rounded-full bg-blue-100 text-blue-600"
            >
              <n-icon size="64">
                <component :is="material.icon" />
              </n-icon>
            </div>
            <span class="text-xl font-medium text-gray-700">{{
              material.name
            }}</span>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="jsx">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessage } from 'naive-ui'

// 表单引用，用于手动校验
const formRef = ref(null)
// 表单状态
const formState = reactive({
  username: '',
  password: '',
})
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const redirectPath = route.query.redirect || '/'
const authStore = useAuthStore()
const message = useMessage()

const modalProps = {
  draggable: true,
  positiveText: '确认',
  negativeText: '算了',
  preset: 'dialog',
  style: { width: '800px' },
}

// 系统选择相关
const showSystemModal = ref(false)
const showMaterialModal = ref(false)
const selectedSystem = ref('')
const selectedMaterial = ref('')

// 图标组件
const GeneralIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
)

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const TechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const RawMaterialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 7h-7m7 10h-7m7-5h-7M4 7h7m-7 10h7m-7-5h7" />
  </svg>
)

const NonRawMaterialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 3h6v6H9zM9 15h6v6H9zM3 9h6v6H3zM15 9h6v6h-6z" />
  </svg>
)

const systems = [
  {
    name: '通用',
    icon: GeneralIcon,
    value: 'general',
  },
  {
    name: '磐石工程',
    icon: ProjectIcon,
    value: 'project',
  },
  {
    name: '司南技术',
    icon: TechIcon,
    value: 'tech',
  },
]

const materials = [
  {
    name: '原物料',
    icon: RawMaterialIcon,
    value: 'raw',
  },
  {
    name: '非原物料',
    icon: NonRawMaterialIcon,
    value: 'non-raw',
  },
]

const selectSystem = (system) => {
  selectedSystem.value = system.name
  showSystemModal.value = false
  showMaterialModal.value = true
}

const selectMaterial = async (material) => {
  selectedMaterial.value = material.name
  showMaterialModal.value = false

  try {
    loading.value = true
    await authStore.login(formState.username, formState.password, {
      system: selectedSystem.value,
      material: selectedMaterial.value,
    })
    message.success('登录成功')
    router.push(redirectPath)
  } catch (error) {
    if (error instanceof Error && error.message.includes('用户名或密码错误')) {
      message.error('登录失败，请检查用户名和密码')
    } else {
      message.error('请填写完整的用户名和密码')
    }
  } finally {
    loading.value = false
  }
}

// 修改登录提交方法
const onFinish = async () => {
  try {
    await formRef.value.validate()
    showSystemModal.value = true
  } catch (error) {
    message.error('请填写完整的用户名和密码')
  }
}

// 动态粒子样式
const particleStyle = (index) => {
  const size = Math.random() * 10 + 5
  const duration = Math.random() * 3 + 2
  const delay = Math.random() * 2
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    top: `${Math.random() * 100}%`,
  }
}
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

.system-modal .n-card-header {
  padding: 32px 32px 0;
}

.material-modal .n-card-header {
  padding: 32px 32px 0;
}

.system-item,
.material-item {
  transition: all 0.3s ease;
  border-color: #e5e7eb;
}

.system-item:hover,
.material-item:hover {
  transform: translateY(-4px);
}

.icon-wrapper {
  transition: all 0.3s ease;
}

.system-item:hover .icon-wrapper,
.material-item:hover .icon-wrapper {
  transform: scale(1.1);
  background-color: #dbeafe;
}

.system-item.border-blue-500 .icon-wrapper,
.material-item.border-blue-500 .icon-wrapper {
  background-color: #dbeafe;
}
</style>
