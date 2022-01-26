import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/home')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/view/create/test')
    },
    {
      path: '/create/project',
      name: '创建项目',
      component: () => import('@/view/create/project')
    },
    {
      path: '/create/page',
      name: '创建页面',
      component: () => import('@/view/create/page')
    },
    {
      path: '/terminal',
      name: '终端',
      component: () => import('@/view/terminal/index')
    }
  ]
})
