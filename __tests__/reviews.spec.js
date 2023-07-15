const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const reviewModel = require('../models/reviews');
const { getAllReviews, getReview } = require('../controllers/reviews');

describe('Review routes', () => {
  let id;

  describe('Get all reviews', () => {
    it('should return all reviews', async () => {
      const mockReviews = [
        {
          _id: '6491c07c0c550bf56ffbe5dc',
          userEmail: 'user123@email.com',
          productID: 'product123',
          reviewText: 'Great product!',
          rating: 5,
          date: '2023-05-18T00:00:00.000Z',
          otherDetails: 'Other relevant information',
        },
        {
          _id: '64af1d962b94ee15230bdf63',
          userEmail: 'email@example.com',
          productID: 'testId',
          reviewText: 'Test review',
          rating: 3,
          date: '2023-07-12T21:39:34.724Z',
          otherDetails: 'Test details',
        },
        {
          _id: '64af1e369d1a6f5692c732dc',
          userEmail: 'email@example.com',
          productID: 'testId',
          reviewText: 'Test review',
          rating: 3,
          date: '2023-07-12T21:42:14.191Z',
          otherDetails: 'Test details',
        },
      ];

      const findAllSpy = jest
        .spyOn(reviewModel, 'find')
        .mockResolvedValue(mockReviews);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllReviews(req, res);

      expect(findAllSpy).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });
  });

  describe('Get one review', () => {
    it('should return one review', async () => {
      const mockReview = {
        _id: '64af1e369d1a6f5692c732dc',
        userEmail: 'email@example.com',
        productID: 'testId',
        reviewText: 'Test review',
        rating: 3,
        date: '2023-07-12T21:42:14.191Z',
        otherDetails: 'Test details',
      };

      const findByIdSpy = jest
        .spyOn(reviewModel, 'findById')
        .mockResolvedValue(mockReview);

      const req = {
        params: { id: '64af1e369d1a6f5692c732dc' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getReview(req, res);

      expect(findByIdSpy).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('Create an Review', () => {
    it('should create an review', async () => {
      const mockReview = {
        userEmail: 'email2@example.com',
        productID: 'test2Id',
        reviewText: 'Test 2 review',
        rating: 2,
        date: '2022-07-12T21:42:14.191Z',
        otherDetails: 'Test 2 details',
      };

      const res = await request.post('/reviews/').send(mockReview).expect(201);

      id = res.body._id;
    });
  });

  describe('Update an Review', () => {
    it('should update an review', async () => {
      const updateReview = {
        userEmail: 'email3@example.com',
        productID: 'testId',
        reviewText: 'Test review',
        rating: 3,
        date: '2023-07-12T21:42:14.191Z',
        otherDetails: 'Test details',
      };

      await request.put(`/reviews/${id}`).send(updateReview).expect(204);
    });
  });

  describe('Delete an review', () => {
    it('should delete an review', async () => {
      await request.delete(`/reviews/${id}`).expect(200);
    });
  });
});
