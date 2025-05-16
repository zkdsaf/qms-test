import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'coa',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'COA',
    },
    children: [
      {
        path: 'create',
        name: 'COA申请创建',
        component: () => import('@/views/coa/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'form',
        name: 'COA表单创建',
        component: () => import('@/views/coa/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
          activeMenu: '/pages/coa/create',
        },
      },
      {
        path: 'todo',
        name: 'COA审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'draft',
        name: 'COA草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'done',
        name: 'COA我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'apply',
        name: 'COA我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
    ],
  },
  {
    path: 'coa/find',
    name: 'COA查找中心',
    component: () => import('@/views/coa/find/index.vue'),
    meta: {
      title: '查找中心',
      icon: renderIcon(SearchOutlined),
      show: true,
      role: ['admin', 'user'],
      system: 'COA',
    },
  },
  {
    path: 'coa/tableValite',
    name: 'COA表格校验',
    component: () => import('@/views/coa/find/demo.vue'),
    meta: {
      title: 'COA表格校验',
      icon: renderIcon(SearchOutlined),
      show: false,
      role: ['admin', 'user'],
      system: 'COA',
    },
  },
  {
    path: 'coa/editRoute',
    name: 'COA申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'COA',
    },
  },
  {
    path: 'coa/actionLog',
    name: 'COA编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'COA',
    },
  },
]
