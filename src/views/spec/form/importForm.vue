<template>
  <FormPage
    :form-header-info="formHeaderInfo"
    @submit="onSubmit"
    @save="onSave"
  >
    <!-- 自定义表单内容 -->
    <template #content>
      <n-tabs type="line" animated>
        <n-tab-pane name="表单信息" tab="表单信息">
          <n-collapse :default-expanded-names="['1']">
            <n-collapse-item name="1">
              <template #header>
                <h2 class="text-lg font-bold">文档信息</h2>
              </template>

              <DocInfo
                :form-data="formData"
                :readonly="readonly"
                ref="docInfoRef"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['2']">
            <n-collapse-item name="2">
              <template #header>
                <h2 class="text-lg font-bold">物料信息</h2>
              </template>

              <MaterialInfo
                ref="materialInfoRef"
                :form-data="formData"
                :readonly="readonly"
                @materialTypeChange="handleMaterialTypeChange"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']" v-if="materialType">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">基本信息</h2>
              </template>

              <BasicInfo
                ref="basicInfoRef"
                :form-data="formData"
                :readonly="readonly"
                :materialType="materialType"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['4']" v-if="materialType">
            <n-collapse-item name="4">
              <template #header>
                <h2 class="text-lg font-bold">包装要求</h2>
              </template>

              <PackageInfo
                ref="packageInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['4']"
            v-if="
              materialType && ['LC', 'NC', 'SG', 'SL'].includes(materialType)
            "
          >
            <n-collapse-item name="4">
              <template #header>
                <h2 class="text-lg font-bold">运输温度计品质监控要求</h2>
              </template>

              <TrasportAsk
                ref="trasportAskRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['5']" v-if="materialType">
            <n-collapse-item name="5">
              <template #header>
                <h2 class="text-lg font-bold">标签要求</h2>
              </template>

              <LabelInfo
                ref="labelInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['5']"
            v-if="materialType && ['NC', 'SG'].includes(materialType)"
          >
            <n-collapse-item name="5">
              <template #header>
                <h2 class="text-lg font-bold">钢瓶建议更换点</h2>
              </template>

              <SteelInfo
                ref="steelInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['6']" v-if="materialType">
            <n-collapse-item name="6">
              <template #header>
                <h2 class="text-lg font-bold">运输要求</h2>
              </template>

              <ShipInfo
                ref="shipInfoRef"
                :form-data="formData"
                :readonly="readonly"
                :materialType="materialType"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['7']" v-if="materialType">
            <n-collapse-item name="7">
              <template #header>
                <h2 class="text-lg font-bold">存储要求</h2>
              </template>

              <StorageInfo
                ref="storageInfoRef"
                :form-data="formData"
                :readonly="readonly"
                :materialType="materialType"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['8']"
            v-if="materialType && !['WF', 'NP'].includes(materialType)"
          >
            <n-collapse-item name="8">
              <template #header>
                <h2 class="text-lg font-bold">包装</h2>
              </template>

              <Package
                ref="packageRef"
                :form-data="formData"
                :readonly="readonly"
                :materialType="materialType"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['10']"
            v-if="materialType && ['WF', 'NP'].includes(materialType)"
          >
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">常规参数</h2>
              </template>

              <ConvenParams
                ref="convenParamsRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['10']"
            v-if="materialType && ['WF'].includes(materialType)"
          >
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">外延层特性</h2>
              </template>

              <EpitaxialLayer
                ref="epitaxialLayerRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse
            :default-expanded-names="['10']"
            v-if="materialType && ['WF'].includes(materialType)"
          >
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">背面标准</h2>
              </template>

              <BackInfo
                ref="backInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['9']" v-if="materialType">
            <n-collapse-item name="9">
              <template #header>
                <h2 class="text-lg font-bold">参数信息</h2>
              </template>

              <ParamsInfo
                ref="parameInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['10']">
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">附图信息</h2>
              </template>

              <FileInfo
                ref="fileInfoRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['10']">
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">其他文件</h2>
              </template>

              <OtherFile
                ref="otherFileRef"
                :form-data="formData"
                :readonly="readonly"
              />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['10']">
            <n-collapse-item name="10">
              <template #header>
                <h2 class="text-lg font-bold">文件修订记录</h2>
              </template>

              <EditList :form-data="formData" :readonly="readonly" />
            </n-collapse-item>
          </n-collapse>

          <n-collapse :default-expanded-names="['3']" v-if="readonly">
            <n-collapse-item name="3">
              <template #header>
                <h2 class="text-lg font-bold">审批记录</h2>
              </template>

              <HistoryList />
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>
        <n-tab-pane name="流程记录" tab="流程记录" v-if="id">
          流程记录
        </n-tab-pane>
      </n-tabs>
    </template>

    <!-- 自定义按钮 -->
    <template #buttons v-if="!id || route.query.formType === 'import'">
      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onSubmit"
      >
        <template #trigger>
          <n-button type="primary">确认提交</n-button>
        </template>
        确定要提交当前表单吗？
      </n-popconfirm>

      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onSave"
      >
        <template #trigger>
          <n-button class="ml-2" type="warning">暂存</n-button>
        </template>
        确定要暂存当前表单吗？
      </n-popconfirm>

      <n-popconfirm
        positive-text="确定"
        negative-text="取消"
        @positive-click="onCancel"
      >
        <template #trigger>
          <n-button class="ml-2" type="error">取消</n-button>
        </template>
        确定要取消当前表单吗？
      </n-popconfirm>
    </template>
  </FormPage>
</template>

<script setup>
import FormPage from '@/components/FormPage.vue'
import HistoryList from '@/components/HistoryList.vue'
import {
  DocInfo,
  MaterialInfo,
  BasicInfo,
  PackageInfo,
  LabelInfo,
  ShipInfo,
  StorageInfo,
  Package,
  ParamsInfo,
  FileInfo,
  ConvenParams,
  EpitaxialLayer,
  BackInfo,
  SteelInfo,
  TrasportAsk,
  OtherFile,
  ReasonInfo,
  EditList,
} from './component/index.'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

// 表单信息
const formHeaderInfo = {
  title: '导入规格书',
  applicationId: 'APP-2025-001',
  applicationTime: '2025-04-30 10:00',
  applicant: '张三',
  subject: '办公用品采购',
  status: '待审批',
  department: '质量工程科',
}

// 获取路由参数
const route = useRoute()
const router = useRouter()

// 表单数据
const id = route.query.id

const readonly = ref(true)
// 表单数据
const formDataValue = {
  polysilicon: '标准多晶硅', // 多晶硅
  backTreatment: '标准背面处理', // 背面处理方式
  oxideSealing: '标准氧化物密封', // 氧化物密封
  // 文档信息
  specName: '规格书名称', // 规格书名称
  specNo: 'specNo', // 规格书编号
  specVersion: 'V1.0', // 规格书版本号
  securityLevel: '普通', // 保密等级
  specType: '物料规格书', // 规格书类型
  specStatus: '草稿', // 规格书状态
  distributionUnit: '质量部', // 分发单位

  // 物料信息
  materialType: 'SG', // 物料类型
  eQualNo: 'EQ-2024-001', // 物料编号
  materialNo: 'M-2024-001', // 物料编号
  scope: [route.query.scope], // 适用范围
  materialDescription: '标准物料描述', // 物料描述
  technicalSpec: '技术规格说明', // 技术规格
  materialName: '标准物料', // 物料名称
  vendorCode: 'V-001', // 供应商代码
  vendorName: '标准供应商', // 供应商名称
  manufacturerCode: 'MF-001', // 制造商代码
  manufacturerName: '标准制造商', // 制造商名称
  manufacturerNameAbbr: '标制', // 制造商简称
  manufacturerCountry: '中国', // 制造商国家
  g1CrossModule: 'Y', // G1跨模块
  g1MainDeptManager: '张经理', // G1主部门经理
  g1MainDeptDirector: '李主管', // G1主部门主管
  g1OtherDeptManager: '王经理', // G1其他部门经理
  g1OtherDeptDirector: '赵主管', // G1其他部门主管
  g2CrossModule: 'Y', // G2跨模块
  g2MainDeptManager: '刘经理', // G2主部门经理
  g2MainDeptDirector: '陈主管', // G2主部门主管
  g2OtherDeptManager: '杨经理', // G2其他部门经理
  g2OtherDeptDirector: '周主管', // G2其他部门主管

  // 基本信息
  purpisesion: '标准用途', // 用途
  drawingNo: 'DWG-001', // 图纸号
  materialFormula: 'H2O', // 物料分子式
  purityLevel: '99.9%', // 纯度等级
  validityPeriod: 12, // 有效期(月)
  remainingValidityPeriod: 6, // 剩余有效期(月)
  arrivalType: 'port', // 到厂/到港
  storageRequirements: '标准存储要求', // 存储要求
  transportSafetyRequirement: '标准运输安全要求', // 厂内运输防坠落安全要求
  msdsCslVersionRequirement: 'V2.0', // MSDS及CSL版本要求

  crystalMethod: '标准长晶方式', // 长晶方式
  crystalOrientation: '标准晶向', // 晶向
  conductiveType: 'N型', // 导电类型
  doping: '标准掺杂', // 掺杂
  edgeInvalidArea: '2mm', // 边缘无效区域
  waferIdMark: '标准ID标记', // 硅片ID标记
  waferIdMarkSurface: '正面', // 硅片ID标记面
  annealing: '标准退火', // 退火
  slotDirection: '标准开槽方向', // 开槽方向
  edgeShape: '标准边缘形状', // 边缘形状
  edgeSurfaceTreatment: '标准边缘表面处理', // 边缘表面处理方式

  // 标签要求
  labelPosition: '外包装', // 标签位置

  // 包装要求
  containerMaterial: '纸箱', // 容器材料
  innerContainerMaterial: '塑料袋', // 内层容器材料
  volume: '100', // 体积
  volumeUnit: 'L', // 体积单位
  fillWeight: '50', // 填充重量
  fillWeightUnit: 'kg', // 填充重量单位
  fillPressure: '1.0', // 填充压力
  fillPressureUnit: 'MPa', // 填充压力单位
  valveType: '标准阀门类型', // 阀门类型
  valveMaterial: '标准阀门材料', // 阀门材料
  gasketMaterial: '标准垫片材料', // 垫片材料

  // 包装表格数据
  packageTableData: [
    {
      id: 1,
      content: '测试内容',
    },
    {
      id: 2,
      content: '测试内容测试内容测试内容',
    },
  ],

  // 参数信息表格数据
  paramsTableData: [
    {
      id: 1,
      type: '物理参数',
      parameter: '密度',
      unit: 'g/cm³',
      upperLimitType: '≤',
      upperLimitValue: '1.0',
      lowerLimitType: '≥',
      lowerLimitValue: '0.9',
      stcUclType: '≤',
      stcUclValue: '1.1',
      stcLclType: '≥',
      stcLclValue: '0.8',
      measurementMethod: '密度计法',
      measurementTool: '密度计',
      detectionLimit: '0.001',
      coa: '是',
      remark: '标准检测方法',
    },
  ],

  // 运输要求表格数据
  shipTableData: [
    {
      id: 1,
      tempUpperLimit: '30',
      tempLowerLimit: '10',
      tempUnit: '℃',
      maxAllowTempType: '≤',
      maxAllowTemp: '35',
      minAllowTempType: '≥',
      minAllowTemp: '5',
      allowTime: '24',
      allowTimeUnit: '小时',
    },
  ],
  avoidLight: '是', // 避光
  transportTemp: '常温', // 运输温度
  valveVacuum: '否', // 阀门真空
  other: '无特殊要求', // 其他
  shipContainer: '桶',
  remark: '无特殊要求', // 备注

  changeValue: '100', // 更换值
  changeUnit: '次', // 更换单位

  // 存储要求
  roomTemp: '25', // 室温
  tempUpperLimit: '30', // 温度上限
  tempLowerLimit: '20', // 温度下限
  storageTempRequirementUnit: '℃', // 存储温度要求单位
  humidityUpperLimit: '60', // 湿度上限
  humidityLowerLimit: '40', // 湿度下限
  humidityUnit: '%', // 湿度单位
  avoidLight: '是', // 避光
  humidityRequirement: '标准湿度要求', // 湿度要求
  other: '无特殊要求', // 其他

  file: [
    {
      id: 'dc59425b',
      name: '1156263.png',
      percentage: 0,
      status: 'finished',
      url: 'https://example.com/1156263.png',
      file: {},
      thumbnailUrl: 'https://example.com/thumbnail/1156263.png',
      type: 'image/png',
      fullPath: '/1156263.png',
      batchId: '86ca0c23',
    },
  ],
}

// 表单数据
const formData = ref(id ? { ...formDataValue } : { ...formDataValue })

const materialType = ref(id ? formDataValue.materialType : null)
const handleMaterialTypeChange = (value) => {
  materialType.value = value
}

// 表单引用
const docInfoRef = ref(null)
const materialInfoRef = ref(null)
const basicInfoRef = ref(null)
const packageInfoRef = ref(null)
const labelInfoRef = ref(null)
const shipInfoRef = ref(null)
const storageInfoRef = ref(null)
const packageRef = ref(null)
const parameInfoRef = ref(null)
const fileInfoRef = ref(null)
const convenParamsRef = ref(null)
const epitaxialLayerRef = ref(null)
const backInfoRef = ref(null)
const steelInfoRef = ref(null)
const trasportAskRef = ref(null)
const otherFileRef = ref(null)
// 消息提示
const message = useMessage()

const onSubmit = async () => {
  // 收集所有表单引用
  const formRefs = {
    docInfoRef,
    materialInfoRef,
    basicInfoRef,
    packageInfoRef,
    labelInfoRef,
    shipInfoRef,
    storageInfoRef,
    packageRef,
    parameInfoRef,
    fileInfoRef,
    convenParamsRef,
    epitaxialLayerRef,
    backInfoRef,
    steelInfoRef,
    trasportAskRef,
    otherFileRef,
  }

  // 保存所有验证结果
  const validationResults = {}
  // 保存所有表单数据
  const formDataCollection = {}

  // 对所有表单组件执行验证并收集数据
  for (const [refName, refValue] of Object.entries(formRefs)) {
    if (refValue?.value?.validateForm) {
      const isValid = await refValue.value.validateForm()
      validationResults[refName] = isValid

      if (isValid && refValue.value.getFormData) {
        formDataCollection[refName] = refValue.value.getFormData()
      }
    }
  }

  // 合并所有表单数据到一个对象
  const mergedFormData = Object.values(formDataCollection).reduce(
    (acc, curr) => {
      return { ...acc, ...curr }
    },
    {}
  )

  console.log('合并后的表单数据：', mergedFormData)
  console.log('验证结果：', validationResults)

  // 检查是否所有表单都验证通过
  const allValid = Object.values(validationResults).every(
    (result) => result === true
  )

  if (allValid) {
    message.success('提交成功')
    timerFunction()
  } else {
    // ref名称到标题的映射
    const refToTitleMap = {
      docInfoRef: '文档信息',
      materialInfoRef: '物料信息',
      basicInfoRef: '基本信息',
      packageInfoRef: '包装要求',
      labelInfoRef: '标签要求',
      shipInfoRef: '运输要求',
      storageInfoRef: '存储要求',
      packageRef: '包装',
      parameInfoRef: '参数信息',
      fileInfoRef: '附图信息',
      convenParamsRef: '常规参数',
      epitaxialLayerRef: '外延层特性',
      backInfoRef: '背面标准',
      steelInfoRef: '钢瓶建议更换点',
      trasportAskRef: '运输温度计品质监控要求',
      otherFileRef: '其他文件',
    }

    // 找出验证失败的表单并转换为对应的标题
    const failedFormTitles = Object.entries(validationResults)
      .filter(([_, isValid]) => !isValid)
      .map(([name]) => refToTitleMap[name] || name)

    message.error(
      `表单验证失败，请检查以下部分: ${failedFormTitles.join(', ')}`
    )
  }
}

const onSave = () => {
  message.info('保存成功')
  timerFunction()
}

const onCancel = () => {
  message.error('已取消')
  timerFunction()
}

const timerFunction = () => {
  setTimeout(() => {
    router.go(-1)
  }, 1000)
}
</script>
