// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import CysUi from 'cys-ui'
import 'cys-ui/static/css/cysui.css'
import 'cys-ui/static/fonts/cysicon.css'
import '@/assets/fonts/iconfont.css'

CysUi.install(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
