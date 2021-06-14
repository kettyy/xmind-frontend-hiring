import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';

describe('test/controller/order.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /orders', async () => {
    // make request
    const result = await createHttpRequest(app).get('/orders');

    // use expect by jest
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.list)).toBe(true);
  });

  it('should POST /orders', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/orders')
      .send({ type: 0, category: '0fnhbcle6hg', amount: 1000.0 });

    // use expect by jest
    expect(result.status).toBe(201);
    expect(typeof result.body.id).toBe('string');
  });
});
