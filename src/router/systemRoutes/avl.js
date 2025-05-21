import {
  SearchOutlined,
  UnorderedListOutlined,
  InteractionOutlined,
} from '@vicons/antd'
import { CreateOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils/icon.js'

export default [
  {
    path: 'avl',
    meta: {
      title: '申请创建',
      icon: renderIcon(CreateOutline),
      show: true,
      role: ['admin', 'user'],
      system: 'AVL',
    },
    children: [
      {
        path: 'editForm',
        name: 'AVL修订',
        component: () => import('@/views/avl/editForm/index.vue'),
        meta: {
          title: 'AVL修订',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
          activeMenu: '/pages/avl/vendorData',
        },
      },
      {
        path: 'muchEditForm',
        name: 'AVL多物料修订',
        component: () => import('@/views/avl/editForm/muchEdit.vue'),
        meta: {
          title: 'AVL多物料修订',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
          activeMenu: '/pages/avl/vendorData',
        },
      },
      {
        path: 'frozen',
        name: 'AVL冻结/取消资格',
        component: () => import('@/views/avl/form/frozen.vue'),
        meta: {
          title: 'AVL冻结/取消资格',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
          activeMenu: '/pages/avl/vendorData',
        },
      },
      {
        path: 'unFrozen',
        name: 'AVL解冻/重获资格',
        component: () => import('@/views/avl/form/unFrozen.vue'),
        meta: {
          title: 'AVL解冻/重获资格',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
          activeMenu: '/pages/avl/vendorData',
        },
      },
      {
        path: 'muchFrozen',
        name: 'AVL多物料冻结/多物料取消资格',
        component: () => import('@/views/avl/form/muchFrozen.vue'),
        meta: {
          title: 'AVL多物料冻结/多物料取消资格',
          show: false,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
          activeMenu: '/pages/avl/vendorData',
        },
      },
      {
        path: 'todo',
        name: 'AVL审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
        },
      },
      {
        path: 'draft',
        name: 'AVL草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
        },
      },
      {
        path: 'done',
        name: 'AVL我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
        },
      },
      {
        path: 'apply',
        name: 'AVL我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'AVL',
        },
      },
    ],
  },
  {
    path: 'avl/vendorData',
    name: 'AVL供应商资源池',
    component: () => import('@/views/avl/find/vendorData.vue'),
    meta: {
      title: '供应商资源池',
      show: true,
      role: ['admin', 'user'],
      icon: renderIcon(SearchOutlined),
      system: 'AVL',
    },
  },
  {
    path: 'avl/editRoute',
    name: 'AVL申请单编辑路由',
    component: () => import('@/views/approval/editRoute.vue'),
    meta: {
      title: '申请单编辑路由',
      icon: renderIcon(InteractionOutlined),
      show: true,
      role: ['admin'],
      system: 'AVL',
    },
  },
  {
    path: 'avl/actionLog',
    name: 'AVL编辑路由操作日志',
    component: () => import('@/views/approval/actionLog.vue'),
    meta: {
      title: '编辑路由操作日志',
      icon: renderIcon(UnorderedListOutlined),
      show: true,
      role: ['admin'],
      system: 'AVL',
    },
  },
]
