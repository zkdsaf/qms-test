<template>
  <n-data-table
    :columns="columns"
    :data="tableData"
    :bordered="true"
    :single-line="false"
  />
</template>

<script setup>
import { h, ref } from 'vue'
import { NButton, NSpace, NTag } from 'naive-ui'

// 生成随机数据
const generateRandomData = () => {
  const nodes = ['节点A', '节点B', '节点C', '节点D']
  const names = ['张三', '李四', '王五', '赵六', '钱七']
  const departments = ['技术部', '人事部', '财务部', '市场部', '运营部']
  const permissions = ['管理员', '普通用户', '访客', '超级管理员']
  const actions = ['审批', '驳回', '提交', '修改']
  const remarks = ['正常', '需要修改', '已处理', '待审核']

  return Array.from({ length: 10 }, (_, index) => ({
    key: index + 1,
    node: nodes[Math.floor(Math.random() * nodes.length)],
    name: names[Math.floor(Math.random() * names.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    permission: permissions[Math.floor(Math.random() * permissions.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    time: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
    remark: remarks[Math.floor(Math.random() * remarks.length)],
    attachment: Math.random() > 0.5 ? '有' : '无',
  }))
}

const tableData = ref(generateRandomData())

const columns = [
  {
    title: '序号',
    key: 'key',
    width: 80,
    align: 'center',
    render: (record, index) => index + 1,
  },
  {
    title: '节点',
    key: 'node',
    align: 'center',
    width: 100,
  },
  {
    title: '姓名',
    key: 'name',
    align: 'center',
    width: 100,
  },
  {
    title: '部门',
    key: 'department',
    align: 'center',
    width: 120,
  },
  {
    title: '所属权限',
    key: 'permission',
    align: 'center',
    width: 120,
    render(row) {
      return h(
        NTag,
        {
          type: row.permission === '管理员' ? 'success' : 'info',
        },
        { default: () => row.permission }
      )
    },
  },
  {
    title: '动作',
    key: 'action',
    align: 'center',
    width: 100,
  },
  {
    title: '时间',
    key: 'time',
    align: 'center',
    width: 180,
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center',
    width: 120,
  },
  {
    title: '附件',
    key: 'attachment',
    width: 100,
    align: 'center',
  },
]
</script>

<style scoped></style>
