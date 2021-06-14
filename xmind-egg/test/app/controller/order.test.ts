import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/order.test.ts', () => {
  it('should GET /orders', async () => {
    const result = await app.httpRequest().get('/orders').expect(200);
    assert(Array.isArray(result.body.list));
  });
  it('should POST /orders', async () => {
    const result = await app
      .httpRequest()
      .post('/orders')
      .send({ type: 0, category: '0fnhbcle6hg', amount: 1000.0 })
      .expect(201);
    assert(typeof result.body.id === 'string');
  });
});
