const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Test Handlers', () => {
  test('GET responds to /orders', async () => {
    const res = await request.get('/orders');
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('GET responds to /orders/:id', async () => {
    const orderId = '6491c0350c550bf56ffbe5d3';
    const res = await request.get(`/orders/${orderId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('POST responds to post /orders', async () => {
    const postData = {
      /* post data */
    };
    const res = await request.post('/orders').send(postData);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  test('GET responds to /orders:id with error', async () => {
    const orderId = '6491c0350c550bf56ffbe5d31';
    const res = await request.get(`/orders/${orderId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('PUT responds to /orders/:id', async () => {
    const orderId = '64aa142e96e0acd0844c2943';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/orders/${orderId}`).send(updateData);
    expect(res.status).toBe(204);
    // add more assertions for the response body here
  });

  test('PUT responds to /orders:id with error', async () => {
    const orderId = 's64aa142e96e0acd0844c2943';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/orders/${orderId}`).send(updateData);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('DELETE responds to /orders/:id', async () => {
    const orderId = '64aa142e96e0acd0844c2943';
    const res = await request.delete(`/orders/${orderId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('DELETE responds to /orders:id with error', async () => {
    const orderId = 's64aa142e96e0acd0844c2943';
    const res = await request.delete(`/orders/${orderId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });
});
