import * as filtersView from "./global/filter";

const install = function(Vue) {
  Object.keys(filtersView).forEach(key => {
    Vue.filter(key, filtersView[key]);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;