<script setup>
import { zhCN, dateZhCN } from 'naive-ui'

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  Form: {
    feedbackHeightLarge: '10px',
    feedbackHeightSmall: '10px',
    feedbackHeightMedium: '10px',
  },
}
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
