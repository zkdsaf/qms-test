import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'sled',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'SLED',
    },
    children: [
      {
        path: 'create',
        name: 'SLED申请创建',
        component: () => import('@/views/sled/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
        },
      },
      {
        path: 'form',
        name: 'SLED表单创建',
        component: () => import('@/views/sled/form/index.vue'),
        meta: {
          title: 'SLED表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
          activeMenu: '/pages/sled/create',
        },
      },
      {
        path: 'todo',
        name: 'SLED审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
        },
      },
      {
        path: 'draft',
        name: 'SLED草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
        },
      },
      {
        path: 'done',
        name: 'SLED我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
        },
      },
      {
        path: 'apply',
        name: 'SLED我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SLED',
        },
      },
    ],
  },
  {
    path: 'sled/editRoute',
    name: 'SLED申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'SLED',
    },
  },
  {
    path: 'sled/actionLog',
    name: 'SLED编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'SLED',
    },
  },
]
