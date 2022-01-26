'use strict';

const Controller = require('egg').Controller;

class CreateTplController extends Controller {
  async exportTpl() {
    const { ctx } = this;
    const result = await ctx.service.tpl.getTplFile();
    return result;
  }
}

module.exports = CreateTplController;
