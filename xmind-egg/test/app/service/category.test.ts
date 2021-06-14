import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/category.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('findAll will return array', async () => {
    const result = await ctx.service.category.findAll();
    assert(Array.isArray(result.list));
  });

  it('create will return category', async () => {
    const result = await ctx.service.category.create({
      id: 'test',
      name: '测试',
      type: 1,
    });

    assert(result?.id === 'test');
    assert(result?.name === '测试');
    assert(result?.type === 1);
  });
});
