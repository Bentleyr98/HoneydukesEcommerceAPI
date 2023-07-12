const router = require('express').Router();
const productController = require('../controllers/products');
const { requiresAuth } = require('express-openid-connect');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
