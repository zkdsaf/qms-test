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
  const versions = ['V.1.0', 'V.2.0', 'V.3.0', 'V.4.0', 'V.5.0']
  const vendorPropertys = ['Vendor', 'Vendor&Maker']
  const names = ['张三', '李四', '王五', '赵六', '钱七']
  const certTypes = ['ISO9001', 'IAFT16949']
  const makerCodes = ['M001', 'M002', 'M003', 'M004', 'M005']
  const remarks = [
    'xxxxxxx从xxxxxx改成xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    '需要修改',
  ]

  return Array.from({ length: 3 }, (_, index) => ({
    key: index + 1,
    version: versions[Math.floor(Math.random() * versions.length)],
    vendorProperty:
      vendorPropertys[Math.floor(Math.random() * vendorPropertys.length)],
    certType: certTypes[Math.floor(Math.random() * certTypes.length)],
    makerCode: makerCodes[Math.floor(Math.random() * makerCodes.length)],
    editUser: names[Math.floor(Math.random() * names.length)],
    editDate: new Date(
      Date.now() - Math.random() * 10000000000
    ).toLocaleString(),
    remark: remarks[Math.floor(Math.random() * remarks.length)],
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
    title: '版本',
    key: 'version',
    align: 'center',
    width: 100,
  },
  {
    title: '生产商编码',
    key: 'makerCode',
    align: 'center',
    width: 100,
  },
  {
    title: '证书类别',
    key: 'certType',
    align: 'center',
    width: 120,
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
]
</script>

<style scoped></style>
