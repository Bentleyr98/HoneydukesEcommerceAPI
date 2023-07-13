const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Test Handlers', () => {
  test('GET responds to /users', async () => {
    const res = await request.get('/users');
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('GET responds to /users/:id', async () => {
    const userId = '6491c0a90c550bf56ffbe5e0';
    const res = await request.get(`/users/${userId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('GET responds to /users/:id with error', async () => {
    const userId = 's64aa142e96e0acd0844c2943';
    const res = await request.get(`/users/${userId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('POST responds to post /users', async () => {
    const postData = {
      email: 'example@email.com',
      shippingAddress: '123 Apple Tree St',
      billingAddress: '123 Apple Tree St',
      paymentMethods: ['Card', 'Venmo'],
    };
    const res = await request.post('/users').send(postData);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  test('PUT responds to /users/:id', async () => {
    const userId = '6491c0a90c550bf56ffbe5e0';
    const updateData = {
      email: 'example@email.com',
      shippingAddress: '123 Apple Tree St',
      billingAddress: '123 Apple Tree St',
      paymentMethods: ['Card', 'Venmo'],
    };
    const res = await request.put(`/users/${userId}`).send(updateData);
    expect(res.status).toBe(204);
    // add more assertions for the response body here
  });

  test('PUT responds to /users:id with error', async () => {
    const userId = 's64aa142e96e0acd0844c2943';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/users/${userId}`).send(updateData);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('DELETE responds to /users/:id', async () => {
    const userId = 'YOUR_ID_HERE';
    const res = await request.delete(`/users/${userId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('DELETE responds to /users:id with error', async () => {
    const userId = 's64aa142e96e0acd0844c2943';
    const res = await request.delete(`/users/${userId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });
});
