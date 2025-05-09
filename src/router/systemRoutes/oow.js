import { FileSearchOutlined } from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'oow',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'OOW',
    },
    children: [
      {
        path: 'create',
        name: 'OOW申请创建',
        component: () => import('@/views/oow/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
        },
      },
      {
        path: 'form',
        name: 'OOW表单创建',
        component: () => import('@/views/oow/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
          activeMenu: '/pages/oow/create',
        },
      },
      {
        path: 'todo',
        name: 'OOW审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
        },
      },
      {
        path: 'draft',
        name: 'OOW草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
        },
      },
      {
        path: 'done',
        name: 'OOW我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
        },
      },
      {
        path: 'apply',
        name: 'OOW我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'OOW',
        },
      },
    ],
  },
  {
    path: 'oow/editRoute',
    name: 'OOW申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'OOW',
    },
  },
  {
    path: 'oow/actionLog',
    name: 'OOW编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'OOW',
    },
  },
]
