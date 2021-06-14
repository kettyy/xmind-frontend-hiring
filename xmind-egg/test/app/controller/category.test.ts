import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/category.test.ts', () => {
  it('should GET /categories', async () => {
    const result = await app.httpRequest().get('/categories').expect(200);
    assert(Array.isArray(result.body.list));
  });
});
