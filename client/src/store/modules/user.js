import { login, logout, getInfo, refreshToken } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        console.log('userInfo', userInfo)
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            if (response.errorCode === '0') {
              if (data.accessToken) {
                setToken(data.accessToken)
                commit('SET_TOKEN', data.accessToken)
                commit('SET_NAME', data.nickname)
                localStorage.setItem('username', data.nickname)
                localStorage.setItem(
                  '__refash_token_info__',
                  JSON.stringify({
                    refreshToken: data.refreshToken,
                    refreshTime: new Date().getTime() + data.expirationMill * 1,
                    expiresTime:
                      new Date().getTime() + data.refreshExpirationMill * 1
                  })
                )
              }
            } else {
              Message.error(response.message)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    refreshToken ({ commit }) {
      return new Promise((resolve, reject) => {
        refreshToken({
          refreshToken: JSON.parse(
            localStorage.getItem('__refash_token_info__')
          ).refreshToken
        })
          .then(response => {
            const data = response.data
            if (response.errorCode === '0') {
              if (data.accessToken) {
                setToken(data.accessToken)
                commit('SET_TOKEN', data.accessToken)
                commit('SET_NAME', data.nickname)
                console.log('SET_ROLES222')
                localStorage.setItem('username', data.nickname)
                localStorage.setItem(
                  '__refash_token_info__',
                  JSON.stringify({
                    refreshToken: data.refreshToken,
                    refreshTime: new Date().getTime() + data.expirationMill * 1,
                    expiresTime:
                      new Date().getTime() + data.refreshExpirationMill * 1
                  })
                )
                resolve(data.accessToken)
              }
            } else {
              resolve()
              Message.error(response.message)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.token) return
        console.log('state.token', state.token)
        getInfo(state.token)
          .then(response => {
            console.log('SET_ROLES', response)
            if (response.errorCode === '0') {
              commit('SET_ROLES', [localStorage.getItem('username')])
            } else {
              commit('SET_ROLES', [])
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            localStorage.removeItem('__refresh_token__')
            localStorage.removeItem('sideber-active-path')
            localStorage.removeItem('sideber-active-key')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }, cb) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        localStorage.removeItem('__refresh_token__')
        localStorage.removeItem('sideber-active-path')
        localStorage.removeItem('sideber-active-key')
        resolve()
      })
    }
  }
}

export default user
