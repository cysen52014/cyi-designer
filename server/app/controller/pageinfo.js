'use strict';

const Controller = require('egg').Controller;

class CreatePageInfoController extends Controller {
  async save() {
    const { ctx } = this;
    const result = await ctx.service.pageinfo.add();
    return result;
  }
}

module.exports = CreatePageInfoController;
