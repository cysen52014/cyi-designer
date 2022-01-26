
import Vue from 'vue';
import CysUi from 'cys-ui';
import '!style-loader!css-loader!cys-ui/static/css/cysui.css'
import '!style-loader!css-loader!cys-ui/static/fonts/cysicon.css'

CysUi.install(Vue);

const res = {"el":"#app","data":{"cs_lgwlzglu0":{"list":[{"type":"input","name":"Input组件","label":"单行文本","field":"lgwlzglu","value":"","placeholder":"","clearable":true},{"type":"select","name":"Select组件","label":"下拉选择","field":"pqgjvgaz","value":"","placeholder":"","options":[],"clearable":true}],"btns":[{"label":"查询","action":"search"}],"direction":"horizontal"},"cs_tsvfbjec0":{"type":"input","name":"Input组件","label":"单行文本","field":"tsvfbjec","value":"","placeholder":"","clearable":true}},"template":"<div><div class=\"page-seach-wrap cs_lgwlzglu0\">\r\n   <cys-form-search\r\n      :data=\"cs_lgwlzglu0.list\"\r\n      :btns=\"cs_lgwlzglu0.btns\"\r\n      :direction=\"cs_lgwlzglu0.direction\"\r\n    ></cys-form-search>\r\n</div>\r\n<div class=\"page-row cs_tsvfbjec0\">\r\n    <div class=\"cys-form-label\">单行文本</div>\r\n    <div class=\"cys-form-content\">\r\n      <cys-input\r\n        :placeholder=\"cs_tsvfbjec0.placeholder\"\r\n        v-model=\"cs_tsvfbjec0.value\"\r\n        :clearable=\"cs_tsvfbjec0.clearable\">\r\n      </cys-input>\r\n    </div>\r\n</div></div>","methods":{}};
const app = new Vue({
  data: res.data,
  template: res.template,
}).$mount("#app");

console.log(app, 'app');
