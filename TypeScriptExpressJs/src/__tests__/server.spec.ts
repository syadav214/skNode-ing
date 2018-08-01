import * as dotenv from 'dotenv';

import app from '../app';

import * as request from 'supertest';

beforeAll(() => {
  dotenv.config();
});

describe('server', () => {
  it('forbids access to private requests', async () => {
    const response = await request(app)
      .post('/test')
      .send({
        orderId: null
      });

    // Unauthorized
    expect(response.status).toBe(401);
  });
});
