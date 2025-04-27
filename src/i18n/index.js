import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// 定义语言包
const messages = {
    zh,
    en,
}

// 创建 i18n 实例
const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: 'zh', // 默认语言，稍后动态设置
    fallbackLocale: 'en', // 回退语言
    messages,
})

export default i18n