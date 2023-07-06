const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();


router.get('/api/products', shopController.getProducts);

router.post('/api/product', shopController.postAddProduct);

router.get('/api/product/:pid', shopController.getproductDetail);

module.exports = router; 
