const {
  Types: { ObjectId },
} = require('mongoose');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const OrderModel = require('../models/orders');
const { getAllOrders, getOrder } = require('../controllers/orders');

describe('Orders routes', () => {
  let id;

  describe('Get all orders', () => {
    it('should return all orders', async () => {
      const mockOrder = [
        {
          _id: '6491c0350c550bf56ffbe5d3',
          userEmail: 'user123@email.com',
          orderDate: '2023-05-18',
          shippingAddress: '123 Main St, City, Country',
          billingAddress: '456 Street Ave, City, Country',
          paymentMethod: 'creditCard',
          orderStatus: 'completed',
          numItemsOrdered: 2,
          additionalDetails: 'Additional order details',
        },
        {
          _id: '64aa141396e0acd0844c2940',
          userEmail: 'coolGuy',
          orderDate: '2023-07-08',
          shippingAddress: 'address',
          billingAddress: 'same as above',
          paymentMethod: 'cash',
          orderStatus: 'in transit',
          numItemsOrdered: 1,
          additionalDetails: 'any',
        },
        {
          _id: '64aa142e96e0acd0844c2943',
          userEmail: 'yetAnotherGuy',
          orderDate: '2023-07-07',
          shippingAddress: 'address',
          billingAddress: 'same as above',
          paymentMethod: 'cash',
          orderStatus: 'in transit',
          numItemsOrdered: 3,
          additionalDetails: 'any',
        },
      ];

      // mockingoose(OrderModel).toReturn(mockOrder, "findById");
      const findAllSpy = jest
        .spyOn(OrderModel, 'find')
        .mockResolvedValue(mockOrder);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllOrders(req, res);

      expect(findAllSpy).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });
  });

  describe('Get one order', () => {
    it('should return one order', async () => {
      const mockOrder = {
        // _id: new ObjectId("6491c0350c550bf56ffbe5d3"),
        _id: '6491c0350c550bf56ffbe5d3',
        userEmail: 'user123@email.com',
        orderDate: '2023-05-18',
        shippingAddress: '123 Main St, City, Country',
        billingAddress: '456 Street Ave, City, Country',
        paymentMethod: 'creditCard',
        orderStatus: 'completed',
        numItemsOrdered: 2,
        additionalDetails: 'Additional order details',
      };

      // mockingoose(OrderModel).toReturn(mockOrder, "findById");
      const findByIdSpy = jest
        .spyOn(OrderModel, 'findById')
        .mockResolvedValue(mockOrder);

      const req = {
        params: { id: '6491c0350c550bf56ffbe5d3' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getOrder(req, res);

      // console.log("res.status.mock.calls", res.status.mock.calls);

      expect(findByIdSpy).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });
  });

  describe('Create an order', () => {
    it('should create an order', async () => {
      const mockOrder = {
        userEmail: 'newEmail@email.com',
        orderDate: '2023-7-11',
        shippingAddress: 'new address',
        billingAddress: 'another address',
        paymentMethod: 'cash',
        orderStatus: 'opened',
        numItemsOrdered: 2,
        additionalDetails: 'Additional order details',
      };

      const res = await request.post('/orders').send(mockOrder).expect(201);

      id = res.body._id;
    });
  });

  describe('Update an order', () => {
    it('should update an order', async () => {
      const updateOrder = {
        userEmail: 'newEmail@email.com',
        orderDate: '2023-7-12',
        shippingAddress: 'new address',
        billingAddress: 'another address',
        paymentMethod: 'cash',
        orderStatus: 'completed',
        numItemsOrdered: 2,
        additionalDetails: 'Additional order details',
      };

      await request.put(`/orders/${id}`).send(updateOrder).expect(204);
    });
  });

  describe('Delete an order', () => {
    it('should delete an order', async () => {
      await request.delete(`/orders/${id}`).expect(200);
    });
  });
});
