<template>
  <n-layout class="min-h-screen">
    <!-- 使用Header组件 -->
    <Header />

    <!-- 首页内容 -->
    <n-layout-content class="p-4">
      <n-grid
        :cols="10"
        :x-gap="16"
        :y-gap="16"
        responsive="screen"
        item-responsive
      >
        <!-- 左侧内容，占18格 -->
        <n-gi span="10 m:8 l:8">
          <div class="bg-gray-50 p-4 rounded">
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
              <div class="w-full h-[240px] object-cover bg-blue-500 rounded" />
              <div class="w-full h-[240px] object-cover bg-red-500 rounded" />
              <div class="w-full h-[240px] object-cover bg-green-500 rounded" />
              <div
                class="w-full h-[240px] object-cover bg-yellow-500 rounded"
              />
            </n-carousel>

            <!-- 轮播图下方的三个子div -->
            <n-card title="待办统计">
              <div class="flex space-x-4">
                <!-- 子div 1 -->
                <div
                  class="w-full md:flex-1 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      超期七天待办事项
                    </div>
                    <div class="text-3xl font-bold text-blue-600 mt-2">
                      <n-number-animation :from="0" :to="668" />
                    </div>
                  </div>
                  <!-- 右侧：ECharts 图表 -->
                  <div class="flex-1 h-32 mt-4 md:mt-0" ref="chart1"></div>
                </div>
                <!-- 子div 2 -->
                <div
                  class="w-full md:flex-1 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      待办事项
                    </div>
                    <div class="text-3xl font-bold text-green-600 mt-2">
                      <n-number-animation :from="0" :to="12039" />
                    </div>
                  </div>
                  <!-- 右侧：ECharts 图表 -->
                  <div class="flex-1 h-32 mt-4 md:mt-0" ref="chart2"></div>
                </div>
                <!-- 子div 3 -->
                <div
                  class="w-full md:flex-1 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row"
                >
                  <!-- 左侧：上下两部分 -->
                  <div
                    class="flex-1 flex flex-row justify-between md:flex-col items-center md:items-start"
                  >
                    <div class="text-lg font-semibold text-gray-800">
                      今日完成事项
                    </div>
                    <div class="text-3xl font-bold text-red-600 mt-2">
                      <n-number-animation :from="0" :to="598" />
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
                striped
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
          <div class="bg-gray-50 p-4 rounded">
            <n-card title="快捷操作" class="rounded">
              <template #header-extra>
                <div class="cursor-pointer text-blue-500">管理</div>
              </template>

              <div class="flex flex-wrap w-full justify-start gap-2">
                <div
                  v-for="(action, index) in actionList"
                  :key="index"
                  class="cursor-pointer p-3"
                >
                  <!-- 上部：蓝色背景 + 图标 -->
                  <div
                    class="rounded w-14 h-14 bg-blue-500 flex items-center justify-center"
                  >
                    <n-icon
                      :component="action.icon"
                      size="30"
                      class="text-white"
                    />
                  </div>
                  <!-- 下部：汉字 -->
                  <div
                    class="whitespace-nowrap text-center text-ellipsis overflow-hidden w-12"
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
                <div class="cursor-pointer text-blue-500">查看更多</div>
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
                <div class="cursor-pointer text-blue-500">查看更多</div>
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
import { useMessage } from 'naive-ui'
import { UserOutlined } from '@vicons/antd'
import { onMounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import Header from '@/components/Header.vue'

const message = useMessage()

// 图表容器引用
const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
const chart4 = ref(null)
const chart5 = ref(null)
const chart6 = ref(null)

// 表格数据
const tableData = ref([
  {
    process: '流程1',
    applySn: '1234567890',
    subject: '主题主题主题主题主题主题主题主题主题主题主题主题主题主题',
    applyUser: '张三',
    applyTime: '2021-01-01 12:00:00',
    status: '待办',
    arriveTime: '2021-01-01 12:00:00',
    todoWaitTime: '10分钟',
  },
  {
    process: '流程2',
    applySn: '1234567890',
    subject: '主题主题主题主题主题主题主题主题主题主题主题主题主题',
    applyUser: '张三',
    applyTime: '2021-01-01 12:00:00',
    status: '待办',
    arriveTime: '2021-01-01 12:00:00',
    todoWaitTime: '10分钟',
  },
  {
    process: '流程3',
    applySn: '1234567890',
    subject: '主题主题主题主题主题主题主题主题主题主题主题主题主题',
    applyUser: '张三',
    applyTime: '2021-01-01 12:00:00',
    status: '待办',
    arriveTime: '2021-01-01 12:00:00',
    todoWaitTime: '10分钟',
  },
])

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
        <div class="flex items-center justify-center text-blue-400 cursor-pointer">
          {row.applySn}
        </div>
      )
    },
  },
  {
    title: '主题',
    key: 'subject',
    align: 'center',
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
  // {
  //   title: "Action",
  //   key: "actions",
  //   align: "center",
  //   render(row) {
  //     return h(
  //       NButton,
  //       {
  //         strong: true,
  //         tertiary: true,
  //         size: "small",
  //         onClick: () => play(row),
  //       },
  //       { default: () => "Play" }
  //     );
  //   },
  // },
])

//快捷操作
const actionList = shallowRef([
  {
    title: 'COA',
    icon: UserOutlined,
  },
  {
    title: 'SPEC',
    icon: UserOutlined,
  },
  {
    title: 'AVL',
    icon: UserOutlined,
  },
  {
    title: 'CERT',
    icon: UserOutlined,
  },
  {
    title: 'MAKER CODE',
    icon: UserOutlined,
  },
  {
    title: 'VENDORINFO',
    icon: UserOutlined,
  },
  {
    title: 'EIQA',
    icon: UserOutlined,
  },
  {
    title: 'IQND',
    icon: UserOutlined,
  },
  {
    title: 'EQUAL',
    icon: UserOutlined,
  },
  {
    title: 'SPC',
    icon: UserOutlined,
  },
  {
    title: 'OOW',
    icon: UserOutlined,
  },
])

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
])

// 待办统计图标
const initBarChart = (chartRef, data, color) => {
  const chart = echarts.init(chartRef)
  const option = {
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
        data: data,
        type: 'bar',
        itemStyle: { color: color },
        barWidth: '40%',
      },
    ],
    grid: {
      left: '10%',
      right: '5%',
      top: '10%',
      bottom: '15%',
    },
    tooltip: { trigger: 'axis' },
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
  initBarChart(chart1.value, [80, 85, 90, 88, 86], '#3B82F6')
  // 图表 2：待办事项
  initBarChart(chart2.value, [90, 92, 91, 93, 94], '#10B981')
  // 图表 3：今日完成事项
  initBarChart(chart3.value, [5, 3, 4, 2, 3], '#EF4444')
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
