<!-- Header.vue -->
<template>
    <n-layout-header bordered class="px-6 py-2">
        <div class="flex items-center justify-between w-full">
            <!-- 左侧Logo -->
            <div class="text-nowrap text-xl font-bold">GTX QSM</div>

            <!-- 中间菜单 -->
            <n-menu :options="menuOptions" mode="horizontal" responsive class="font-bold text-xl" />

            <!-- 右侧操作 -->
            <div class="flex items-center space-x-2">

                <n-button text @click="toggleFullscreen">
                    <n-icon size="26" depth="1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path
                                d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                    </n-icon>
                </n-button>

                <n-dropdown :options="languageOptions" @select="handleLanguageChange">
                    <n-button text>
                        <n-icon size="26" depth="1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2a10 10 0 0 0-7 17.76M12 2a10 10 0 0 1 7 17.76M12 2v20" />
                                <path d="M2 12h20" />
                            </svg>
                        </n-icon>
                    </n-button>
                </n-dropdown>

                <n-button text @click="handleLogout">
                    <n-icon size="26" depth="1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H11" />
                        </svg>
                    </n-icon>
                </n-button>
            </div>
        </div>
    </n-layout-header>
</template>

<script setup>
import { ref } from 'vue'

// 菜单选项
const menuOptions = ref([
    { label: '物料管理', key: 'home' },
    { label: '规格管理', key: 'manage' },
    { label: '生产商管理', key: 'history' },
    { label: '资源池管理', key: 'analysis' },
    { label: '物料异常提醒', key: 'settings' },
    { label: '供应商管理', key: 'data' },
    { label: '变更管理', key: 'stats' },
    { label: '统计分析管理', key: 'stats1' },
])

// 语言选项
const languageOptions = ref([
    { label: '中文', key: 'zh' },
    { label: 'English', key: 'en' },
])

// 处理退出登录
const handleLogout = () => {
    console.log('用户点击了退出登录')
    // 这里可以添加退出登录的逻辑
}

// 切换全屏
const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

// 切换语言
const handleLanguageChange = (key) => {
    console.log('语言切换为:', key)
    // 这里可以添加语言切换的逻辑
}
</script>

<style>
.v-overflow {
    justify-content: center !important;
}
</style>