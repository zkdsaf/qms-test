import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'eiqa',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'EIQA',
    },
    children: [
      {
        path: 'create',
        name: 'EIQA申请创建',
        component: () => import('@/views/eiqa/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
        },
      },
      {
        path: 'form',
        name: 'EIQA表单创建',
        component: () => import('@/views/eiqa/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
          activeMenu: '/pages/eiqa/create',
        },
      },
      {
        path: 'todo',
        name: 'EIQA审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
        },
      },
      {
        path: 'draft',
        name: 'EIQA草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
        },
      },
      {
        path: 'done',
        name: 'EIQA我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
        },
      },
      {
        path: 'apply',
        name: 'EIQA我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EIQA',
        },
      },
    ],
  },
  {
    path: 'eiqa/editRoute',
    name: 'EIQA申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'EIQA',
    },
  },
  {
    path: 'eiqa/actionLog',
    name: 'EIQA编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'EIQA',
    },
  },
]
