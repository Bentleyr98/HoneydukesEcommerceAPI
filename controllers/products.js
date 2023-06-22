const Product = require('../models/products');

// Get all products
exports.getAllProducts =  async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving products', error: error.message });
  }
}

// Get product by ID
exports.getProduct =  async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving product', error: error.message });
  }
}

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantityInStock, category, brand, images, otherDetails } =
      req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      quantityInStock,
      category,
      brand,
      images,
      otherDetails,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.message });
  }
}

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantityInStock: req.body.quantityInStock,
      category: req.body.category,
      brand: req.body.brand,
      images: req.body.images,
      otherDetails: req.body.otherDetails,
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    } else {
      res.status(204).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
}

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
}
