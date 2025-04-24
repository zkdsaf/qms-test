<template>
    <n-layout class="min-h-screen">
        <!-- 使用Header组件 -->
        <Header />

        <!-- 首页内容 -->
        <n-layout-content class="p-4">
            <n-grid :cols="10" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
                <!-- 左侧内容，占18格 -->
                <n-gi span="10 m:8 l:8">
                    <div class="bg-gray-100 p-4 rounded h-full">
                        <h2 class="text-xl font-bold mb-4">左侧内容区域</h2>
                        <p>这里是左侧内容，占据 18 格宽度。在小屏幕下会变成全宽（24 格）。</p>
                        <!-- 这里可以添加更多左侧内容 -->
                    </div>
                </n-gi>

                <!-- 右侧内容，占6格 -->
                <n-gi span="10 m:2 l:2">
                    <div class="bg-gray-200 p-4 rounded h-full">
                        <h2 class="text-xl font-bold mb-4">右侧内容区域</h2>
                        <p>这里是右侧内容，占据 6 格宽度。在小屏幕下会变成全宽（24 格）并排列在左侧内容下方。</p>
                        <!-- 这里可以添加更多右侧内容 -->
                    </div>
                </n-gi>
            </n-grid>
        </n-layout-content>

        <!-- 内容区域 -->
        <n-layout-content class="p-4">

        </n-layout-content>
    </n-layout>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>