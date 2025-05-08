import { FileSearchOutlined } from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'iqnd',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'IQND',
    },
    children: [
      {
        path: 'create',
        name: 'IQND申请创建',
        component: () => import('@/views/iqnd/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
        },
      },
      {
        path: 'form',
        name: 'IQND表单创建',
        component: () => import('@/views/iqnd/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
          activeMenu: '/pages/iqnd/create',
        },
      },
      {
        path: 'todo',
        name: 'IQND审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
        },
      },
      {
        path: 'draft',
        name: 'IQND草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
        },
      },
      {
        path: 'done',
        name: 'IQND我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
        },
      },
      {
        path: 'apply',
        name: 'IQND我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'IQND',
        },
      },
    ],
  },
]
