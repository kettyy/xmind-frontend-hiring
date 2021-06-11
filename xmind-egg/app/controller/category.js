'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;

    const categories = await ctx.service.category.findAll();

    ctx.body = categories;
  }
}

module.exports = CategoryController;
