import request from '@/utils/request'

// 创建项目
export const createProject = params => {
  return request({
    method: 'post',
    url: '/project/create',
    params
  })
}

// 获取项目列表
export const getProjectList = params => {
  return request({
    method: 'get',
    url: '/project/get',
    params
  })
}

// 获取模板
export const getTemplate = data => {
  return request({
    method: 'post',
    url: '/page/tpl',
    data
  })
}

// 保存页面
export const storagePage = data => {
  return request({
    method: 'post',
    url: '/storage/page',
    data
  })
}

// 打包项目
export const projectPackage = params => {
  return request({
    method: 'post',
    url: '/project/package',
    params
  })
}

// 保存过滤器
export const createFilters = data => {
  return request({
    method: 'post',
    url: '/storage/filters',
    data
  })
}
