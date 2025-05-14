import { FileSearchOutlined } from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'equal',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'EQUAL',
    },
    children: [
      {
        path: 'create',
        name: 'EQUAL申请创建',
        component: () => import('@/views/equal/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
      {
        path: 'form',
        name: 'EQUAL表单创建',
        component: () => import('@/views/equal/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
      {
        path: 'todo',
        name: 'EQUAL审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
      {
        path: 'draft',
        name: 'EQUAL草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
      {
        path: 'done',
        name: 'EQUAL我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
      {
        path: 'apply',
        name: 'EQUAL我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'EQUAL',
        },
      },
    ],
  },
  {
    path: 'EQUAL/editRoute',
    name: 'EQUAL申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'EQUAL',
    },
  },
  {
    path: 'EQUAL/actionLog',
    name: 'EQUAL编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(FileSearchOutlined),
      show: true,
      role: ['admin'],
      system: 'EQUAL',
    },
  },
]
