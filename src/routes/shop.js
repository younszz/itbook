const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();

router.post('/products', shopController.postAddProduct);

router.get('/products', shopController.getProducts);

router.get('/api/product/:pid', shopController.getOneProduct);

module.exports = router; 
