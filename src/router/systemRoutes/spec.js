import { FileSearchOutlined } from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'spec',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'SPEC',
    },
    children: [
      {
        path: 'todo',
        name: 'SPEC审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPEC',
        },
      },
      {
        path: 'draft',
        name: 'SPEC草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPEC',
        },
      },
      {
        path: 'done',
        name: 'SPEC我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPEC',
        },
      },
      {
        path: 'apply',
        name: 'SPEC我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'SPEC',
        },
      },
    ],
  },
  {
    path: 'spec/find',
    name: 'SPEC查找中心',
    component: () => import('@/views/spec/find/index.vue'),
    meta: {
      title: '查找中心',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin', 'user'],
      system: 'SPEC',
    },
  },
  {
    path: 'spec/editRoute',
    name: 'SPEC申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'SPEC',
    },
  },
  {
    path: 'spec/actionLog',
    name: 'SPEC编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'SPEC',
    },
  },
]
