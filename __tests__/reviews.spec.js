const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Test Handlers', () => {
  test('GET responds to /reviews', async () => {
    const res = await request.get('/reviews');
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('GET responds to /reviews/:id', async () => {
    const reviewId = '6491c07c0c550bf56ffbe5dc';
    const res = await request.get(`/reviews/${reviewId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('POST responds to post /reviews', async () => {
    const postData = {
      userEmail: 'email@example.com',
      productID: 'testId',
      reviewText: 'Test review',
      rating: 3,
      date: new Date(),
      otherDetails: 'Test details',
    };
    const res = await request.post('/reviews').send(postData);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  test('GET responds to /reviews/:id with error', async () => {
    const reviewId = 'sssss';
    const res = await request.get(`/reviews/${reviewId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('PUT responds to /reviews/:id', async () => {
    const reviewId = '6491c07c0c550bf56ffbe5dc';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/reviews/${reviewId}`).send(updateData);
    expect(res.status).toBe(204);
    // add more assertions for the response body here
  });

  test('PUT responds to /reviews:id with error', async () => {
    const reviewId = 's64aa142e96e0acd0844c2943';
    const updateData = {
      /* update data */
    };
    const res = await request.put(`/reviews/${reviewId}`).send(updateData);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });

  test('DELETE responds to /reviews/:id', async () => {
    const reviewId = 'YOUR_ID_HERE';
    const res = await request.delete(`/reviews/${reviewId}`);
    expect(res.status).toBe(200);
    // add more assertions for the response body here
  });

  test('DELETE responds to /reviews:id with error', async () => {
    const reviewId = 's64aa142e96e0acd0844c2943';
    const res = await request.delete(`/reviews/${reviewId}`);
    expect(res.status).toBe(500);
    // add more assertions for the response body here
  });
});
