import { Controller } from "egg";

export default class CategoryController extends Controller {
  async index() {
    const { ctx } = this;

    const categories = await ctx.service.category.findAll();

    ctx.body = categories;
  }
}
