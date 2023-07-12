const Users = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const result = await Users.find();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving Users', error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Users.findById(userId);
    if (result) {
      res.status(200).json(result);
    } else {
      return res.status(404).json({ message: '404!! Review not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving User', error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, shippingAddress, billingAddress, paymentMethods } = req.body;

    const newUser = new Users({
      email,
      shippingAddress,
      billingAddress,
      paymentMethods,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating User', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const User = {
      email: req.body.email,
      shippingAddress: req.body.shippingAddress,
      billingAddress: req.body.billingAddress,
      paymentMethods: req.body.paymentMethods,
    };

    const response = await Users.findByIdAndUpdate(userId, User, { new: true });

    if (!response) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating User', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await Users.findByIdAndDelete(userId);
    if (!response) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting User', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
