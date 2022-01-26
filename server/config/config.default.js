/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1622015319669_2953';

  // add your middleware config here
  config.middleware = [];


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  config.cors = {
    origin: '*', // 访问白名单,根据你自己的需要进行设置
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 数据库配置
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/db1',
    options: {},
    // client scope plugin array
    plugins: [],
  };

  // 视图配置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // csrf配置
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.wsocket = {
  };

  return {
    ...config,
    ...userConfig,
  };
};
