import { UserOutlined } from '@vicons/antd'
import { renderIcon } from '@/utils'

export default [
  {
    path: 'coa',
    meta: {
      title: '申请创建',
      icon: renderIcon(UserOutlined),
      show: true,
      role: ['admin', 'user'],
      system: 'COA',
    },
    children: [
      {
        path: 'todo',
        name: 'COA审批列表',
        component: () => import('@/views/approval/todo.vue'),
        meta: {
          title: '审批列表',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'draft',
        name: 'COA草稿箱',
        component: () => import('@/views/approval/draft.vue'),
        meta: {
          title: '草稿箱',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'done',
        name: 'COA我的已办',
        component: () => import('@/views/approval/done.vue'),
        meta: {
          title: '我的已办',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
      {
        path: 'apply',
        name: 'COA我的申请',
        component: () => import('@/views/approval/apply.vue'),
        meta: {
          title: '我的申请',
          show: true,
          role: ['admin', 'user'],
          icon: '',
          system: 'COA',
        },
      },
    ],
  },
]
