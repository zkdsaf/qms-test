<template>
  <n-card :bordered="false">
    <n-data-table
      :columns="columns"
      :data="data"
      :bordered="false"
      :row-key="(row) => row.materialCode"
    />
  </n-card>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import { CloudDownloadOutline } from '@vicons/ionicons5'
const route = useRoute()
// Define columns for 司南资源池
const columns = ref([
  { title: '序号', key: 'sinan_serialNumber', align: 'center', width: 80 },
  { title: 'Equal No.', key: 'sinan_equalNo', align: 'center', width: 100 },
  {
    title: '物料类型',
    key: 'sinan_materialType',
    align: 'center',
    width: 120,
  },
  { title: '料号', key: 'sinan_materialCode', align: 'center', width: 100 },
  {
    title: '是否共用物料',
    key: 'sinan_isSharedMaterial',
    align: 'center',
    width: 100,
  },
  {
    title: '是否国内生产商',
    key: 'sinan_isDomestic',
    align: 'center',
    width: 100,
  },
  {
    title: '物料描述',
    key: 'sinan_materialDescription',
    align: 'center',
    width: 150,
  },
  {
    title: '物料名称',
    key: 'sinan_materialName',
    align: 'center',
    width: 120,
  },
  {
    title: '供应商方式',
    key: 'sinan_supplyMethod',
    align: 'center',
    width: 100,
  },
  {
    title: '供应商代码',
    key: 'sinan_supplierCode',
    align: 'center',
    width: 100,
  },
  {
    title: '供应商名称',
    key: 'sinan_supplierName',
    align: 'center',
    width: 130,
  },
  {
    title: '供应商属性',
    key: 'sinan_supplierAttribute',
    align: 'center',
    width: 100,
  },
  {
    title: '供应商联系人',
    key: 'sinan_supplierContact',
    align: 'center',
    width: 100,
  },
  {
    title: '供应商电话',
    key: 'sinan_supplierPhone',
    align: 'center',
    width: 120,
  },
  {
    title: '供应商邮箱',
    key: 'sinan_supplierEmail',
    align: 'center',
    width: 150,
  },
  {
    title: '生产商名称',
    key: 'sinan_manufacturerName',
    align: 'center',
    width: 130,
  },
  {
    title: '生产商代码',
    key: 'sinan_manufacturerCode',
    align: 'center',
    width: 100,
  },
  { title: '品牌商', key: 'sinan_brand', align: 'center', width: 100 },
  {
    title: '生产商国家/地区',
    key: 'sinan_manufacturerCountry',
    align: 'center',
    width: 120,
  },
  {
    title: '详细地址',
    key: 'sinan_detailedAddress',
    align: 'center',
    width: 150,
  },
  {
    title: '正式规格书编号',
    key: 'sinan_formalSpecNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '正式规格书版本',
    key: 'sinan_formalSpecVersion',
    align: 'center',
    width: 100,
  },
  {
    title: '临时规格书编号',
    key: 'sinan_tempSpecNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '临时规格书版本',
    key: 'sinan_tempSpecVersion',
    align: 'center',
    width: 100,
  },
  {
    title: '工程验证单编号',
    key: 'sinan_engVerificationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '适用范围',
    key: 'sinan_applicableScope',
    align: 'center',
    width: 120,
  },
  {
    title: '适用制程',
    key: 'sinan_applicableProcess',
    align: 'center',
    width: 100,
  },
  { title: '技术节点', key: 'sinan_techNode', align: 'center', width: 100 },
  {
    title: '主要使用module',
    key: 'sinan_mainModule',
    align: 'center',
    width: 120,
  },
  {
    title: '主要使用module科室',
    key: 'sinan_mainModuleDept',
    align: 'center',
    width: 120,
  },
  {
    title: '主要使用部门负责人',
    key: 'sinan_mainDeptHead',
    align: 'center',
    width: 120,
  },
  {
    title: '其他使用module',
    key: 'sinan_otherModule',
    align: 'center',
    width: 120,
  },
  {
    title: '其他使用module科室',
    key: 'sinan_otherModuleDept',
    align: 'center',
    width: 120,
  },
  {
    title: '所有使用module',
    key: 'sinan_allModules',
    align: 'center',
    width: 120,
  },
  {
    title: '所有使用module科室',
    key: 'sinan_allModulesDept',
    align: 'center',
    width: 120,
  },
  {
    title: '槽车号',
    key: 'sinan_tankCarNumber',
    align: 'center',
    width: 100,
  },
  {
    title: '版本生效日期',
    key: 'sinan_versionEffectiveDate',
    align: 'center',
    width: 120,
  },
  {
    title: '首次加入合格供应商资源池日期',
    key: 'sinan_firstQualifiedDate',
    align: 'center',
    width: 150,
  },
  {
    title: '最新申请单编号',
    key: 'sinan_latestApplicationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '所有申请单编号',
    key: 'sinan_allApplicationNumbers',
    align: 'center',
    width: 120,
  },
  {
    title: '冻结申请单编号',
    key: 'sinan_freezeApplicationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '取消资格申请单编号',
    key: 'sinan_disqualifyApplicationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '解冻申请单编号',
    key: 'sinan_unfreezeApplicationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '恢复资格申请单编号',
    key: 'sinan_requalifyApplicationNumber',
    align: 'center',
    width: 120,
  },
  {
    title: '2nd Source',
    key: 'sinan_bslSecondSource',
    align: 'center',
    width: 100,
  },
  { title: '状态', key: 'sinan_status', align: 'center', width: 100 },
  {
    title: '更新日期',
    key: 'sinan_updateDate',
    align: 'center',
    width: 120,
  },
])

// 定义履历列
const historyColumns = ref([
  { title: '序号', key: 'history_serialNumber', align: 'center', width: 80 },
  {
    title: '物料类型',
    key: 'history_materialType',
    align: 'center',
    width: 120,
  },
  { title: '料号', key: 'history_materialCode', align: 'center', width: 100 },
  { title: '适用范围', key: 'history_scope', align: 'center', width: 120 },
  { title: '变更人', key: 'history_changer', align: 'center', width: 100 },
  { title: '变更时间', key: 'history_changeTime', align: 'center', width: 150 },
  {
    title: '拟定内容及理由',
    key: 'history_content',
    align: 'center',
    width: 200,
  },
])

// Generate random sample data
const generateData = (count) => {
  const data = []
  const materialTypes = [
    '电子元件',
    '机械部件',
    '化学原料',
    '包装材料',
    '光学元件',
  ]
  const isDomesticOptions = ['是', '否']
  const isSharedMaterialOptions = ['是', '否']
  const supplierAttributes = ['一级供应商', '二级供应商', '三级供应商']
  const supplyMethods = ['Single Source', 'Group Source', 'Multiple Source']
  const statuses = ['合格', '认证中', '已冻结', '已作废']
  const countries = ['中国', '美国', '日本', '德国', '韩国']
  const modules = ['模块A', '模块B', '模块C', '模块D', '模块E']
  const departments = ['电子科', '机械科', '生产科', '质量科', '研发科']
  const scopes = ['生产', '研发', '测试', '维护', '其他']
  const changers = ['张三', '李四', '王五', '赵六', '钱七']
  const contents = [
    '更新供应商信息',
    '修改物料规格',
    '调整适用范围',
    '更新认证状态',
    '修改供应商资质',
  ]

  for (let i = 0; i < count; i++) {
    const materialType =
      materialTypes[Math.floor(Math.random() * materialTypes.length)]
    const isDomestic =
      isDomesticOptions[Math.floor(Math.random() * isDomesticOptions.length)]
    const isSharedMaterial =
      isSharedMaterialOptions[
        Math.floor(Math.random() * isSharedMaterialOptions.length)
      ]
    const supplierAttribute =
      supplierAttributes[Math.floor(Math.random() * supplierAttributes.length)]
    const supplyMethod =
      supplyMethods[Math.floor(Math.random() * supplyMethods.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]
    const module = modules[Math.floor(Math.random() * modules.length)]
    const department =
      departments[Math.floor(Math.random() * departments.length)]
    const scope = scopes[Math.floor(Math.random() * scopes.length)]
    const changer = changers[Math.floor(Math.random() * changers.length)]
    const content = contents[Math.floor(Math.random() * contents.length)]

    const baseData = {
      materialType,
      materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      materialDescription: `${materialType}描述${i + 1}`,
      materialName: `${materialType}名称${i + 1}`,
      isDomestic,
      isSharedMaterial,
      totalScope: isSharedMaterial === '是' ? '全厂' : '部分产线',
      supplierCode: `SUP${String(i + 1).padStart(3, '0')}`,
      supplierName: `${country}供应商${i + 1}`,
      supplierAttribute,
      supplierContact: `联系人${i + 1}`,
      supplierPhone: `1${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, '0')}`,
      supplierEmail: `supplier${i + 1}@example.com`,
      manufacturerName: `${country}制造商${i + 1}`,
      manufacturerCode: `MFG${String(i + 1).padStart(3, '0')}`,
      brand: `BRAND${i + 1}`,
      manufacturerCountry: country,
      detailedAddress: `${country}地址${i + 1}`,
      tankCarNumber: `TC${String(i + 1).padStart(3, '0')}`,
    }

    const sinanData = {
      sinan_serialNumber: String(i + 1),
      sinan_equalNo: `EQ${String(i + 1).padStart(3, '0')}-S`,
      sinan_materialType: materialType,
      sinan_materialCode: `MAT${String(i + 1).padStart(3, '0')}`,
      sinan_isSharedMaterial: isSharedMaterial,
      sinan_isDomestic: isDomestic,
      sinan_materialDescription: `${materialType}描述${i + 1}`,
      sinan_materialName: `${materialType}名称${i + 1}`,
      sinan_supplyMethod: supplyMethod,
      sinan_supplierCode: `SUP${String(i + 1).padStart(3, '0')}`,
      sinan_supplierName: `${country}供应商${i + 1}`,
      sinan_supplierAttribute: supplierAttribute,
      sinan_supplierContact: `联系人${i + 1}`,
      sinan_supplierPhone: `1${String(
        Math.floor(Math.random() * 1000000000)
      ).padStart(10, '0')}`,
      sinan_supplierEmail: `supplier${i + 1}@example.com`,
      sinan_manufacturerName: `${country}制造商${i + 1}`,
      sinan_manufacturerCode: `MFG${String(i + 1).padStart(3, '0')}`,
      sinan_brand: `BRAND${i + 1}`,
      sinan_manufacturerCountry: country,
      sinan_detailedAddress: `${country}地址${i + 1}`,
      sinan_formalSpecNumber: `SPEC${String(i + 1).padStart(3, '0')}-S`,
      sinan_formalSpecVersion: `V${Math.floor(Math.random() * 5) + 1}.0-S`,
      sinan_tempSpecNumber: `TSPEC${String(i + 1).padStart(3, '0')}-S`,
      sinan_tempSpecVersion: `TV${Math.floor(Math.random() * 5) + 1}.0-S`,
      sinan_engVerificationNumber: `EV${String(i + 1).padStart(3, '0')}-S`,
      sinan_applicableScope: '生产',
      sinan_applicableProcess: 'SMT',
      sinan_techNode: `${Math.floor(Math.random() * 10) + 1}nm`,
      sinan_mainModule: `${module}-S`,
      sinan_mainModuleDept: department,
      sinan_mainDeptHead: `负责人${i + 1}`,
      sinan_otherModule: `${module}-其他-S`,
      sinan_otherModuleDept: `${department}-其他`,
      sinan_allModules: `${module}-S,${module}-其他-S`,
      sinan_allModulesDept: `${department},${department}-其他`,
      sinan_tankCarNumber: `TC${String(i + 1).padStart(3, '0')}`,
      sinan_versionEffectiveDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      sinan_firstQualifiedDate: `2024-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      sinan_latestApplicationNumber: `APP${String(i + 1).padStart(3, '0')}-S`,
      sinan_allApplicationNumbers: `APP${String(i + 1).padStart(
        3,
        '0'
      )}-S,APP${String(i + 2).padStart(3, '0')}-S`,
      sinan_freezeApplicationNumber: `FAPP${String(i + 1).padStart(3, '0')}-S`,
      sinan_disqualifyApplicationNumber: `DAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_unfreezeApplicationNumber: `UAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_requalifyApplicationNumber: `RAPP${String(i + 1).padStart(
        3,
        '0'
      )}-S`,
      sinan_bslSecondSource: Math.random() > 0.5 ? 'BSL' : '2nd Source',
      sinan_status: status,
      sinan_updateDate: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
    }

    data.push({
      ...baseData,

      ...sinanData,
    })
  }
  return data
}
const count = route.query.materialCodes
  ? route.query.materialCodes.split(',').length
  : 3
const data = ref(generateData(count))
</script>
