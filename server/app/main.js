
import Vue from 'vue';
import CysUi from 'cys-ui';
import '!style-loader!css-loader!cys-ui/static/css/cysui.css'
import '!style-loader!css-loader!cys-ui/static/fonts/cysicon.css'

CysUi.install(Vue);

const res = JSON.parse(context);
const app = new Vue({
  data: res.data,
  template: res.template,
}).$mount("#app");

console.log(app, 'app');
