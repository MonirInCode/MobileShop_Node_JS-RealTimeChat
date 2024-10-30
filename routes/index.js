const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

router.get('/product/:id', productController.getProductDetails);

router.post('/cart', productController.addToCart);

router.post('/cart/remove', productController.removeFromCart);


module.exports = router;