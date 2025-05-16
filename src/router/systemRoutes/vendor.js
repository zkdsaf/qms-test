import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'vendor',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'VENDOR',
    },
    children: [
      {
        path: 'create',
        name: 'VENDOR申请创建',
        component: () => import('@/views/vendor/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
        },
      },
      {
        path: 'form',
        name: 'VENDOR表单创建',
        component: () => import('@/views/vendor/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
          activeMenu: '/pages/vendor/create',
        },
      },
      {
        path: 'todo',
        name: 'VENDOR审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
        },
      },
      {
        path: 'draft',
        name: 'VENDOR草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
        },
      },
      {
        path: 'done',
        name: 'VENDOR我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
        },
      },
      {
        path: 'apply',
        name: 'VENDOR我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'VENDOR',
        },
      },
    ],
  },
  {
    path: 'vendor/editRoute',
    name: 'VENDOR申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'VENDOR',
    },
  },
  {
    path: 'vendor/actionLog',
    name: 'VENDOR编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'VENDOR',
    },
  },
]
