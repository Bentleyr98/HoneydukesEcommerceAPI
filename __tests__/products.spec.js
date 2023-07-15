// const request = require('supertest');
// const url = "http://localhost:8080";
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const ProductModel = require("../models/products")
const {getAllProducts, getProduct} = require("../controllers/products")

describe('Product routes', () => {
  let id;

  describe("Get all orders", () => {
    it("should return all products", async () => {
      const mockProduct = [
        {
          _id: "649527210f8c83977056a477",
          name: "Hersey Kiss",
          description: "Delightful small chocolate.",
          price: "4.99",
          quantityInStock: "20",
          category: "candy",
          brand: "Hersey",
          images: "kisses1234.png",
          otherDetails: "It should be store in a cool place.",
        },
        {
          _id: "64af0bd80d03a459c91f204d",
          name: "Twizzlers",
          description: "Strawberry flavored red rope like candy.",
          price: "5.99",
          quantityInStock: "55",
          category: "candy",
          brand: "Hersey",
          images: "image.jpg",
          otherDetails: "any",
        },
        {
          _id: "64af0dc2d4492a832e317b9c",
          name: "Carmel Swirled Fudge",
          description: "It's made of carmel and chocolate fudge.",
          price: "12.79",
          quantityInStock: "5",
          category: "Candy",
          brand: "Fudge Makers",
          images: "fudge.jpeg",
          otherDetails: "It won't last long.",
        },
      ];

      const findAllSpy = jest
        .spyOn(ProductModel, "find")
        .mockResolvedValue(mockProduct);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllProducts(req, res);

      expect(findAllSpy).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
  });
  

  describe("Get one product", () => {
    it("should return one product", async () => {
      const mockProduct = {
        _id: "649527210f8c83977056a477",
        name: "Hersey Kiss",
        description: "Delightful small chocolate.",
        price: "4.99",
        quantityInStock: "20",
        category: "candy",
        brand: "Hersey",
        images: "kisses1234.png",
        otherDetails: "It should be store in a cool place.",
      };

      const findByIdSpy = jest
        .spyOn(ProductModel, "findById")
        .mockResolvedValue(mockProduct);

      const req = {
        params: { id: "649527210f8c83977056a477" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getProduct(req, res);

      expect(findByIdSpy).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe("Create a new product", () => {
    it("should create a new product", async () => {
      const mockProduct = {
        name: "new product",
        description: "some kind of food",
        price: "2",
        quantityInStock: "80",
        category: "food",
        brand: "dole",
        images: "image1.png",
        otherDetails: "more details",
      };

      const res = await request
        .post("/products")
        .send(mockProduct)
        .expect(201);

      id = res.body._id;
    });
  });

  describe("Update a product", () => {
    it("should update a product", async () => {
      const updateProduct = {
        name: "new product",
        description: "some kind of food",
        price: "15",
        quantityInStock: "37",
        category: "food",
        brand: "dole",
        images: "newimage.png",
        otherDetails: "more details",
      };

      await request.put(`/products/${id}`).send(updateProduct).expect(204);
    });
  });

  describe("Delete a product", () => {
    it("should delete a product", async () => {
      await request.delete(`/products/${id}`).expect(200);
    });
  });
});
