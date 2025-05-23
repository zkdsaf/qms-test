<template>
  <n-layout class="min-h-screen" position="absolute">
    <!-- 使用Header组件 -->
    <Header />

    <!-- 首页内容 -->
    <n-layout-content
      class="p-2 min-h-[calc(100vh-64px)] h-[calc(100vh-64px)]"
      :native-scrollbar="false"
    >
      <n-grid
        :cols="10"
        :x-gap="16"
        :y-gap="16"
        responsive="screen"
        item-responsive
      >
        <!-- 左侧内容，占18格 -->
        <n-gi span="10 m:8 l:8">
          <div class="bg-gray-50 p-2 rounded">
            <!-- 轮播图 -->
            <n-carousel
              direction="vertical"
              dot-placement="right"
              show-arrow
              effect="custom"
              :transition-props="{ name: 'creative' }"
              class="w-full h-[240px] object-cover mb-3"
              autoplay
            >
              <div class="w-full h-[240px] relative overflow-hidden rounded-lg">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-90"
                ></div>
                <div
                  class="absolute inset-0 flex items-center justify-between px-8"
                >
                  <div class="text-white">
                    <h2 class="text-2xl font-bold mb-2">质量管理系统</h2>
                    <p class="text-lg opacity-90">提升产品质量，优化管理流程</p>
                  </div>
                  <div
                    class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <n-icon size="48" class="text-white">
                      <CheckCircleOutlined />
                    </n-icon>
                  </div>
                </div>
              </div>
              <div class="w-full h-[240px] relative overflow-hidden rounded-lg">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-90"
                ></div>
                <div
                  class="absolute inset-0 flex items-center justify-between px-8"
                >
                  <div class="text-white">
                    <h2 class="text-2xl font-bold mb-2">数据分析中心</h2>
                    <p class="text-lg opacity-90">实时监控，智能分析</p>
                  </div>
                  <div
                    class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <n-icon size="48" class="text-white">
                      <LineChartOutlined />
                    </n-icon>
                  </div>
                </div>
              </div>
              <div class="w-full h-[240px] relative overflow-hidden rounded-lg">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-90"
                ></div>
                <div
                  class="absolute inset-0 flex items-center justify-between px-8"
                >
                  <div class="text-white">
                    <h2 class="text-2xl font-bold mb-2">供应商管理</h2>
                    <p class="text-lg opacity-90">全方位供应商评估与管理</p>
                  </div>
                  <div
                    class="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <n-icon size="48" class="text-white">
                      <TeamOutlined />
                    </n-icon>
                  </div>
                </div>
              </div>
            </n-carousel>

            <!-- 轮播图下方的三个子div -->
            <n-card title="待办统计">
              <div class="flex space-x-4">
                <!-- 子div 1 -->
                <div
                  class="w-full md:flex-1 bg-white p-2 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      超期七天待办事项
                    </div>
                    <div class="text-3xl font-bold text-blue-600 mt-2">
                      <n-number-animation
                        :from="0"
                        :to="randomNumber(300, 1000)"
                      />
                    </div>
                  </div>
                  <!-- 右侧：ECharts 图表 -->
                  <div class="flex-1 h-32 mt-4 md:mt-0" ref="chart1"></div>
                </div>
                <!-- 子div 2 -->
                <div
                  class="w-full md:flex-1 bg-white p-2 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      待办事项
                    </div>
                    <div class="text-3xl font-bold text-green-600 mt-2">
                      <n-number-animation
                        :from="0"
                        :to="randomNumber(0, 10000)"
                      />
                    </div>
                  </div>
                  <!-- 右侧：ECharts 图表 -->
                  <div class="flex-1 h-32 mt-4 md:mt-0" ref="chart2"></div>
                </div>
                <!-- 子div 3 -->
                <div
                  class="w-full md:flex-1 bg-white p-2 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      今日完成事项
                    </div>
                    <div class="text-3xl font-bold text-red-600 mt-2">
                      <n-number-animation
                        :from="0"
                        :to="randomNumber(100, 900)"
                      />
                    </div>
                  </div>
                  <!-- 右侧：ECharts 图表 -->
                  <div class="flex-1 h-32 mt-4 md:mt-0" ref="chart3"></div>
                </div>
              </div>
            </n-card>

            <!-- 待办 -->
            <n-card class="mt-3">
              <n-tabs type="segment" animated>
                <n-tab-pane name="我的待办" tab="Todo"> </n-tab-pane>
                <n-tab-pane name="我的申请" tab="Apply"> </n-tab-pane>
                <n-tab-pane name="我的已办" tab="Done"> </n-tab-pane>
                <n-tab-pane name="我的草稿" tab="Draft"> </n-tab-pane>
              </n-tabs>
              <n-data-table
                :columns="tableColumns"
                :data="tableData"
                :pagination="false"
                :bordered="false"
                :max-height="250"
                striped
                :scroll-x="1200"
              />
            </n-card>

            <!-- 底部图标 -->
            <div class="mt-3">
              <n-grid
                :cols="3"
                :x-gap="16"
                :y-gap="16"
                responsive="screen"
                item-responsive
              >
                <!-- 卡片 1 -->
                <n-gi span="3 m:1">
                  <n-card title="超期未处理CASE" class="shadow-md">
                    <div class="h-48" ref="chart4"></div>
                  </n-card>
                </n-gi>
                <!-- 卡片 2 -->
                <n-gi span="3 m:1">
                  <n-card title="新增CASE数" class="shadow-md">
                    <div class="h-48" ref="chart5"></div>
                  </n-card>
                </n-gi>
                <!-- 卡片 3 -->
                <n-gi span="3 m:1">
                  <n-card title="新增CASE数趋势统计" class="shadow-md">
                    <div class="h-48" ref="chart6"></div>
                  </n-card>
                </n-gi>
              </n-grid>
            </div>
          </div>
        </n-gi>

        <!-- 右侧内容，占6格 -->
        <n-gi span="10 m:2 l:2">
          <!-- 快捷操作 -->
          <div class="bg-gray-50 p-2 rounded">
            <n-card title="快捷操作" class="rounded">
              <template #header-extra>
                <div
                  class="cursor-pointer text-blue-500"
                  @click="message.info('敬请期待')"
                >
                  管理
                </div>
              </template>

              <div class="flex flex-wrap w-full justify-center">
                <div
                  v-for="(action, index) in actionList"
                  :key="index"
                  class="cursor-pointer p-2"
                  @click="handleSystemSwitch(action.systemCode)"
                >
                  <!-- 上部：蓝色背景 + 图标 -->
                  <div
                    class="rounded w-16 h-16 bg-blue-500 flex items-center justify-center"
                  >
                    <n-icon
                      :component="action.icon"
                      size="30"
                      class="text-white"
                    />
                  </div>
                  <!-- 下部：汉字 -->
                  <div
                    class="whitespace-nowrap text-center text-ellipsis overflow-hidden w-16"
                  >
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <span class="text-gray-800 font-medium">
                          {{ action.title }}
                        </span>
                      </template>
                      {{ action.title }}
                    </n-tooltip>
                  </div>
                </div>
              </div>
            </n-card>

            <!-- 帮助文档-->
            <n-card title="帮助文档" class="my-2 rounded">
              <template #header-extra>
                <div
                  class="cursor-pointer text-blue-500"
                  @click="message.info('敬请期待')"
                >
                  查看更多
                </div>
              </template>

              <n-list clickable hoverable>
                <n-list-item v-for="(item, index) in helpList" :key="index">
                  <div
                    class="cursor-pointer text-blue-500 w-full"
                    @click="downFile(item)"
                  >
                    <n-ellipsis>
                      {{ item.title }}
                    </n-ellipsis>
                  </div>
                </n-list-item>
              </n-list>
            </n-card>

            <!-- 公告卡片 -->
            <n-card title="公告" class="shadow-md">
              <template #header-extra>
                <div
                  class="cursor-pointer text-blue-500"
                  @click="message.info('敬请期待')"
                >
                  查看更多
                </div>
              </template>
              <n-list>
                <n-list-item
                  v-for="(placard, index) in placardList"
                  :key="index"
                >
                  <div class="flex items-center justify-start">
                    <!-- 左侧：Tag -->
                    <n-tag :type="placard.type">
                      {{ placard.title }}
                    </n-tag>
                    <!-- 右侧：内容 -->
                    <n-ellipsis class="text-gray-600 ml-2">
                      {{ placard.content }}
                    </n-ellipsis>
                  </div>
                </n-list-item>
              </n-list>
            </n-card>
          </div>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="jsx">
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  CodeOutlined,
  TeamOutlined,
  ExperimentOutlined,
  AlertOutlined,
  SwapOutlined,
  LineChartOutlined,
  WarningOutlined,
  FileSearchOutlined,
} from '@vicons/antd'
import { onMounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import Header from '@/layout/Header.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

// 图表容器引用
const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
const chart4 = ref(null)
const chart5 = ref(null)
const chart6 = ref(null)

// 表格数据
const tableData = Array.from({ length: 20 }).map((_, index) => ({
  applySn: Math.floor(Math.random() * 1000000),
  subject: '主题主题主题主题主题主题主题主题主题主题主题主题主题',
  applyUser: '张三',
  applyTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  status: Math.floor(Math.random() * 5) % 2 ? '流程中' : '已完成',
  arriveTime: new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24
  ).toLocaleString(),
  todoWaitTime: Math.floor(Math.random() * 100) + '分钟',
}))

// 表格列
const tableColumns = ref([
  {
    title: '流程',
    key: 'process',
    align: 'center',
    width: 100,
    render: (row) => {
      return (
        <n-popover trigger="hover" placement="right">
          {{
            trigger: () => (
              <n-icon size="26" class="text-blue-400 cursor-pointer">
                <UserOutlined></UserOutlined>
              </n-icon>
            ),
            default: () => (
              <n-card
                title="当前单据信息"
                header-style={{ fontSize: '14px' }}
                size="small"
                border
              >
                <div class="flex">
                  <div class="text-blue-500">当前节点：</div>
                  <div>审批规格书:SQE签核</div>
                </div>
                <div class="flex">
                  <div class="text-blue-500">处理人：</div>
                  <div>管理员(admin)</div>
                </div>
              </n-card>
            ),
          }}
        </n-popover>
      )
    },
  },
  {
    title: '序号',
    key: 'no',
    align: 'center',
    render: (row, rowIndex) => rowIndex + 1,
    width: 80,
  },
  {
    title: '申请单编号',
    key: 'applySn',
    align: 'center',
    render: (row) => {
      return (
        <div
          class="flex items-center justify-center text-blue-400 cursor-pointer"
          onClick={() => message.info(row.applySn)}
        >
          {row.applySn}
        </div>
      )
    },
    sorter: (row1, row2) => row1.applySn - row2.applySn,
  },
  {
    title: '主题',
    key: 'subject',
    align: 'center',
    resizable: true,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '申请人',
    key: 'applyUser',
    align: 'center',
  },
  {
    title: '申请时间',
    key: 'applyTime',
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    filterOptions: [
      {
        label: '流程中',
        value: '流程中',
      },
      {
        label: '已完成',
        value: '已完成',
      },
    ],
    filter(value, row) {
      return ~row.status.indexOf(value)
    },
  },
  {
    title: '到达时间',
    key: 'arriveTime',
    align: 'center',
  },
  {
    title: '待办等待时间',
    key: 'todoWaitTime',
    align: 'center',
  },
])

//快捷操作
const actionList = shallowRef([
  {
    title: 'COA',
    systemCode: 'COA',
    icon: FileTextOutlined,
  },
  {
    title: 'SPEC',
    systemCode: 'SPEC',
    icon: CheckCircleOutlined,
  },
  {
    title: 'AVL',
    systemCode: 'AVL',
    icon: SafetyCertificateOutlined,
  },
  {
    title: 'CERT',
    systemCode: 'CERT',
    icon: CodeOutlined,
  },
  {
    title: 'MAKER CODE',
    systemCode: 'MAKER',
    icon: TeamOutlined,
  },
  {
    title: 'VENDORINFO',
    systemCode: 'VENDOR',
    icon: ExperimentOutlined,
  },
  {
    title: 'EIQA',
    systemCode: 'EIQA',
    icon: AlertOutlined,
  },
  {
    title: 'IQND',
    systemCode: 'IQND',
    icon: SwapOutlined,
  },
  {
    title: 'EQUAL',
    systemCode: 'EQUAL',
    icon: LineChartOutlined,
  },
  {
    title: 'SPC',
    systemCode: 'SPC',
    icon: WarningOutlined,
  },
  {
    title: 'OOW',
    systemCode: 'OOW',
    icon: FileSearchOutlined,
  },
  {
    title: 'SLED',
    systemCode: 'SLED',
    icon: UserOutlined,
  },
])

const handleSystemSwitch = (systemCode) => {
  authStore.setSystemName(systemCode)
  const defaultRoute = `/pages/${systemCode.toLowerCase()}/todo`

  console.log('🚀 ~ defaultRoute:', defaultRoute)
  console.log(router.getRoutes())
  console.log('currentRoute', router.currentRoute.value.fullPath)

  router.replace({
    path: defaultRoute,
    query: {
      t: new Date().getTime(),
    },
  })
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//帮助文档
const helpList = shallowRef([
  {
    title: 'AVL系统操作手册',
  },
  {
    title: 'IQA系统操作手册-关务',
  },
  {
    title: 'IQA系统操作手册-化学实验室',
  },
  {
    title: 'SPEC用户操作手册',
  },
])

const downFile = (item) => {
  message.success(`${item.title}下载成功!`)
}

//公告
const placardList = shallowRef([
  {
    content: '活动上线、规则调整、营销推广类信息',
    type: 'success',
    title: '系统公告',
  },
  {
    content: '新人加入、岗位变动、员工离职等信息',
    type: 'warning',
    title: '人事公告',
  },
  {
    content: '故障通知、数据异常、停机维护等紧急信息',
    type: 'error',
    title: '紧急公告',
  },
  {
    content: '功能上线、版本更新说明等',
    type: 'info',
    title: '更新公告',
  },
  {
    content: '其他重要信息',
    type: 'info',
    title: '其他公告',
  },
  {
    content: '故障通知、数据异常、停机维护等紧急信息',
    type: 'error',
    title: '紧急公告',
  },
])

// 待办事项图表
const initTodoChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const data = [90, 92, 91, 93, 94]
  const option = {
    grid: {
      top: '15%',
      right: '5%',
      bottom: '15%',
      left: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
      axisLabel: {
        show: false,
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: data.map((value, index) => ({
          value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#10B981',
                },
                {
                  offset: 1,
                  color: '#34D399',
                },
              ],
            },
          },
        })),
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: false,
          position: 'top',
          formatter: '{c}',
          fontSize: 12,
          color: '#6B7280',
          offset: [0, 5],
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#059669',
                },
                {
                  offset: 1,
                  color: '#10B981',
                },
              ],
            },
          },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const param = params[0]
        return `${param.name}<br/>待办事项：${param.value}件`
      },
    },
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 超期7天待办图表
const initOverdueChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const data = [80, 85, 90, 88, 86]
  const option = {
    grid: {
      top: '15%',
      right: '5%',
      bottom: '15%',
      left: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五'],
      axisLabel: {
        show: false,
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        data: data.map((value, index) => ({
          value,
          itemStyle: {
            color: index === data.length - 1 ? '#EF4444' : '#3B82F6',
          },
        })),
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: false,
          position: 'top',
          formatter: '{c}',
          fontSize: 12,
          color: '#6B7280',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const param = params[0]
        const isToday = param.dataIndex === data.length - 1
        return `${param.name}<br/>${isToday ? '今日' : '历史'}超期待办：${
          param.value
        }件`
      },
    },
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 今日完成事项环形图
const initRingChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const total = 1000
  const completed = 500
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (params.seriesName === '完成情况') {
          return `总待办：${total}<br/>今日完成：${completed}<br/>完成率：${(
            (completed / total) *
            100
          ).toFixed(1)}%`
        }
        return params.name + ': ' + params.value
      },
    },
    series: [
      {
        name: '完成情况',
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        data: [
          {
            value: completed,
            name: '已完成',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#EF4444',
                  },
                  {
                    offset: 1,
                    color: '#F87171',
                  },
                ],
              },
            },
          },
          {
            value: total - completed,
            name: '未完成',
            itemStyle: {
              color: '#E5E7EB',
            },
          },
        ],
      },
    ],
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 图表 4：折线图（生产趋势）
const initLineChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const option = {
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: [120, 132, 101, 134, 90, 230],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#3B82F6' },
      },
    ],
    grid: {
      left: '10%',
      right: '5%',
      top: '15%',
      bottom: '15%',
    },
    tooltip: { trigger: 'axis' },
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 图表 5：柱状图（质量指标）
const initQualityChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const option = {
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D'],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: [95, 88, 92, 85],
        type: 'bar',
        itemStyle: { color: '#10B981' },
        barWidth: '40%',
      },
    ],
    grid: {
      left: '10%',
      right: '5%',
      top: '15%',
      bottom: '15%',
    },
    tooltip: { trigger: 'axis' },
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 图表 6：饼图（能耗分布）
const initPieChart = (chartRef) => {
  const chart = echarts.init(chartRef)
  const option = {
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 40, name: '电力', itemStyle: { color: '#EF4444' } },
          { value: 30, name: '水', itemStyle: { color: '#FBBF24' } },
          { value: 20, name: '燃气', itemStyle: { color: '#10B981' } },
          { value: 10, name: '其他', itemStyle: { color: '#3B82F6' } },
        ],
        label: { fontSize: 10 },
      },
    ],
    tooltip: { trigger: 'item' },
  }
  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

// 初始化图表
onMounted(() => {
  // 图表 1：超期七天待办
  initOverdueChart(chart1.value)
  // 图表 2：待办事项
  initTodoChart(chart2.value)
  // 图表 3：今日完成事项
  initRingChart(chart3.value)
  // 图表 4：超期未处理case
  initLineChart(chart4.value)
  // 图表 5：新增case
  initQualityChart(chart5.value)
  // 图表 6：新增case数趋势统计
  initPieChart(chart6.value)
})
</script>

<style>
:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.8);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}

.n-list-item__main {
  overflow: hidden !important;
}
</style>
