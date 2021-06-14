import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/order.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('findAll will return array', async () => {
    const result = await ctx.service.order.findAll();
    assert(Array.isArray(result.list));
  });

  it('create will return order', async () => {
    const result = await ctx.service.order.create({
      type: 0,
      category: '0fnhbcle6hg',
      amount: 1000.0,
    });

    assert(typeof result?.id === 'string');
    assert(result?.category === '0fnhbcle6hg');
    assert(result?.type === 0);
    assert(typeof result?.time === 'number');
  });
});
