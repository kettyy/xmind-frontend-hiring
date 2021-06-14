import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';
import { OrderService } from '../../src/service/order';

describe('test/service/category.test.ts', () => {
  let app: Application;
  let orderService: OrderService;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();

    // 根据依赖注入 Id 获取实例
    orderService = await app
      .getApplicationContext()
      .getAsync<OrderService>('orderService');
  });

  afterAll(async () => {
    await close(app);
  });

  it('index will return array', async () => {
    // make request
    const result = await orderService.index();

    // use expect by jest
    expect(Array.isArray(result)).toBe(true);
    expect(typeof result[0].id).toBe('string');
  });

  it('create will return order', async () => {
    // make request
    const result = await orderService.create({
      type: 0,
      category: '0fnhbcle6hg',
      amount: 1000.0,
    });

    // use expect by jest
    expect(typeof result.id).toBe('string');
    expect(result.category).toBe('0fnhbcle6hg');
    expect(result.type).toBe(0);
    expect(typeof result.time).toBe('number');
  });
});
