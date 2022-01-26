'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // 更新用户信息
  async render() {
    const {
      ctx,
    } = this;
    const result = await ctx.model.Pageinfo.find({
      path: ctx.request.url,
    });
    return result;
  }
}
module.exports = HomeService;
