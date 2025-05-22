import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'maker',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'MAKER',
    },
    children: [
      {
        path: 'create',
        name: 'MAKER申请创建',
        component: () => import('@/views/maker/form/create.vue'),
        meta: {
          title: '申请创建',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
        },
      },
      {
        path: 'form',
        name: 'MAKER表单创建',
        component: () => import('@/views/maker/form/index.vue'),
        meta: {
          title: '表单创建',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
          activeMenu: '/pages/maker/create',
        },
      },
      {
        path: 'uploadInfo',
        name: 'MAKER导入',
        component: () => import('@/views/maker/component/uploadInfo.vue'),
        meta: {
          title: 'MAKER导入',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
          activeMenu: '/pages/maker/create',
        },
      },
      {
        path: 'todo',
        name: 'MAKER审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
        },
      },
      {
        path: 'draft',
        name: 'MAKER草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
        },
      },
      {
        path: 'done',
        name: 'MAKER我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
        },
      },
      {
        path: 'apply',
        name: 'MAKER我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'MAKER',
        },
      },
    ],
  },
  {
    path: 'maker/editRoute',
    name: 'MAKER申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'MAKER',
    },
  },
  {
    path: 'maker/actionLog',
    name: 'MAKER编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'MAKER',
    },
  },
]
