'use strict';

require.config({
  paths: {
    Vue: '/public/js/vue',
    CysUi: '/public/js/cysui',
  },
});
require([ 'Vue', 'CysUi' ], function(Vue, CysUi) {
  CysUi.default.install(Vue);
  const app = new Vue();
  console.log('Vue', app);
});

