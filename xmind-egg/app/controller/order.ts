import { Controller } from 'egg';

export default class OrderController extends Controller {
  async index() {
    const { ctx } = this;

    const orders = await ctx.service.order.findAll();

    ctx.body = orders;
    ctx.status = 200;
  }

  async create() {
    const { ctx } = this;

    const order = await ctx.service.order.create(ctx.request.body);

    ctx.body = order || { message: 'create fail' };
    ctx.status = order ? 201 : 500;
  }
}
