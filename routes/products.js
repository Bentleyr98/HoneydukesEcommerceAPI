const router = require('express').Router();
const productController = require('../controllers/products');
const { requiresAuth } = require('express-openid-connect');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', requiresAuth, productController.createProduct);
router.put('/:id', requiresAuth, productController.updateProduct);
router.delete('/:id', requiresAuth, productController.deleteProduct);

module.exports = router;
