import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'spc',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'SPC',
    },
    children: [
      {
        path: 'create',
        name: 'SPC申请创建',
        component: () => import('@/views/spc/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
        },
      },
      {
        path: 'form',
        name: 'SPC表单创建',
        component: () => import('@/views/spc/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
          activeMenu: '/pages/spc/create',
        },
      },
      {
        path: 'todo',
        name: 'SPC审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
        },
      },
      {
        path: 'draft',
        name: 'SPC草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
        },
      },
      {
        path: 'done',
        name: 'SPC我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
        },
      },
      {
        path: 'apply',
        name: 'SPC我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPC',
        },
      },
    ],
  },
  {
    path: 'spc/editRoute',
    name: 'SPC申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'SPC',
    },
  },
  {
    path: 'spc/actionLog',
    name: 'SPC编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'SPC',
    },
  },
]
