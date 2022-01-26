import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'

window.isRefreshing = false

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 15000
})

// const isRefreshToken = () => {
//   const tokenInfo = JSON.parse(localStorage.getItem('__refash_token_info__'))
//   if (tokenInfo && new Date().getTime() > tokenInfo.refreshTime) {
//     return true
//   } else {
//     return false
//   }
// }

// const refreshSubscribers = []

// function subscribeTokenRefresh (cb) {
//   refreshSubscribers.push(cb)
// }

// function onRrefreshed (token) {
//   refreshSubscribers.map(cb => cb(token))
// }

service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    console.log(config)

    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.errorCode !== '0') {
      switch (response.data.errorCode) {
        case '401':
        case '403':
          // MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
          //   confirmButtonText: "重新登录",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
          //   store.dispatch("FedLogOut").then(() => {
          //     location.reload()
          //   })
          // })
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
          break
        default:
          break
      }
    }
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 500:
          // Message.error("服务器错误，请重新刷新");
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
