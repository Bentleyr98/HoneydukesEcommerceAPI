const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const { requiresAuth } = require('express-openid-connect');

router.get('/', getUser);
router.get('/:id', getAllUsers);
router.post('/', requiresAuth(), createUser);
router.put('/:id', requiresAuth(), updateUser);
router.delete('/:id', requiresAuth(), deleteUser);

module.exports = router;
