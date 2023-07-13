const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Test Handlers', () => {
  test('GET responds to /products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('GET responds to /products/:id', async () => {
    const productId = '649527210f8c83977056a477';
    const res = await request.get(`/products/${productId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('POST responds to post /products', async () => {
    const postData = {
      name: 'name',
      description: 'description',
      price: 1,
      quantityInStock: 1,
      category: 'category',
      brand: 'brand',
      images: ['images'],
      otherDetails: 'other details',
    };
    const res = await request.post('/products').send(postData);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  test('GET responds to /products/:id with error', async () => {
    const productId = 'sssss';
    const res = await request.get(`/products/${productId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('PUT responds to /products/:id', async () => {
    const productId = '649527210f8c83977056a477';
    const updateData = {
      name: 'name',
      description: 'description',
      price: 1,
      quantityInStock: 1,
      category: 'category',
      brand: 'brand',
      images: ['images'],
      otherDetails: 'other details',
    };
    const res = await request.put(`/products/${productId}`).send(updateData);
    expect(res.status).toBe(204);
    // add more assertions for the response body here
  });

  test('PUT responds to /products:id with error', async () => {
    const productId = 's64aa142e96e0acd0844c2943';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/products/${productId}`).send(updateData);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('DELETE responds to /products/:id', async () => {
    const productId = '64af0d82b1aff9bffa11403e';
    const res = await request.delete(`/products/${productId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('DELETE responds to /products:id with error', async () => {
    const productId = 's64aa142e96e0acd0844c2943';
    const res = await request.delete(`/products/${productId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });
});
