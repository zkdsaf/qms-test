<template>
  <n-data-table
    :columns="columns"
    :data="tableData"
    :bordered="true"
    :single-line="false"
    class="mb-3"
  />
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, NSpace, NTag } from 'naive-ui'

// 生成随机数据
const generateRandomData = () => {
  const remarks = [
    'xxxxxxx从xxxxxx改成xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '需要修改',
  ]
  const names = ['张三', '李四', '王五', '赵六', '钱七']
  const versions = ['V.01', 'V.02', 'V.03']
  return Array.from({ length: 3 }, (_, index) => ({
    key: index + 1,
    version: versions[Math.floor(Math.random() * versions.length)],
    editUser: names[Math.floor(Math.random() * names.length)],
    editDate: new Date(
      Date.now() - Math.random() * 10000000000
    ).toLocaleString(),
    remark: remarks[Math.floor(Math.random() * remarks.length)],
    approveUser: names[Math.floor(Math.random() * names.length)],
  }))
}

const tableData = ref(generateRandomData())

const columns = [
  {
    title: '版本',
    key: 'version',
    align: 'center',
    width: 100,
  },
  {
    title: '拟定/修订人',
    key: 'editUser',
    align: 'center',
    width: 100,
  },
  {
    title: '拟定/修订时间',
    key: 'editDate',
    align: 'center',
    width: 120,
  },
  {
    title: '拟制/修订内容及理由',
    key: 'remark',
    width: 180,
    align: 'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '批准人',
    key: 'approveUser',
    align: 'center',
    width: 100,
  },
]
</script>

<style scoped></style>
