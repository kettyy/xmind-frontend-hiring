import {
  Inject,
  Controller,
  Provide,
  Get,
  HttpCode,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { Category, IndexResponse } from '../interface';
import { CategoryService } from '../service/category';

@Provide()
@Controller('/')
export class CategoryController {
  @Inject()
  ctx: Context;

  @Inject()
  categoryService: CategoryService;

  @Get('/categories')
  @HttpCode(200)
  async index(): Promise<IndexResponse<Category[]>> {
    const categories = await this.categoryService.index();
    return { list: categories };
  }
}
