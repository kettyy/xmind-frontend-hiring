import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';
import { CategoryService } from '../../src/service/category';

describe('test/service/category.test.ts', () => {
  let app: Application;
  let categoryService: CategoryService;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();

    // 根据依赖注入 Id 获取实例
    categoryService = await app
      .getApplicationContext()
      .getAsync<CategoryService>('categoryService');
  });

  afterAll(async () => {
    await close(app);
  });

  it('index will return array', async () => {
    // make request
    const result = await categoryService.index();

    // use expect by jest
    expect(Array.isArray(result)).toBe(true);
  });
});
