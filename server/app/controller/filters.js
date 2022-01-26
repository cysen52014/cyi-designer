'use strict';

const Controller = require('egg').Controller;

class CreateFiltersController extends Controller {
  async save() {
    const { ctx } = this;
    const result = await ctx.service.filters.add();
    return result;
  }
}

module.exports = CreateFiltersController;
