import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';

describe('test/controller/category.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('should GET /categories', async () => {
    // make request
    const result = await createHttpRequest(app).get('/categories');

    // use expect by jest
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.list)).toBe(true);
  });
});
